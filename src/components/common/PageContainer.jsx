import { cn } from '../../utils/cn'

export function PageContainer({ as: Component = 'div', className, children }) {
  return (
    <Component className={cn('mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8', className)}>
      {children}
    </Component>
  )
}
