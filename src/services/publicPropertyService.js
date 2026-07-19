import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore'
import { db } from '../firebase'

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80'

const asArray = (value) => Array.isArray(value) ? value.filter(Boolean) : []
const asNumber = (value, fallback = 0) => Number.isFinite(Number(value)) ? Number(value) : fallback
const unique = (values) => [...new Set(values.filter(Boolean))]
const snapshotRows = (snapshot) => snapshot.docs.map((item) => ({ id: item.id, ...item.data() }))

function toRules(value) {
  if (Array.isArray(value)) return value.filter(Boolean)
  if (typeof value !== 'string' || !value.trim()) {
    return ['Valid government ID may be requested at check-in.', 'Please respect quiet hours and property guidelines.']
  }
  return value.split(/\n|,/).map((item) => item.trim()).filter(Boolean)
}

function normalizeReview(review) {
  return {
    ...review,
    id: review.id,
    name: review.guestName || review.userName || review.customerName || review.name || 'DONROOM guest',
    city: review.city || review.location || 'Verified guest',
    text: review.comment || review.review || review.message || review.text || '',
    rating: asNumber(review.rating),
  }
}

function reviewSummary(reviews, property) {
  const visible = reviews
    .filter((review) => !['hidden', 'rejected'].includes(String(review.status || '').toLowerCase()))
    .map(normalizeReview)
  if (!visible.length) {
    return {
      rating: asNumber(property.rating, 0),
      reviews: asNumber(property.reviewCount ?? property.reviews, 0),
      reviewItems: [],
    }
  }
  const ratings = visible.map((review) => review.rating).filter((rating) => rating > 0)
  return {
    rating: ratings.length ? Number((ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length).toFixed(1)) : asNumber(property.rating, 0),
    reviews: visible.length,
    reviewItems: visible,
  }
}

function normalizeProperty(propertyDoc, rooms = [], gallery = [], roomImages = [], reviews = []) {
  const availableRooms = rooms.filter((room) => String(room.status || '').toLowerCase() === 'available')
  const publicRooms = availableRooms.map((room) => {
    const images = roomImages
      .filter((image) => image.roomId === room.id)
      .sort((a, b) => asNumber(a.order) - asNumber(b.order))
    return {
      ...room,
      id: room.id,
      name: room.roomName || room.name || 'Room',
      type: room.roomType || room.type || 'Room',
      price: asNumber(room.pricePerNight ?? room.price),
      capacity: asNumber(room.capacity, 2),
      adults: asNumber(room.adults, 2),
      children: asNumber(room.children),
      beds: asNumber(room.beds, 1),
      bathrooms: asNumber(room.bathrooms, 1),
      amenities: asArray(room.amenities),
      images: images.map((image) => image.url || image.imageUrl || image.downloadURL).filter(Boolean),
    }
  })

  const sortedGallery = [...gallery].sort((a, b) => asNumber(a.order) - asNumber(b.order))
  const propertyImages = sortedGallery.map((image) => image.url || image.imageUrl || image.downloadURL).filter(Boolean)
  const roomGallery = publicRooms.flatMap((room) => room.images)
  const allImages = unique([
    propertyDoc.coverUrl,
    propertyDoc.bannerUrl,
    propertyDoc.imageUrl,
    ...propertyImages,
    ...roomGallery,
    propertyDoc.logoUrl,
  ])
  const prices = publicRooms.map((room) => room.price).filter((price) => price > 0)
  const primaryRoom = publicRooms[0]
  const summary = reviewSummary(reviews, propertyDoc)
  const latitude = asNumber(propertyDoc.latitude)
  const longitude = asNumber(propertyDoc.longitude)

  return {
    ...propertyDoc,
    id: propertyDoc.id,
    name: propertyDoc.propertyName || propertyDoc.name || 'DONROOM Property',
    type: propertyDoc.propertyType || propertyDoc.type || 'Homestay',
    location: [propertyDoc.village, propertyDoc.address].filter(Boolean).join(', ') || 'Sohra, Meghalaya',
    village: propertyDoc.village || 'Sohra',
    description: propertyDoc.description || 'A verified local accommodation available through DONROOM.',
    amenities: asArray(propertyDoc.amenities),
    price: prices.length ? Math.min(...prices) : asNumber(propertyDoc.pricePerNight ?? propertyDoc.price),
    availableRooms: publicRooms.length,
    roomType: primaryRoom?.type || 'Room',
    image: allImages[0] || FALLBACK_IMAGE,
    gallery: allImages.length ? allImages : [FALLBACK_IMAGE],
    rooms: publicRooms,
    rating: summary.rating,
    reviews: summary.reviews,
    reviewItems: summary.reviewItems,
    rules: toRules(propertyDoc.houseRules || propertyDoc.rules),
    featured: propertyDoc.featured === true,
    phone: propertyDoc.phone || '',
    whatsapp: propertyDoc.whatsapp || propertyDoc.phone || '',
    email: propertyDoc.email || '',
    latitude,
    longitude,
    coordinates: latitude && longitude ? { latitude, longitude } : null,
  }
}

async function relatedDocuments(propertyId) {
  const [roomSnap, gallerySnap, roomImageSnap, reviewSnap] = await Promise.all([
    getDocs(query(collection(db, 'rooms'), where('propertyId', '==', propertyId))),
    getDocs(query(collection(db, 'propertyGallery'), where('propertyId', '==', propertyId))),
    getDocs(query(collection(db, 'roomImages'), where('propertyId', '==', propertyId))),
    getDocs(query(collection(db, 'reviews'), where('propertyId', '==', propertyId))),
  ])
  return [snapshotRows(roomSnap), snapshotRows(gallerySnap), snapshotRows(roomImageSnap), snapshotRows(reviewSnap)]
}

export async function listApprovedProperties() {
  if (!db) return []
  const propertySnap = await getDocs(query(collection(db, 'properties'), where('status', '==', 'approved')))
  const properties = snapshotRows(propertySnap)
  return Promise.all(properties.map(async (property) => {
    const related = await relatedDocuments(property.id)
    return normalizeProperty(property, ...related)
  }))
}

export async function getApprovedProperty(propertyId) {
  if (!db || !propertyId) return null
  const propertySnap = await getDoc(doc(db, 'properties', propertyId))
  if (!propertySnap.exists()) return null
  const property = { id: propertySnap.id, ...propertySnap.data() }
  if (String(property.status || '').toLowerCase() !== 'approved') return null
  const related = await relatedDocuments(property.id)
  return normalizeProperty(property, ...related)
}

export function buildPublicDestinations(properties) {
  const villages = new Map()
  for (const property of properties) {
    const village = property.village || 'Sohra'
    if (!villages.has(village)) {
      villages.set(village, {
        name: village,
        description: `Explore approved DONROOM stays in and around ${village}.`,
        image: property.image || FALLBACK_IMAGE,
        count: 0,
      })
    }
    villages.get(village).count += 1
  }
  return [...villages.values()].sort((a, b) => b.count - a.count).slice(0, 6)
}

export function buildPublicReviews(properties) {
  return properties
    .flatMap((property) => property.reviewItems || [])
    .filter((review) => review.text)
    .sort((a, b) => asNumber(b.createdAt?.seconds) - asNumber(a.createdAt?.seconds))
    .slice(0, 6)
}

export function buildPublicGallery(properties) {
  return properties.flatMap((property) => property.gallery.map((image, index) => ({
    id: `${property.id}-${index}`,
    category: property.type || 'Property',
    image,
    propertyId: property.id,
    propertyName: property.name,
  })))
}
