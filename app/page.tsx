"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type Story = {
  id: string;
  name: string;
  active?: boolean;
  seen?: boolean;
  own?: boolean;
};

type Post = {
  id: string;
  author: string;
  time: string;
  text: string;
  likes: number;
  comments: number;
  avatarSeed: string;
  imageVariant: "beach" | "dinner" | "memory";
};

const storiesMock: Story[] = [
  { id: "1", name: "Tu historia", own: true, active: true },
  { id: "2", name: "Agus", active: true },
  { id: "3", name: "Abril", active: true },
  { id: "4", name: "Playa", seen: true },
  { id: "5", name: "Aniversario", active: true },
  { id: "6", name: "Costa", seen: true },
];

const postsMock: Post[] = [
  {
    id: "p1",
    author: "Agus",
    time: "Hace 23 min",
    text: "Hoy pensé en lo hermoso que es tener un lugar solo nuestro. Sin ruido, sin nadie más. Solo vos, yo y todos estos momentos que quiero guardar para siempre 💗",
    likes: 18,
    comments: 4,
    avatarSeed: "A",
    imageVariant: "beach",
  },
  {
    id: "p2",
    author: "Abril",
    time: "Hace 2 h",
    text: "Qué lindo fue salir sin plan, comer algo rico y terminar riéndonos por cualquier cosa. Me encantan estos días simples con vos.",
    likes: 26,
    comments: 7,
    avatarSeed: "B",
    imageVariant: "dinner",
  },
  {
    id: "p3",
    author: "Agus",
    time: "Ayer",
    text: "Mini recap del finde: música bajita, fotos lindas, tu sonrisa y esa paz rara que solo aparece cuando estoy con vos.",
    likes: 31,
    comments: 6,
    avatarSeed: "A",
    imageVariant: "memory",
  },
];

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-[#09070d] text-[#f7f1f7]">
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(98,54,122,0.28),transparent_30%),radial-gradient(circle_at_bottom,rgba(42,20,58,0.35),transparent_35%),linear-gradient(180deg,#09070d_0%,#0b0810_45%,#08060c_100%)]" />
        <div className="absolute left-[-70px] top-[120px] h-56 w-56 rounded-full bg-[#d18cff]/10 blur-3xl" />
        <div className="absolute right-[-40px] top-[260px] h-52 w-52 rounded-full bg-[#ff93ba]/10 blur-3xl" />
        <div className="absolute bottom-16 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-[#8e7cff]/10 blur-3xl" />
      </div>

      <div className="mx-auto min-h-screen w-full max-w-[430px] px-4 pb-28 pt-3">
        {children}
      </div>
    </main>
  );
}

function StoryAvatar({
  name,
  active,
  seen,
  own,
}: {
  name: string;
  active?: boolean;
  seen?: boolean;
  own?: boolean;
}) {
  return (
    <div className="flex w-[84px] shrink-0 flex-col items-center">
      <div
        className={cn(
          "rounded-full p-[2px]",
          active
            ? "bg-[linear-gradient(135deg,#ff8fb8_0%,#c992ff_52%,#7d87ff_100%)] shadow-[0_0_24px_rgba(201,146,255,0.22)]"
            : seen
            ? "bg-white/15"
            : "bg-[linear-gradient(135deg,#ffb3cf_0%,#caa2ff_55%,#8b95ff_100%)]"
        )}
      >
        <div className="relative flex h-[72px] w-[72px] items-center justify-center rounded-full bg-[#120e17]">
          <div className="flex h-[64px] w-[64px] items-center justify-center rounded-full bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.14),rgba(255,255,255,0.02)),linear-gradient(180deg,rgba(46,32,56,1),rgba(23,17,30,1))] text-sm font-semibold text-[#fff5fb]">
            {own ? "+" : name.slice(0, 1)}
          </div>

          {own ? (
            <div className="absolute bottom-0 right-0 flex h-5 w-5 items-center justify-center rounded-full border border-[#120e17] bg-[linear-gradient(135deg,#ff9dbe,#bb8fff)] text-[12px] font-bold text-[#170f1d]">
              +
            </div>
          ) : null}
        </div>
      </div>

      <span className="mt-2 line-clamp-1 text-center text-[11px] font-medium text-[#d4c6d8]">
        {name}
      </span>
    </div>
  );
}

