export function Skeleton({ className = '' }) {
  return <span aria-hidden="true" className={`block animate-pulse rounded-xl bg-black/10 ${className}`} />
}

export function CardSkeleton() {
  return <div role="status" aria-label="Loading content" className="rounded-[1.5rem] border border-default bg-white p-4 shadow-sm"><Skeleton className="aspect-[4/3] w-full"/><Skeleton className="mt-4 h-5 w-3/4"/><Skeleton className="mt-3 h-4 w-1/2"/><span className="sr-only">Loading</span></div>
}
