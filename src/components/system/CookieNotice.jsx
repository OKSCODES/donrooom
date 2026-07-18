import { useState } from 'react'

const COOKIE_NOTICE_KEY = 'donroom-cookie-notice'

function readCookiePreference() {
  try {
    return window.localStorage.getItem(COOKIE_NOTICE_KEY)
  } catch {
    return null
  }
}

function saveCookiePreference() {
  try {
    window.localStorage.setItem(COOKIE_NOTICE_KEY, 'accepted')
  } catch {
    // The notice can still be dismissed for the current session when storage is unavailable.
  }
}

export function CookieNotice() {
  const [visible, setVisible] = useState(() => readCookiePreference() !== 'accepted')

  if (!visible) return null

  const accept = () => {
    saveCookiePreference()
    setVisible(false)
  }

  return (
    <section
      aria-label="Cookie notice"
      className="fixed bottom-4 right-4 z-[85] max-w-sm rounded-2xl border border-default bg-dark-surface p-5 text-white shadow-2xl"
    >
      <h2 className="font-black">Privacy choices</h2>
      <p className="mt-2 text-sm leading-6 text-on-dark-muted">
        DONROOM uses essential browser storage for secure sessions and preferences. Optional analytics remains disabled unless configured.
      </p>
      <div className="mt-4 flex items-center gap-3">
        <button
          className="rounded-xl bg-primary-action px-4 py-2 text-sm font-black text-black"
          onClick={accept}
          type="button"
        >
          Understood
        </button>
        <a className="text-sm font-bold underline" href="/cookies">
          Cookie policy
        </a>
      </div>
    </section>
  )
}
