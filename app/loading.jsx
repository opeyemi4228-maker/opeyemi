// Route-level loading state — the wordmark, quietly pulsing.

export default function Loading() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-paper">
      <span className="animate-pulse text-[11px] font-semibold uppercase tracking-[0.3em] text-slate">
        Opeyemi T. Ojurongbe
      </span>
    </div>
  );
}
