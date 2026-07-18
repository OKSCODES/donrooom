import { LoaderCircle } from 'lucide-react'
import { Button } from '../ui/Button'

export function SubmitButton({ isLoading, loadingLabel, children }) {
  return (
    <Button className="w-full" disabled={isLoading} type="submit">
      {isLoading ? <><LoaderCircle aria-hidden="true" className="mr-2 animate-spin" size={18} />{loadingLabel}</> : children}
    </Button>
  )
}
