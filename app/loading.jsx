// Route-level loading state (elegant minimal spinner / wordmark shimmer).

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-ink">
      <span className="text-sm tracking-[0.3em] uppercase text-fog animate-pulse">
        Opeyemi T. Ojurongbe
      </span>
    </div>
  );
}
