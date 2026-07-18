import { addDoc, collection, deleteDoc, doc, getDocs, limit, query, serverTimestamp, setDoc, updateDoc, where, writeBatch } from 'firebase/firestore'
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { db, storage } from '../firebase'

const requireFirebase = () => { if (!db || !storage) throw new Error('Firebase is not configured.') }
const clean = (value) => Object.fromEntries(Object.entries(value).filter(([, item]) => item !== undefined))

export async function getOwnerProperty(ownerId) {
  if (!db) return null
  const snap = await getDocs(query(collection(db, 'properties'), where('ownerId', '==', ownerId), limit(1)))
  return snap.empty ? null : { id: snap.docs[0].id, ...snap.docs[0].data() }
}
export async function saveOwnerProperty(ownerId, property) {
  requireFirebase()
  const id = property.id || crypto.randomUUID()
  const payload = clean({ ...property, id, ownerId, updatedAt: serverTimestamp(), createdAt: property.createdAt || serverTimestamp() })
  await setDoc(doc(db, 'properties', id), payload, { merge: true })
  return id
}
export async function listOwnerRooms(ownerId, propertyId) {
  if (!db || !propertyId) return []
  const snap = await getDocs(query(collection(db, 'rooms'), where('ownerId', '==', ownerId), where('propertyId', '==', propertyId)))
  return snap.docs.map((item) => ({ id: item.id, ...item.data() }))
}
export async function saveRoom(ownerId, propertyId, room) {
  requireFirebase()
  const id = room.id || crypto.randomUUID()
  await setDoc(doc(db, 'rooms', id), clean({ ...room, id, ownerId, propertyId, updatedAt: serverTimestamp(), createdAt: room.createdAt || serverTimestamp() }), { merge: true })
  return id
}
export async function deleteRoom(ownerId, room) {
  requireFirebase()
  if (room.ownerId !== ownerId) throw new Error('You cannot delete this room.')
  const images = await listRoomImages(ownerId, room.id)
  await Promise.all(images.map(deleteManagedImage))
  await deleteDoc(doc(db, 'rooms', room.id))
}
export async function duplicateRoom(ownerId, propertyId, room) {
  const copy = { ...room }
  delete copy.id
  delete copy.createdAt
  delete copy.updatedAt
  return saveRoom(ownerId, propertyId, { ...copy, roomName: `${room.roomName} Copy`, roomNumber: `${room.roomNumber}-COPY`, status: 'inactive' })
}
export async function uploadManagedImage({ ownerId, propertyId, roomId = '', category = 'Room', kind, file }) {
  requireFirebase()
  const id = crypto.randomUUID()
  const folder = roomId ? `property-images/${ownerId}/${propertyId}/rooms/${roomId}` : `property-images/${ownerId}/${propertyId}/${kind}`
  const storagePath = `${folder}/${id}-${file.name}`
  const storageRef = ref(storage, storagePath)
  await uploadBytes(storageRef, file, { contentType: file.type })
  const url = await getDownloadURL(storageRef)
  const collectionName = roomId ? 'roomImages' : 'propertyGallery'
  const image = { id, ownerId, propertyId, roomId, category, kind, storagePath, url, order: Date.now(), createdAt: serverTimestamp() }
  await setDoc(doc(db, collectionName, id), image)
  return { ...image, createdAt: new Date() }
}
export async function listPropertyImages(ownerId, propertyId) {
  if (!db || !propertyId) return []
  const snap = await getDocs(query(collection(db, 'propertyGallery'), where('ownerId', '==', ownerId), where('propertyId', '==', propertyId)))
  return snap.docs.map((item) => ({ id: item.id, ...item.data() })).sort((a, b) => (a.order || 0) - (b.order || 0))
}
export async function listRoomImages(ownerId, roomId) {
  if (!db || !roomId) return []
  const snap = await getDocs(query(collection(db, 'roomImages'), where('ownerId', '==', ownerId), where('roomId', '==', roomId)))
  return snap.docs.map((item) => ({ id: item.id, ...item.data() })).sort((a, b) => (a.order || 0) - (b.order || 0))
}
export async function deleteManagedImage(image) {
  requireFirebase()
  await deleteObject(ref(storage, image.storagePath)).catch((error) => { if (error.code !== 'storage/object-not-found') throw error })
  await deleteDoc(doc(db, image.roomId ? 'roomImages' : 'propertyGallery', image.id))
}
export async function reorderImages(images) {
  if (!db) return
  const batch = writeBatch(db)
  images.forEach((image, index) => batch.update(doc(db, image.roomId ? 'roomImages' : 'propertyGallery', image.id), { order: index }))
  await batch.commit()
}
export async function listAvailability(ownerId, propertyId) {
  if (!db || !propertyId) return []
  const snap = await getDocs(query(collection(db, 'availability'), where('ownerId', '==', ownerId), where('propertyId', '==', propertyId)))
  return snap.docs.map((item) => ({ id: item.id, ...item.data() }))
}
export async function addAvailability(ownerId, propertyId, entry) {
  requireFirebase()
  return addDoc(collection(db, 'availability'), { ...entry, ownerId, propertyId, createdAt: serverTimestamp(), updatedAt: serverTimestamp() })
}
export async function removeAvailability(ownerId, entry) {
  requireFirebase()
  if (entry.ownerId !== ownerId) throw new Error('You cannot change this availability entry.')
  return deleteDoc(doc(db, 'availability', entry.id))
}
export async function listOwnerBookings(ownerId, propertyId) {
  if (!db || !propertyId) return []
  const snap = await getDocs(query(collection(db, 'bookings'), where('ownerId', '==', ownerId), where('propertyId', '==', propertyId)))
  return snap.docs.map((item) => ({ id: item.id, ...item.data() }))
}
export async function updateBookingStatus(ownerId, booking, status) {
  requireFirebase()
  if (booking.ownerId !== ownerId) throw new Error('You cannot update this booking.')
  return updateDoc(doc(db, 'bookings', booking.id), { status, updatedAt: serverTimestamp(), timeline: [...(booking.timeline || []), { status, at: new Date().toISOString() }] })
}
export async function listOwnerReviews(ownerId, propertyId) {
  if (!db || !propertyId) return []
  const snap = await getDocs(query(collection(db, 'reviews'), where('ownerId', '==', ownerId), where('propertyId', '==', propertyId)))
  return snap.docs.map((item) => ({ id: item.id, ...item.data() }))
}
export async function updateReview(ownerId, review, values) {
  requireFirebase()
  if (review.ownerId !== ownerId) throw new Error('You cannot update this review.')
  return updateDoc(doc(db, 'reviews', review.id), { ...values, updatedAt: serverTimestamp() })
}
