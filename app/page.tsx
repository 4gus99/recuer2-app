"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type StoryItem = {
  id: string;
  name: string;
  label?: string;
  isAdd?: boolean;
  gradient: string;
};

type PostItem = {
  id: string;
  author: string;
  handle: string;
  time: string;
  avatarGradient: string;
  text: string;
  imageLabel: string;
  imageMood: string;
  likes: number;
  comments: number;
  saved?: boolean;
  liked?: boolean;
};

const stories: StoryItem[] = [
  {
    id: "s1",
    name: "Tu historia",
    label: "Agregar",
    isAdd: true,
    gradient: "from-[#ffb8d1] via-[#d89cff] to-[#8f7bff]",
  },
  {
    id: "s2",
    name: "Agus",
    gradient: "from-[#ffb6c8] via-[#f093ff] to-[#7d6bff]",
  },
  {
    id: "s3",
    name: "Abril",
    gradient: "from-[#ffd1b0] via-[#f4a4ff] to-[#8d7bff]",
  },
  {
    id: "s4",
    name: "Playa",
    gradient: "from-[#ffcaaf] via-[#f7b0ff] to-[#6e7fff]",
  },
  {
    id: "s5",
    name: "Aniversario",
    gradient: "from-[#ffc1dc] via-[#c7a2ff] to-[#8f76ff]",
  },
  {
    id: "s6",
    name: "Costa",
    gradient: "from-[#ffd7c4] via-[#dca6ff] to-[#7c86ff]",
  },
];

const initialPosts: PostItem[] = [
  {
    id: "p1",
    author: "Agus",
    handle: "@nosotros",
    time: "Hace 12 min",
    avatarGradient: "from-[#ffb9cb] via-[#df9fff] to-[#8b7aff]",
    text:
      "Hoy me quedé pensando en lo lindo que es tener un lugar solo nuestro. Me gusta que incluso los días normales, con vos, se sienten especiales.",
    imageLabel: "Atardecer juntos",
    imageMood: "warm-sunset",
    likes: 28,
    comments: 6,
    liked: true,
    saved: true,
  },
  {
    id: "p2",
    author: "Abril",
    handle: "@nuestroespacio",
    time: "Hace 1 h",
    avatarGradient: "from-[#ffd0b5] via-[#e7a0ff] to-[#7f82ff]",
    text:
      "Esa salida improvisada terminó siendo uno de mis planes favoritos. Café, charla larga y esa sensación de que no quería que se terminara nunca.",
    imageLabel: "Salida improvisada",
    imageMood: "city-night",
    likes: 41,
    comments: 9,
    liked: false,
    saved: false,
  },
  {
    id: "p3",
    author: "Agus",
    handle: "@memorias",
    time: "Ayer",
    avatarGradient: "from-[#ffc1d8] via-[#cfa2ff] to-[#8089ff]",
    text:
      "Mini recap del fin de semana: música bajita, fotos borrosas lindas, comida rica y vos riéndote de mis chistes malos. Honestamente, plan perfecto.",
    imageLabel: "Recuerdo del finde",
    imageMood: "soft-memory",
    likes: 57,
    comments: 12,
    liked: true,
    saved: false,
  },
];

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function AppIconButton({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      className={cn(
        "flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] text-[#f7eef7] backdrop-blur-md transition hover:bg-white/[0.1]",
        className
      )}
    >
      {children}
    </button>
  );
}

function StoryRing({ item }: { item: StoryItem }) {
  return (
    <div className="flex w-[84px] shrink-0 flex-col items-center">
      <div
        className={cn(
          "rounded-full bg-gradient-to-br p-[2px] shadow-[0_0_28px_rgba(188,127,255,0.20)]",
          item.gradient
        )}
      >
        <div className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-[#120d18]">
          <div
            className={cn(
              "relative flex h-[64px] w-[64px] items-center justify-center overflow-hidden rounded-full",
              item.isAdd
                ? "bg-[radial-gradient(circle_at_30%_30%,rgba(255,196,216,0.35),rgba(123,92,255,0.18),rgba(28,18,38,1))]"
                : "bg-[radial-gradient(circle_at_30%_30%,rgba(255,196,216,0.28),rgba(129,102,255,0.22),rgba(28,18,38,1))]"
            )}
          >
            {item.isAdd ? (
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-xl text-white">
                +
              </div>
            ) : (
              <span className="text-sm font-semibold text-[#fff5fb]">
                {item.name.slice(0, 1)}
              </span>
            )}

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.18),transparent_38%)]" />
          </div>
        </div>
      </div>

      <span className="mt-2 line-clamp-1 text-center text-[11px] font-medium text-[#d8c8da]">
        {item.label ?? item.name}
      </span>
    </div>
  );
}

