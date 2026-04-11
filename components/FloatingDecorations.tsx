export function FloatingDecorations() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute left-[8%] top-24 h-28 w-28 rounded-full bg-blush/45 blur-3xl sm:h-40 sm:w-40" />
      <div className="absolute right-[10%] top-40 h-24 w-24 rounded-full bg-peach/45 blur-3xl sm:h-36 sm:w-36" />
      <div className="absolute bottom-10 left-1/2 h-32 w-32 -translate-x-1/2 rounded-full bg-wine/10 blur-3xl sm:h-44 sm:w-44" />
    </div>
  );
}
