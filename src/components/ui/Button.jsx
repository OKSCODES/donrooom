import { cn } from '../../utils/cn'

const variants = {
  primary: 'bg-donroom-primary text-donroom-text hover:bg-donroom-secondary',
  secondary: 'border border-default bg-white text-donroom-text hover:bg-donroom-cream',
  ghost: 'text-donroom-text hover:bg-black/5',
}

export function Button({ className, type = 'button', variant = 'primary', ...props }) {
  return (
    <button
      className={cn(
        'inline-flex min-h-11 items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30 disabled:cursor-not-allowed disabled:opacity-60',
        variants[variant],
        className,
      )}
      type={type}
      {...props}
    />
  )
}
