import { cn } from '../../utils/cn'

export function FormField({ id, label, error, hint, className, children }) {
  return (
    <div className={cn('space-y-2', className)}>
      <label className="block text-sm font-semibold text-donroom-text" htmlFor={id}>{label}</label>
      {children}
      {hint && !error ? <p className="text-xs leading-5 text-muted">{hint}</p> : null}
      {error ? <p className="text-sm font-medium text-red-700" id={`${id}-error`} role="alert">{error}</p> : null}
    </div>
  )
}