function IconButton({
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
        "flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-[#e8ddea] backdrop-blur-md transition hover:bg-white/[0.08]",
        className
      )}
    >
      {children}
    </button>
  );
}

function MockImage({ variant }: { variant: Post["imageVariant"] }) {
  const bg =
    variant === "beach"
      ? "from-[#2a1830] via-[#8a536d] to-[#efb07f]"
      : variant === "dinner"
      ? "from-[#1c1424] via-[#4f3158] to-[#d59687]"
      : "from-[#1d1524] via-[#6c4267] to-[#c6a0bf]";

  return (
    <div className="relative overflow-hidden rounded-[26px] border border-white/10 bg-[#130f19]">
      <div className={cn("aspect-[4/5] w-full bg-gradient-to-br", bg)} />

      <div className="absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-24 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.22),transparent_55%)]" />
        <div className="absolute left-0 top-0 h-full w-full bg-[linear-gradient(180deg,transparent_0%,transparent_55%,rgba(0,0,0,0.28)_100%)]" />
        <div className="absolute -left-8 bottom-8 h-36 w-36 rounded-full bg-[#ffd0bf]/15 blur-3xl" />
        <div className="absolute right-4 top-12 h-24 w-24 rounded-full bg-[#d7a2ff]/16 blur-3xl" />
      </div>

      <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
        <div className="rounded-full border border-white/10 bg-black/25 px-3 py-1 text-[11px] text-[#f5dbe8] backdrop-blur-md">
          Solo nosotros
        </div>

        <div className="rounded-full border border-white/10 bg-black/25 px-3 py-1 text-[11px] text-[#eadce9] backdrop-blur-md">
          privado
        </div>
      </div>
    </div>
  );
}

function PostCard({ post }: { post: Post }) {
  return (
    <article className="overflow-hidden rounded-[28px] border border-white/8 bg-[linear-gradient(180deg,rgba(23,17,30,0.96),rgba(15,11,20,0.98))] shadow-[0_18px_50px_rgba(0,0,0,0.38)] backdrop-blur-xl">
      <div className="px-4 pb-4 pt-4">
        <div className="mb-3 flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <div className="rounded-full bg-[linear-gradient(135deg,#ff96bf_0%,#ca96ff_52%,#7f89ff_100%)] p-[2px]">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#120e17]">
                <div className="flex h-[34px] w-[34px] items-center justify-center rounded-full bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.16),rgba(255,255,255,0.02)),linear-gradient(180deg,rgba(46,32,56,1),rgba(23,17,30,1))] text-sm font-semibold text-[#fff5fb]">
                  {post.avatarSeed}
                </div>
              </div>
            </div>

            <div className="min-w-0">
              <p className="truncate text-[15px] font-semibold text-[#fff7fb]">
                {post.author}
              </p>
              <p className="truncate text-xs text-[#a99bab]">{post.time}</p>
            </div>
          </div>

          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-full text-[#b7aabc] transition hover:bg-white/[0.05]"
          >
            <DotsIcon />
          </button>
        </div>

        <p className="mb-4 text-[14.5px] leading-7 text-[#f0e5ef]">{post.text}</p>

        <MockImage variant={post.imageVariant} />

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button type="button" className="flex items-center gap-1.5 text-[#ff9bbb]">
              <HeartIcon className="h-[21px] w-[21px]" filled />
            </button>

            <button type="button" className="flex items-center gap-1.5 text-[#d7c8d8]">
              <CommentIcon className="h-[21px] w-[21px]" />
            </button>

            <button type="button" className="flex items-center gap-1.5 text-[#d7c8d8]">
              <ShareIcon className="h-[20px] w-[20px]" />
            </button>
          </div>

          <button type="button" className="text-[#d7c8d8]">
            <BookmarkIcon className="h-[20px] w-[20px]" />
          </button>
        </div>

        <div className="mt-3 flex items-center gap-3 text-xs text-[#b5a8b7]">
          <span className="font-medium text-[#f3e6ef]">{post.likes} Me gusta</span>
          <span>·</span>
          <span>{post.comments} comentarios</span>
        </div>
      </div>
    </article>
  );
}

function BottomNav() {
  const items = [
    { id: "home", label: "Inicio", active: true, icon: HomeIcon },
    { id: "albums", label: "Álbumes", active: false, icon: GridIcon },
    { id: "stories", label: "Historias", active: false, icon: PlayIcon },
    { id: "memories", label: "Recuerdos", active: false, icon: HeartOutlineIcon },
    { id: "profile", label: "Perfil", active: false, icon: UserIcon },
  ];

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center px-4 pb-4">
      <nav className="pointer-events-auto w-full max-w-[430px] rounded-[26px] border border-white/10 bg-[rgba(14,10,19,0.84)] px-2 py-2 shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
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
                      ? "bg-[linear-gradient(180deg,rgba(255,159,197,0.16),rgba(176,126,255,0.14))] text-[#ffd9ea]"
                      : "text-[#96899c] hover:bg-white/[0.04]"
                  )}
                >
                  <Icon className="h-[18px] w-[18px]" />
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
      <rect x="4" y="4" width="7" height="7" rx="1.6" />
      <rect x="13" y="4" width="7" height="7" rx="1.6" />
      <rect x="4" y="13" width="7" height="7" rx="1.6" />
      <rect x="13" y="13" width="7" height="7" rx="1.6" />
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

function UserIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 19c1.8-3 4.3-4.5 7-4.5s5.2 1.5 7 4.5" />
    </svg>
  );
}

