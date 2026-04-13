"use client";

import Image from "next/image";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { getMyActiveSpace } from "@/lib/space";

type FeedPostMedia = {
  id: string;
  file_path: string;
  caption: string | null;
  sort_order: number;
  signed_url?: string | null;
};

type FeedPost = {
  id: string;
  content: string | null;
  created_at: string;
  author_id: string;
  feed_post_media: FeedPostMedia[];
};

type SpaceInfo = {
  id: string;
  name: string;
};

type RawSpaceData = {
  space_id: string;
  role: string;
  status: string;
  spaces: SpaceInfo | SpaceInfo[] | null;
};

type SpaceData = {
  space_id: string;
  role: string;
  status: string;
  spaces: SpaceInfo | null;
};

type FeedPostMediaInsert = {
  post_id: string;
  uploaded_by: string;
  file_path: string;
  caption: string | null;
  sort_order: number;
};

const MAX_FILES = 10;

export default function HomePage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [spaceData, setSpaceData] = useState<SpaceData | null>(null);
  const [posts, setPosts] = useState<FeedPost[]>([]);
  const [postText, setPostText] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [publishing, setPublishing] = useState(false);
  const [userId, setUserId] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadPage() {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session) {
          router.push("/login");
          return;
        }

        if (isMounted) {
          setUserId(session.user.id);
        }

        const mySpace = (await getMyActiveSpace()) as RawSpaceData | null;

        if (!mySpace) {
          if (isMounted) {
            setError("No tenés un espacio activo todavía.");
          }
          return;
        }

        const normalizedSpace: SpaceData = {
          space_id: mySpace.space_id,
          role: mySpace.role,
          status: mySpace.status,
          spaces: Array.isArray(mySpace.spaces)
            ? mySpace.spaces[0] ?? null
            : mySpace.spaces,
        };

        if (isMounted) {
          setSpaceData(normalizedSpace);
        }

        const { data: feedPosts, error: postsError } = await supabase
          .from("feed_posts")
          .select(`
            id,
            content,
            created_at,
            author_id,
            feed_post_media (
              id,
              file_path,
              caption,
              sort_order
            )
          `)
          .eq("space_id", normalizedSpace.space_id)
          .order("created_at", { ascending: false });

        if (postsError) {
          if (isMounted) {
            setError(postsError.message);
          }
          return;
        }

        const postsWithUrls = await attachSignedUrls(
          (feedPosts ?? []) as FeedPost[]
        );

        if (isMounted) {
          setPosts(postsWithUrls);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Error inesperado");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadPage();

    return () => {
      isMounted = false;
    };
  }, [router]);

  async function attachSignedUrls(rawPosts: FeedPost[]) {
    const hydratedPosts = await Promise.all(
      rawPosts.map(async (post) => {
        const media = Array.isArray(post.feed_post_media)
          ? [...post.feed_post_media]
          : [];

        media.sort((a, b) => a.sort_order - b.sort_order);

        const mediaWithUrls = await Promise.all(
          media.map(async (item) => {
            const { data, error } = await supabase.storage
              .from("photos")
              .createSignedUrl(item.file_path, 60 * 60);

            return {
              ...item,
              signed_url: error ? null : data?.signedUrl ?? null,
            };
          })
        );

        return {
          ...post,
          feed_post_media: mediaWithUrls,
        };
      })
    );

    return hydratedPosts;
  }

  async function handleLogout() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      setError(error.message);
      return;
    }

    router.push("/login");
    router.refresh();
  }

  function handleFilesChange(e: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);

    if (files.length > MAX_FILES) {
      setError(`Podés subir hasta ${MAX_FILES} imágenes por publicación.`);
      setSelectedFiles(files.slice(0, MAX_FILES));
      return;
    }

    setError("");
    setSelectedFiles(files);
  }

  function buildStoragePath(params: {
    userId: string;
    postId: string;
    file: File;
    index: number;
  }) {
    const { userId, postId, file, index } = params;

    const extension = file.name.includes(".")
      ? file.name.split(".").pop()?.toLowerCase() ?? "jpg"
      : "jpg";

    const safeExtension = extension.replace(/[^a-z0-9]/g, "") || "jpg";
    const uniquePart = `${Date.now()}-${index}-${crypto.randomUUID()}`;

    return `${userId}/feed-posts/${postId}/${uniquePart}.${safeExtension}`;
  }

  async function uploadFilesForPost(postId: string) {
    if (!selectedFiles.length || !userId) {
      return [];
    }

    const uploadedPaths: string[] = [];

    try {
      for (let index = 0; index < selectedFiles.length; index += 1) {
        const file = selectedFiles[index];
        const filePath = buildStoragePath({
          userId,
          postId,
          file,
          index,
        });

        const { error: uploadError } = await supabase.storage
          .from("photos")
          .upload(filePath, file, {
            cacheControl: "3600",
            upsert: false,
          });

        if (uploadError) {
          throw new Error(uploadError.message);
        }

        uploadedPaths.push(filePath);
      }

      return uploadedPaths;
    } catch (err) {
      if (uploadedPaths.length > 0) {
        await Promise.allSettled(
          uploadedPaths.map((path) =>
            supabase.storage.from("photos").remove([path])
          )
        );
      }

      throw err;
    }
  }

  async function insertMediaRows(postId: string, uploadedPaths: string[]) {
    if (!uploadedPaths.length || !userId) {
      return;
    }

    const mediaRows: FeedPostMediaInsert[] = uploadedPaths.map(
      (filePath, index) => ({
        post_id: postId,
        uploaded_by: userId,
        file_path: filePath,
        caption: null,
        sort_order: index,
      })
    );

    const { error: mediaError } = await supabase
      .from("feed_post_media")
      .insert(mediaRows);

    if (mediaError) {
      await Promise.allSettled(
        uploadedPaths.map((path) =>
          supabase.storage.from("photos").remove([path])
        )
      );

      throw new Error(mediaError.message);
    }
  }

  async function handleCreatePost(e: FormEvent) {
    e.preventDefault();

    const trimmedText = postText.trim();
    const hasText = trimmedText.length > 0;
    const hasFiles = selectedFiles.length > 0;

    if (!spaceData || !userId || (!hasText && !hasFiles)) {
      return;
    }

    setPublishing(true);
    setError("");

    let createdPost: FeedPost | null = null;

    try {
      const { data, error: postError } = await supabase
        .from("feed_posts")
        .insert({
          space_id: spaceData.space_id,
          author_id: userId,
          content: hasText ? trimmedText : null,
        })
        .select(`
          id,
          content,
          created_at,
          author_id,
          feed_post_media (
            id,
            file_path,
            caption,
            sort_order
          )
        `)
        .single();

      if (postError) {
        setError(postError.message);
        return;
      }

      createdPost = {
        ...data,
        feed_post_media: Array.isArray(data.feed_post_media)
          ? data.feed_post_media
          : [],
      } as FeedPost;

      const uploadedPaths = await uploadFilesForPost(createdPost.id);
      await insertMediaRows(createdPost.id, uploadedPaths);

      const postWithFreshMedia = await supabase
        .from("feed_posts")
        .select(`
          id,
          content,
          created_at,
          author_id,
          feed_post_media (
            id,
            file_path,
            caption,
            sort_order
          )
        `)
        .eq("id", createdPost.id)
        .single();

      if (postWithFreshMedia.error) {
        throw new Error(postWithFreshMedia.error.message);
      }

      const hydratedPosts = await attachSignedUrls([
        postWithFreshMedia.data as FeedPost,
      ]);

      setPosts((prev) => [hydratedPosts[0], ...prev]);
      setPostText("");
      setSelectedFiles([]);
    } catch (err) {
      if (createdPost) {
        await supabase.from("feed_posts").delete().eq("id", createdPost.id);
      }

      setError(err instanceof Error ? err.message : "Error inesperado");
    } finally {
      setPublishing(false);
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f6f0eb] text-[#2f2326]">
        <div className="mx-auto flex min-h-screen max-w-5xl items-center justify-center px-6">
          <div className="rounded-full border border-white/70 bg-white/70 px-5 py-3 text-sm text-[#7a5f66] shadow-sm backdrop-blur">
            Cargando feed...
          </div>
        </div>
      </main>
    );
  }

  if (!spaceData) {
    return (
      <main className="min-h-screen bg-[#f6f0eb] text-[#2f2326]">
        <div className="mx-auto flex min-h-screen max-w-5xl items-center justify-center px-6">
          <div className="w-full max-w-md rounded-[32px] border border-[#eaded7] bg-white/90 p-8 text-center shadow-[0_20px_60px_rgba(61,42,47,0.08)]">
            <p className="text-lg font-medium">
              {error || "No tenés un espacio activo todavía."}
            </p>

            <button
              onClick={() => router.push("/login")}
              className="mt-5 rounded-2xl bg-[#b9858b] px-5 py-3 font-medium text-white transition hover:opacity-90"
            >
              Ir al login
            </button>
          </div>
        </div>
      </main>
    );
  }

  const currentSpace = spaceData.spaces;

  return (
    <main className="min-h-screen bg-[#f6f0eb] text-[#2f2326]">
      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <section className="relative overflow-hidden rounded-[36px] border border-white/70 bg-[linear-gradient(135deg,rgba(255,255,255,0.86),rgba(255,246,242,0.78))] p-5 shadow-[0_25px_80px_rgba(61,42,47,0.10)] backdrop-blur md:p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(185,133,139,0.16),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(233,214,219,0.50),transparent_30%)]" />

          <div className="relative z-10 flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
            <div className="max-w-2xl">
              <p className="mb-3 text-[11px] uppercase tracking-[0.35em] text-[#9c6f78] sm:text-xs">
                Red social privada
              </p>

              <p className="rounded-xl bg-red-500 p-3 font-bold text-white">
                TEST PREMIUM NUEVO
              </p>

              <h1 className="text-4xl font-semibold leading-[0.95] tracking-[-0.03em] text-[#2f2326] sm:text-5xl md:text-6xl">
                {currentSpace?.name ?? "Nuestro espacio"}
              </h1>

              <p className="mt-4 max-w-xl text-sm leading-7 text-[#6d565d] sm:text-base">
                Un lugar íntimo para guardar fotos, publicaciones y recuerdos
                compartidos con una estética suave, elegante y personal.
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="shrink-0 rounded-[24px] border border-[#d9bcc3] bg-[#b9858b] px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(185,133,139,0.28)] transition hover:-translate-y-0.5 hover:opacity-95"
            >
              Cerrar sesión
            </button>
          </div>
        </section>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <section className="rounded-[32px] border border-white/70 bg-white/85 p-5 shadow-[0_20px_60px_rgba(61,42,47,0.08)] backdrop-blur sm:p-6">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-[#a07b83]">
                  Nuevo momento
                </p>
                <h2 className="mt-2 text-2xl font-semibold tracking-[-0.02em] text-[#2f2326]">
                  Crear publicación
                </h2>
              </div>

              <div className="hidden rounded-full border border-[#eaded7] bg-[#fcf8f6] px-3 py-2 text-xs text-[#8a7177] sm:block">
                Hasta {MAX_FILES} fotos
              </div>
            </div>

            <form onSubmit={handleCreatePost} className="space-y-4">
              <div className="overflow-hidden rounded-[28px] border border-[#eaded7] bg-[#fcf8f6] shadow-inner">
                <textarea
                  value={postText}
                  onChange={(e) => setPostText(e.target.value)}
                  placeholder="¿Qué querés compartir hoy?"
                  className="min-h-[150px] w-full resize-none bg-transparent px-5 py-4 text-base leading-7 text-[#2f2326] outline-none placeholder:text-[#9e8b90]"
                />
              </div>

              <div className="rounded-[28px] border border-[#eaded7] bg-[#fcf8f6] p-4">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <label className="text-sm font-medium text-[#5e494f]">
                    Fotos de la publicación
                  </label>
                  <span className="text-xs text-[#8a7177]">
                    JPG, PNG, WEBP
                  </span>
                </div>

                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFilesChange}
                  className="block w-full rounded-2xl border border-[#ddcbc6] bg-white px-4 py-3 text-sm text-[#5c454a] file:mr-4 file:rounded-xl file:border-0 file:bg-[#f1dfdb] file:px-4 file:py-2.5 file:font-medium file:text-[#7a565d] hover:file:opacity-90"
                />

                {selectedFiles.length > 0 ? (
                  <div className="mt-4 rounded-2xl border border-[#eaded7] bg-white p-3">
                    <p className="mb-2 text-sm font-medium text-[#5b464c]">
                      {selectedFiles.length} archivo(s) seleccionado(s)
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {selectedFiles.map((file, index) => (
                        <span
                          key={`${file.name}-${index}`}
                          className="rounded-full border border-[#eaded7] bg-[#fcf8f6] px-3 py-1.5 text-xs text-[#7a656a]"
                        >
                          {file.name}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>

              <div className="flex items-center justify-between gap-4">
                <p className="text-xs leading-6 text-[#8a7177]">
                  Texto, fotos o ambas cosas. Todo queda guardado en su espacio
                  privado.
                </p>

                <button
                  type="submit"
                  disabled={
                    publishing ||
                    (!postText.trim() && selectedFiles.length === 0)
                  }
                  className="rounded-[22px] bg-[#b9858b] px-6 py-3 font-semibold text-white shadow-[0_14px_30px_rgba(185,133,139,0.28)] transition hover:-translate-y-0.5 hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {publishing ? "Publicando..." : "Publicar"}
                </button>
              </div>
            </form>
          </section>

          <aside className="rounded-[32px] border border-white/70 bg-white/75 p-5 shadow-[0_20px_60px_rgba(61,42,47,0.06)] backdrop-blur sm:p-6">
            <p className="text-xs uppercase tracking-[0.25em] text-[#a07b83]">
              Espacio
            </p>

            <div className="mt-4 space-y-4">
              <div className="rounded-[26px] border border-[#eaded7] bg-[#fcf8f6] p-4">
                <p className="text-sm text-[#8a7177]">Nombre del espacio</p>
                <p className="mt-2 text-lg font-semibold text-[#2f2326]">
                  {currentSpace?.name ?? "Nuestro espacio"}
                </p>
              </div>

              <div className="rounded-[26px] border border-[#eaded7] bg-[#fcf8f6] p-4">
                <p className="text-sm text-[#8a7177]">Estado</p>
                <p className="mt-2 text-lg font-semibold capitalize text-[#2f2326]">
                  {spaceData.status}
                </p>
              </div>

              <div className="rounded-[26px] border border-[#eaded7] bg-[#fcf8f6] p-4">
                <p className="text-sm text-[#8a7177]">Publicaciones</p>
                <p className="mt-2 text-lg font-semibold text-[#2f2326]">
                  {posts.length}
                </p>
              </div>
            </div>
          </aside>
        </div>

        {error ? (
          <div className="mt-6 rounded-[24px] border border-red-200 bg-red-50 px-5 py-4 text-red-700 shadow-sm">
            {error}
          </div>
        ) : null}

        <section className="mt-8">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-[#a07b83]">
                Feed
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-[-0.02em] text-[#2f2326]">
                Últimas publicaciones
              </h2>
            </div>
          </div>

          <div className="space-y-5">
            {posts.length === 0 ? (
              <article className="rounded-[30px] border border-white/70 bg-white/85 p-8 shadow-[0_20px_60px_rgba(61,42,47,0.07)]">
                <p className="text-base text-[#6f5b60]">
                  Todavía no hay publicaciones. Creá la primera.
                </p>
              </article>
            ) : (
              posts.map((post) => (
                <article
                  key={post.id}
                  className="overflow-hidden rounded-[30px] border border-white/70 bg-white/88 p-5 shadow-[0_20px_60px_rgba(61,42,47,0.07)] backdrop-blur sm:p-6"
                >
                  <div className="mb-4 flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-[#2f2326]">
                        Nuestro espacio
                      </p>
                      <p className="text-xs text-[#8a7177]">
                        {new Date(post.created_at).toLocaleString("es-AR")}
                      </p>
                    </div>

                    <div className="rounded-full border border-[#eaded7] bg-[#fcf8f6] px-3 py-1.5 text-xs text-[#8a7177]">
                      Privado
                    </div>
                  </div>

                  {post.content ? (
                    <p className="mb-5 whitespace-pre-wrap text-[15px] leading-8 text-[#3b2b30] sm:text-base">
                      {post.content}
                    </p>
                  ) : null}

                  {post.feed_post_media.length > 0 ? (
                    <div
                      className={`grid gap-3 ${
                        post.feed_post_media.length === 1
                          ? "grid-cols-1"
                          : "grid-cols-2"
                      }`}
                    >
                      {post.feed_post_media.map((media) =>
                        media.signed_url ? (
                          <div
                            key={media.id}
                            className="group overflow-hidden rounded-[24px] border border-[#eaded7] bg-[#f8f3ef]"
                          >
                            <div className="relative aspect-square w-full">
                              <Image
                                src={media.signed_url}
                                alt={media.caption ?? "Foto de la publicación"}
                                fill
                                className="object-cover transition duration-500 group-hover:scale-[1.03]"
                                unoptimized
                              />
                            </div>
                          </div>
                        ) : null
                      )}
                    </div>
                  ) : null}
                </article>
              ))
            )}
          </div>
        </section>
      </div>
    </main>
  );
}