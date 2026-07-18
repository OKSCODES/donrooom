import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { Input } from '../ui/Input'

export function PasswordField({ id, error, ...props }) {
  const [visible, setVisible] = useState(false)
  return (
    <div className="relative">
      <Input aria-describedby={error ? `${id}-error` : undefined} aria-invalid={Boolean(error)} className="pr-12" error={error} id={id} type={visible ? 'text' : 'password'} {...props} />
      <button
        aria-label={visible ? 'Hide password' : 'Show password'}
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-2 text-muted transition hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30"
        onClick={() => setVisible((value) => !value)}
        type="button"
      >
        {visible ? <EyeOff size={19} /> : <Eye size={19} />}
      </button>
    </div>
  )
}
