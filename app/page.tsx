"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { getMyActiveSpace } from "@/lib/space";

type FeedPost = {
  id: string;
  content: string | null;
  created_at: string;
  author_id: string;
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

export default function HomePage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [spaceData, setSpaceData] = useState<SpaceData | null>(null);
  const [posts, setPosts] = useState<FeedPost[]>([]);
  const [postText, setPostText] = useState("");
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
          // Supabase a veces devuelve un array para relaciones 1-1. Nos aseguramos de tomar el primero o null
          spaces: Array.isArray(mySpace.spaces)
            ? mySpace.spaces[0] ?? null
            : mySpace.spaces,
        };

        if (isMounted) {
          setSpaceData(normalizedSpace);
        }

        const { data: feedPosts, error: postsError } = await supabase
          .from("feed_posts")
          .select("id, content, created_at, author_id")
          .eq("space_id", normalizedSpace.space_id)
          .order("created_at", { ascending: false });

        if (postsError) {
          if (isMounted) {
            setError(postsError.message);
          }
          return;
        }

        if (isMounted) {
          setPosts(feedPosts ?? []);
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

  async function handleLogout() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      setError(error.message);
      return;
    }

    router.push("/login");
    router.refresh();
  }

  async function handleCreatePost(e: FormEvent) {
    e.preventDefault();

    if (!spaceData || !postText.trim() || !userId) return;

    setPublishing(true);
    setError("");

    try {
      const { data, error } = await supabase
        .from("feed_posts")
        .insert({
          space_id: spaceData.space_id,
          author_id: userId,
          content: postText.trim(),
        })
        .select("id, content, created_at, author_id")
        .single();

      if (error) {
        setError(error.message);
        return;
      }

      setPosts((prev) => [data, ...prev]);
      setPostText("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error inesperado");
    } finally {
      setPublishing(false);
    }
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f8f3ef] text-[#3d2a2f]">
        <p>Cargando feed...</p>
      </main>
    );
  }

  if (!spaceData) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f8f3ef] px-6 text-center text-[#3d2a2f]">
        <div>
          <p className="text-lg font-medium">
            {error || "No tenés un espacio activo todavía."}
          </p>

          <button
            onClick={() => router.push("/login")}
            className="mt-4 rounded-xl bg-[#b9858b] px-4 py-2 font-medium text-white transition hover:opacity-90"
          >
            Ir al login
          </button>
        </div>
      </main>
    );
  }

  const currentSpace = spaceData.spaces;

  return (
    <main className="min-h-screen bg-[#f8f3ef] px-6 py-10 text-[#3d2a2f]">
      <div className="mx-auto max-w-3xl">
        <header className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="mb-2 text-sm uppercase tracking-[0.2em] text-[#9c6f78]">
              Red social privada
            </p>
            <h1 className="text-3xl font-semibold">
              {currentSpace?.name ?? "Nuestro espacio"}
            </h1>
          </div>

          <button
            onClick={handleLogout}
            className="rounded-xl bg-[#b9858b] px-4 py-2 font-medium text-white transition hover:opacity-90"
          >
            Cerrar sesión
          </button>
        </header>

        <section className="mb-6 rounded-3xl border border-[#eaded7] bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold">Crear publicación</h2>

          <form onSubmit={handleCreatePost} className="space-y-4">
            <textarea
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              placeholder="¿Qué querés compartir hoy?"
              className="min-h-[120px] w-full rounded-2xl border border-[#dbcac2] px-4 py-3 outline-none focus:border-[#b8858f]"
            />

            <button
              type="submit"
              disabled={publishing || !postText.trim()}
              className="rounded-xl bg-[#b9858b] px-5 py-3 font-medium text-white transition hover:opacity-90 disabled:opacity-60"
            >
              {publishing ? "Publicando..." : "Publicar"}
            </button>
          </form>
        </section>

        {error ? (
          <div className="mb-6 rounded-2xl bg-red-100 p-4 text-red-700">
            {error}
          </div>
        ) : null}

        <section className="space-y-4">
          {posts.length === 0 ? (
            <article className="rounded-3xl border border-[#eaded7] bg-white p-6 shadow-sm">
              <p className="text-[#6f5b60]">
                Todavía no hay publicaciones. Creá la primera.
              </p>
            </article>
          ) : (
            posts.map((post) => (
              <article
                key={post.id}
                className="rounded-3xl border border-[#eaded7] bg-white p-6 shadow-sm"
              >
                <p className="mb-3 whitespace-pre-wrap text-base leading-7 text-[#3d2a2f]">
                  {post.content}
                </p>

                <time className="text-sm text-[#8a7177]">
                  {new Date(post.created_at).toLocaleString("es-AR")}
                </time>
              </article>
            ))
          )}
        </section>
      </div>
    </main>
  );
}