import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { storage } from '../firebase'
import { PROFILE_IMAGE_MAX_BYTES, PROFILE_IMAGE_TYPES } from '../constants/auth'

function validateProfileImage(file) {
  if (!file) throw new Error('Select an image to upload.')
  if (!PROFILE_IMAGE_TYPES.includes(file.type)) throw new Error('Use a JPG, PNG, or WebP image.')
  if (file.size > PROFILE_IMAGE_MAX_BYTES) throw new Error('Profile images must be 5 MB or smaller.')
}

export async function uploadProfileImage(uid, file) {
  if (!storage) throw new Error('Firebase Storage is not configured.')
  validateProfileImage(file)
  const extension = file.name.split('.').pop()?.toLowerCase() || 'jpg'
  const imageRef = ref(storage, `profile-images/${uid}/avatar.${extension}`)
  await uploadBytes(imageRef, file, { contentType: file.type })
  return getDownloadURL(imageRef)
}

export async function deleteProfileImageByUrl(url) {
  if (!storage || !url) return
  try {
    await deleteObject(ref(storage, url))
  } catch (error) {
    if (error?.code !== 'storage/object-not-found') throw error
  }
}
