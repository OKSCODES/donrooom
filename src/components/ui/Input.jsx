import { forwardRef } from 'react'
import { cn } from '../../utils/cn'

export const Input = forwardRef(function Input({ className, error, ...props }, ref) {
  return (
    <input
      className={cn(
        'min-h-12 w-full rounded-2xl border bg-white px-4 text-donroom-text outline-none transition placeholder:text-subtle focus:border-black/40 focus:ring-4 focus:ring-donroom-primary/45',
        error ? 'border-red-500' : 'border-default',
        className,
      )}
      ref={ref}
      {...props}
    />
  )
})