function HeartIcon({
  className,
  filled,
}: {
  className?: string;
  filled?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.8"
      className={className}
    >
      <path d="M12 20.5s-7-4.35-9.5-8.19C.76 9.63 2.3 6 5.83 6c2.02 0 3.31 1.08 4.17 2.3C10.86 7.08 12.15 6 14.17 6 17.7 6 19.24 9.63 21.5 12.31 19 16.15 12 20.5 12 20.5Z" />
    </svg>
  );
}

function HeartOutlineIcon({ className }: { className?: string }) {
  return <HeartIcon className={className} />;
}

function CommentIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <path d="M7 17.5H5a2 2 0 0 1-2-2V6.8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8.7a2 2 0 0 1-2 2h-6.4L8 21v-3.5Z" />
    </svg>
  );
}

function ShareIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <path d="M21 4 11 14" />
      <path d="M21 4 14.5 20l-3.9-6.1L4.5 10 21 4Z" />
    </svg>
  );
}

function BookmarkIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <path d="M6 4.8A1.8 1.8 0 0 1 7.8 3h8.4A1.8 1.8 0 0 1 18 4.8V21l-6-3.9L6 21V4.8Z" />
    </svg>
  );
}

function DotsIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <circle cx="12" cy="5" r="1.8" />
      <circle cx="12" cy="12" r="1.8" />
      <circle cx="12" cy="19" r="1.8" />
    </svg>
  );
}

