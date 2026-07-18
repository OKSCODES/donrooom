export function Loading({ label = 'Loading' }) {
  return (
    <div className="flex min-h-64 items-center justify-center" role="status" aria-live="polite">
      <div className="flex items-center gap-3 text-sm font-medium text-black/65">
        <span className="h-5 w-5 animate-spin rounded-full border-2 border-black/15 border-t-black" />
        <span>{label}</span>
      </div>
    </div>
  )
}