function MockPhoto({ mood, label }: { mood: string; label: string }) {
  const moodClass =
    mood === "warm-sunset"
      ? "from-[#4a2030] via-[#8e4361] to-[#f0a16c]"
      : mood === "city-night"
      ? "from-[#1c1830] via-[#43316d] to-[#c78689]"
      : "from-[#26192d] via-[#6a3f66] to-[#c59bbf]";

  return (
    <div className="relative overflow-hidden rounded-[26px] border border-white/10">
      <div
        className={cn(
          "aspect-[4/5] w-full bg-gradient-to-br",
          moodClass
        )}
      />

      <div className="absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-32 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.18),transparent_55%)]" />
        <div className="absolute -left-10 bottom-8 h-40 w-40 rounded-full bg-[#ffd0c2]/15 blur-3xl" />
        <div className="absolute right-0 top-10 h-32 w-32 rounded-full bg-[#d6a8ff]/20 blur-3xl" />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/35 to-transparent" />
      </div>

      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between px-4 pb-4">
        <div>
          <p className="text-sm font-semibold text-[#fff7fb]">{label}</p>
          <p className="mt-1 text-xs text-[#ead6e7]/85">Solo nosotros</p>
        </div>

        <div className="rounded-full border border-white/10 bg-black/25 px-3 py-1 text-[11px] text-[#f4d8e9] backdrop-blur-md">
          privado
        </div>
      </div>
    </div>
  );
}

function PostCard({ post }: { post: PostItem }) {
  return (
    <article className="rounded-[28px] border border-white/8 bg-[linear-gradient(180deg,rgba(33,24,41,0.96),rgba(20,14,27,0.98))] p-4 shadow-[0_20px_60px_rgba(0,0,0,0.38)] backdrop-blur-xl">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div
            className={cn(
              "rounded-full bg-gradient-to-br p-[2px]",
              post.avatarGradient
            )}
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#120d18]">
              <div className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.16),rgba(255,255,255,0.02))] text-sm font-semibold text-[#fff5fb]">
                {post.author.slice(0, 1)}
              </div>
            </div>
          </div>

          <div className="min-w-0">
            <p className="truncate text-[15px] font-semibold text-[#fff7fb]">
              {post.author}
            </p>
            <div className="flex items-center gap-2 text-xs text-[#bcaebb]">
              <span>{post.handle}</span>
              <span className="h-1 w-1 rounded-full bg-[#7f7382]" />
              <span>{post.time}</span>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-white/[0.04] text-[#cabcca] transition hover:bg-white/[0.08]"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <circle cx="12" cy="5" r="1.8" />
            <circle cx="12" cy="12" r="1.8" />
            <circle cx="12" cy="19" r="1.8" />
          </svg>
        </button>
      </div>

      <p className="mb-4 text-[14.5px] leading-7 text-[#efe4ef]">{post.text}</p>

      <MockPhoto mood={post.imageMood} label={post.imageLabel} />

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            type="button"
            className={cn(
              "flex items-center gap-2 text-sm transition",
              post.liked ? "text-[#ff9bbb]" : "text-[#d9c6d5]"
            )}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill={post.liked ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth="1.8"
              aria-hidden="true"
            >
              <path d="M12 20.5s-7-4.35-9.5-8.19C.76 9.63 2.3 6 5.83 6c2.02 0 3.31 1.08 4.17 2.3C10.86 7.08 12.15 6 14.17 6 17.7 6 19.24 9.63 21.5 12.31 19 16.15 12 20.5 12 20.5Z" />
            </svg>
            <span>{post.likes}</span>
          </button>

          <button type="button" className="flex items-center gap-2 text-sm text-[#d9c6d5]">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              aria-hidden="true"
            >
              <path d="M7 17.5H5a2 2 0 0 1-2-2V6.8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8.7a2 2 0 0 1-2 2h-6.4L8 21v-3.5Z" />
            </svg>
            <span>{post.comments}</span>
          </button>

          <button type="button" className="text-[#d9c6d5]">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              aria-hidden="true"
            >
              <path d="M21 4 11 14" />
              <path d="M21 4 14.5 20l-3.9-6.1L4.5 10 21 4Z" />
            </svg>
          </button>
        </div>

        <button
          type="button"
          className={cn(
            "transition",
            post.saved ? "text-[#dca8ff]" : "text-[#d9c6d5]"
          )}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill={post.saved ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="1.8"
            aria-hidden="true"
          >
            <path d="M6 4.8A1.8 1.8 0 0 1 7.8 3h8.4A1.8 1.8 0 0 1 18 4.8V21l-6-3.9L6 21V4.8Z" />
          </svg>
        </button>
      </div>

      <div className="mt-3 text-xs text-[#ab9ead]">
        <span className="font-medium text-[#f0e2ed]">{post.likes} Me gusta</span>
        <span className="mx-2">·</span>
        <span>{post.comments} comentarios</span>
      </div>
    </article>
  );
}

function BottomNav() {
  const items = [
    { id: "home", label: "Inicio", active: true, icon: HomeIcon },
    { id: "albums", label: "Álbumes", active: false, icon: GridIcon },
    { id: "stories", label: "Historias", active: false, icon: PlayIcon },
    { id: "memories", label: "Recuerdos", active: false, icon: HeartIcon },
    { id: "profile", label: "Perfil", active: false, icon: UserIcon },
  ];

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center px-4 pb-4">
      <nav className="pointer-events-auto w-full max-w-[430px] rounded-[28px] border border-white/10 bg-[rgba(19,13,27,0.88)] px-3 py-2 shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
        <ul className="grid grid-cols-5 gap-1">
          {items.map((item) => {
            const Icon = item.icon;

            return (
              <li key={item.id}>
                <button
                  type="button"
                  className={cn(
                    "flex w-full flex-col items-center justify-center gap-1 rounded-[18px] px-2 py-2.5 transition",
                    item.active
                      ? "bg-[linear-gradient(180deg,rgba(255,184,211,0.18),rgba(185,133,255,0.14))] text-[#ffd7e8]"
                      : "text-[#9f92a5] hover:bg-white/[0.04]"
                  )}
                >
                  <Icon className="h-[19px] w-[19px]" />
                  <span className="text-[10px] font-medium">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

function HomeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <path d="M4 10.5 12 4l8 6.5" />
      <path d="M6.5 9.5V20h11V9.5" />
    </svg>
  );
}

function GridIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <rect x="4" y="4" width="7" height="7" rx="1.5" />
      <rect x="13" y="4" width="7" height="7" rx="1.5" />
      <rect x="4" y="13" width="7" height="7" rx="1.5" />
      <rect x="13" y="13" width="7" height="7" rx="1.5" />
    </svg>
  );
}

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <rect x="4" y="4" width="16" height="16" rx="5" />
      <path d="m10 8.8 5.4 3.2L10 15.2V8.8Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

function HeartIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <path d="M12 20.5s-7-4.35-9.5-8.19C.76 9.63 2.3 6 5.83 6c2.02 0 3.31 1.08 4.17 2.3C10.86 7.08 12.15 6 14.17 6 17.7 6 19.24 9.63 21.5 12.31 19 16.15 12 20.5 12 20.5Z" />
    </svg>
  );
}

function UserIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 19c1.8-3 4.3-4.5 7-4.5s5.2 1.5 7 4.5" />
    </svg>
  );
}