export default function HomePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [composerText, setComposerText] = useState("");
  const [posts] = useState(postsMock);

  const topStories = useMemo(() => storiesMock, []);

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
        if (mounted) setLoading(false);
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
      <AppShell>
        <div className="flex min-h-screen items-center justify-center">
          <div className="rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm text-[#d8ccda] backdrop-blur-xl">
            Cargando espacio...
          </div>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <header className="sticky top-0 z-30 mb-4 rounded-[26px] border border-white/8 bg-[rgba(15,11,20,0.72)] px-4 py-4 shadow-[0_16px_40px_rgba(0,0,0,0.28)] backdrop-blur-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.24em] text-[#ac98b6]">
              red social privada
            </p>
            <h1 className="mt-2 text-[28px] font-semibold leading-none tracking-[-0.04em] text-[#fff7fb]">
              Nuestro espacio
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <IconButton>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="3.2" />
                <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 .9 1.7 1.7 0 0 0-.15.68V21a2 2 0 1 1-4 0v-.12A1.7 1.7 0 0 0 8.8 19.4a1.7 1.7 0 0 0-1.88.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-.9-1 1.7 1.7 0 0 0-.68-.15H3a2 2 0 1 1 0-4h.12A1.7 1.7 0 0 0 4.6 8.8a1.7 1.7 0 0 0-.34-1.88l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.7 1.7 0 0 0 8.8 4.6a1.7 1.7 0 0 0 1-.9 1.7 1.7 0 0 0 .15-.68V3a2 2 0 1 1 4 0v.12A1.7 1.7 0 0 0 15 4.6a1.7 1.7 0 0 0 1.88-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.7 1.7 0 0 0 19.4 8.8a1.7 1.7 0 0 0 .9 1 1.7 1.7 0 0 0 .68.15H21a2 2 0 1 1 0 4h-.12a1.7 1.7 0 0 0-1.48 1.05Z" />
              </svg>
            </IconButton>

            <button
              type="button"
              onClick={handleLogout}
              className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-xs font-medium text-[#e9ddea] backdrop-blur-md transition hover:bg-white/[0.08]"
            >
              Salir
            </button>
          </div>
        </div>
      </header>

      <section className="mb-4">
        <div className="mb-3 flex items-center justify-between px-1">
          <h2 className="text-[15px] font-semibold text-[#fff6fb]">
            Historias recientes
          </h2>

          <div className="flex items-center gap-2">
            <button
              type="button"
              className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1.5 text-xs text-[#cbbfd0]"
            >
              +
            </button>
          </div>
        </div>

        <div className="no-scrollbar -mx-1 flex gap-3 overflow-x-auto px-1 pb-1">
          {topStories.map((story) => (
            <StoryAvatar
              key={story.id}
              name={story.name}
              active={story.active}
              seen={story.seen}
              own={story.own}
            />
          ))}
        </div>
      </section>

      <section className="mb-5 rounded-[26px] border border-white/8 bg-[linear-gradient(180deg,rgba(24,17,31,0.96),rgba(16,11,22,0.98))] p-4 shadow-[0_18px_50px_rgba(0,0,0,0.34)] backdrop-blur-xl">
        <div className="mb-3 flex items-center gap-3">
          <div className="rounded-full bg-[linear-gradient(135deg,#ff96bf_0%,#ca96ff_52%,#7f89ff_100%)] p-[2px]">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#120e17]">
              <div className="flex h-[34px] w-[34px] items-center justify-center rounded-full bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.16),rgba(255,255,255,0.02)),linear-gradient(180deg,rgba(46,32,56,1),rgba(23,17,30,1))] text-sm font-semibold text-[#fff5fb]">
                A
              </div>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-[#fff7fb]">Crear publicación</p>
            <p className="text-xs text-[#9f92a5]">Compartí un momento íntimo</p>
          </div>
        </div>

        <div className="rounded-[22px] border border-white/8 bg-white/[0.04] px-4 py-3 shadow-inner shadow-black/25">
          <input
            value={composerText}
            onChange={(e) => setComposerText(e.target.value)}
            placeholder="¿Qué querés compartir hoy?"
            className="w-full bg-transparent text-[15px] text-[#f4ebf3] outline-none placeholder:text-[#8d818f]"
          />
        </div>

        <div className="mt-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="rounded-full border border-white/8 bg-white/[0.04] px-3 py-2 text-xs text-[#d8c9d7]"
            >
              Foto
            </button>
            <button
              type="button"
              className="rounded-full border border-white/8 bg-white/[0.04] px-3 py-2 text-xs text-[#d8c9d7]"
            >
              Álbum
            </button>
            <button
              type="button"
              className="rounded-full border border-white/8 bg-white/[0.04] px-3 py-2 text-xs text-[#d8c9d7]"
            >
              Historia
            </button>
          </div>

          <button
            type="button"
            className="rounded-[18px] bg-[linear-gradient(135deg,#f0a2c2,#b384ff)] px-4 py-2.5 text-sm font-semibold text-[#170f1d] shadow-[0_12px_30px_rgba(189,127,255,0.26)] transition hover:brightness-105"
          >
            Publicar
          </button>
        </div>
      </section>

      <section className="space-y-5">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </section>

      <BottomNav />
    </AppShell>
  );
}