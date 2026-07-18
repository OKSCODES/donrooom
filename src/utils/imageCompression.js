const supportedTypes = ['image/jpeg', 'image/png', 'image/webp']
export function validateImage(file, maxMb = 5) {
  if (!file) throw new Error('Select an image to continue.')
  if (!supportedTypes.includes(file.type)) throw new Error('Use a JPEG, PNG, or WebP image.')
  if (file.size > maxMb * 1024 * 1024) throw new Error(`Image must be ${maxMb} MB or smaller.`)
}
export async function compressImage(file, { maxWidth = 1800, quality = 0.82 } = {}) {
  validateImage(file)
  if (file.type === 'image/png' && file.size < 800000) return file
  const bitmap = await createImageBitmap(file)
  const scale = Math.min(1, maxWidth / bitmap.width)
  const canvas = document.createElement('canvas')
  canvas.width = Math.max(1, Math.round(bitmap.width * scale))
  canvas.height = Math.max(1, Math.round(bitmap.height * scale))
  const context = canvas.getContext('2d')
  context.drawImage(bitmap, 0, 0, canvas.width, canvas.height)
  const blob = await new Promise((resolve, reject) => canvas.toBlob((value) => value ? resolve(value) : reject(new Error('Image compression failed.')), 'image/webp', quality))
  bitmap.close()
  return new File([blob], `${file.name.replace(/\.[^.]+$/, '')}.webp`, { type: 'image/webp' })
}