export default function HomePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [composerText, setComposerText] = useState("");
  const [posts] = useState<PostItem[]>(initialPosts);

  const activeStoryCount = useMemo(() => stories.length, []);

  useEffect(() => {
    let mounted = true;

    async function checkSession() {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session) {
          router.push("/login");
          return;
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    checkSession();

    return () => {
      mounted = false;
    };
  }, [router]);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#09060d] text-[#f7eef7]">
        <div className="mx-auto flex min-h-screen max-w-[430px] items-center justify-center px-6">
          <div className="rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm text-[#d7cad8] backdrop-blur-xl">
            Cargando espacio...
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#09060d] text-[#f7eef7]">
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(71,40,91,0.55),transparent_34%),radial-gradient(circle_at_bottom,rgba(36,18,50,0.75),transparent_36%),linear-gradient(180deg,#09060d_0%,#0e0913_45%,#09060d_100%)]" />
        <div className="absolute left-[-80px] top-[90px] h-56 w-56 rounded-full bg-[#a265ff]/10 blur-3xl" />
        <div className="absolute right-[-60px] top-[200px] h-52 w-52 rounded-full bg-[#ff96c2]/10 blur-3xl" />
        <div className="absolute bottom-20 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-[#8f7cff]/8 blur-3xl" />
      </div>

      <div className="mx-auto flex min-h-screen w-full max-w-[430px] flex-col px-4 pb-28 pt-4">
        <header className="sticky top-0 z-30 -mx-1 mb-4 rounded-[28px] border border-white/8 bg-[rgba(17,12,24,0.72)] px-4 py-4 shadow-[0_14px_40px_rgba(0,0,0,0.28)] backdrop-blur-2xl">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.26em] text-[#ae96b6]">
                red social privada
              </p>
              <h1 className="mt-2 text-[30px] font-semibold leading-none tracking-[-0.04em] text-[#fff7fb]">
                Nuestro espacio
              </h1>
            </div>

            <div className="flex items-center gap-2">
              <AppIconButton>
                <svg
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="3.2" />
                  <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 .9 1.7 1.7 0 0 0-.15.68V21a2 2 0 1 1-4 0v-.12A1.7 1.7 0 0 0 8.8 19.4a1.7 1.7 0 0 0-1.88.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-.9-1 1.7 1.7 0 0 0-.68-.15H3a2 2 0 1 1 0-4h.12A1.7 1.7 0 0 0 4.6 8.8a1.7 1.7 0 0 0-.34-1.88l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.7 1.7 0 0 0 8.8 4.6a1.7 1.7 0 0 0 1-.9 1.7 1.7 0 0 0 .15-.68V3a2 2 0 1 1 4 0v.12A1.7 1.7 0 0 0 15 4.6a1.7 1.7 0 0 0 1.88-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.7 1.7 0 0 0 19.4 8.8a1.7 1.7 0 0 0 .9 1 1.7 1.7 0 0 0 .68.15H21a2 2 0 1 1 0 4h-.12a1.7 1.7 0 0 0-1.48 1.05Z" />
                </svg>
              </AppIconButton>

              <button
                type="button"
                onClick={handleLogout}
                className="rounded-2xl border border-white/8 bg-white/[0.05] px-3.5 py-3 text-xs font-medium text-[#ead6e7] backdrop-blur-md transition hover:bg-white/[0.08]"
              >
                Salir
              </button>
            </div>
          </div>
        </header>

        <section className="mb-5">
          <div className="mb-3 flex items-center justify-between px-1">
            <div>
              <h2 className="text-[15px] font-semibold text-[#fff3fa]">
                Historias
              </h2>
              <p className="mt-1 text-[12px] text-[#9f92a5]">
                {activeStoryCount} momentos recientes
              </p>
            </div>

            <button
              type="button"
              className="text-[12px] font-medium text-[#d7b2ff]"
            >
              Ver todo
            </button>
          </div>

          <div className="no-scrollbar -mx-1 flex gap-3 overflow-x-auto px-1 pb-1">
            {stories.map((story) => (
              <StoryRing key={story.id} item={story} />
            ))}
          </div>
        </section>

        <section className="mb-5 rounded-[28px] border border-white/8 bg-[linear-gradient(180deg,rgba(28,20,36,0.96),rgba(18,13,25,0.98))] p-4 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl">
          <div className="mb-4 flex items-center gap-3">
            <div className="rounded-full bg-gradient-to-br from-[#ffb9cb] via-[#d89cff] to-[#8a7bff] p-[2px]">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#120d18]">
                <div className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.16),rgba(255,255,255,0.02))] text-sm font-semibold text-[#fff5fb]">
                  A
                </div>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-[#fff7fb]">Agus</p>
              <p className="text-xs text-[#a99baa]">Compartí algo íntimo</p>
            </div>
          </div>

          <div className="rounded-[22px] border border-white/8 bg-white/[0.04] p-3 shadow-inner shadow-black/20">
            <textarea
              value={composerText}
              onChange={(e) => setComposerText(e.target.value)}
              placeholder="¿Qué querés compartir hoy?"
              className="min-h-[106px] w-full resize-none bg-transparent px-1 py-1 text-[15px] leading-7 text-[#f3eaf2] outline-none placeholder:text-[#8f828f]"
            />
          </div>

          <div className="mt-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="rounded-full border border-white/8 bg-white/[0.04] px-3 py-2 text-xs text-[#d7c8d6]"
              >
                Foto
              </button>
              <button
                type="button"
                className="rounded-full border border-white/8 bg-white/[0.04] px-3 py-2 text-xs text-[#d7c8d6]"
              >
                Álbum
              </button>
              <button
                type="button"
                className="rounded-full border border-white/8 bg-white/[0.04] px-3 py-2 text-xs text-[#d7c8d6]"
              >
                Historia
              </button>
            </div>

            <button
              type="button"
              className="rounded-[18px] bg-[linear-gradient(135deg,#d596b6,#9e79ff)] px-4 py-2.5 text-sm font-semibold text-[#140d18] shadow-[0_12px_30px_rgba(189,127,255,0.28)] transition hover:brightness-105"
            >
              Publicar
            </button>
          </div>
        </section>

        <section className="flex-1">
          <div className="mb-4 px-1">
            <h2 className="text-[15px] font-semibold text-[#fff3fa]">Feed</h2>
            <p className="mt-1 text-[12px] text-[#9f92a5]">
              Tus momentos compartidos
            </p>
          </div>

          <div className="space-y-5">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      </div>

      <BottomNav />
    </main>
  );
}