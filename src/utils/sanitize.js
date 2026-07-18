export function sanitizePlainText(value, maxLength = 1000) {
  const printable = Array.from(String(value ?? '')).filter((character) => {
    const code = character.charCodeAt(0)
    return code >= 32 && code !== 127
  }).join('')
  return printable.replace(/[<>]/g, '').trim().slice(0, maxLength)
}

export function normalizeEmail(value) { return sanitizePlainText(value, 254).toLowerCase() }
export function normalizePhone(value) { return String(value ?? '').replace(/[^+\d]/g, '').slice(0, 16) }
