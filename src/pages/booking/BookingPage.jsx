import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { BookingForm } from '../../components/booking/BookingForm'
import { PageContainer } from '../../components/common/PageContainer'
import { useSeo } from '../../hooks/useSeo'
import { getApprovedProperty } from '../../services/publicPropertyService'

export default function BookingPage() {
  const [params] = useSearchParams()
  const propertyId = params.get('propertyId')
  const roomId = params.get('roomId')
  const [property, setProperty] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useSeo({ title: 'Book your stay', description: 'Select dates and confirm your DONROOM booking.', path: '/booking' })

  useEffect(() => {
    let active = true
    if (!propertyId) {
      setError('A property must be selected before booking.')
      setLoading(false)
      return () => { active = false }
    }
    getApprovedProperty(propertyId)
      .then((item) => {
        if (!active) return
        if (!item) setError('This property is not available for public booking.')
        setProperty(item)
      })
      .catch((err) => { if (active) setError(err.message || 'Booking details could not be loaded.') })
      .finally(() => { if (active) setLoading(false) })
    return () => { active = false }
  }, [propertyId])

  const room = useMemo(() => {
    if (!property) return null
    return property.rooms.find((item) => item.id === roomId) || null
  }, [property, roomId])

  if (loading) return <PageContainer className="py-20"><p className="rounded-3xl bg-cream p-10 text-center text-muted">Loading booking details…</p></PageContainer>
  if (error || !property) return <PageContainer className="py-20"><div className="rounded-3xl border border-red-200 bg-red-50 p-10 text-center"><h1 className="text-2xl font-black">Booking unavailable</h1><p className="mt-3 text-red-700">{error || 'Property not found.'}</p><Link className="mt-6 inline-flex rounded-full bg-dark-surface px-5 py-3 font-bold text-white" to="/properties">Browse approved properties</Link></div></PageContainer>
  if (!room) return <PageContainer className="py-20"><div className="rounded-3xl bg-cream p-10 text-center"><h1 className="text-2xl font-black">Room unavailable</h1><p className="mt-3 text-muted">Choose one of the rooms currently marked available by the property owner.</p><Link className="mt-6 inline-flex rounded-full bg-primary-action px-5 py-3 font-bold" to={`/property/${property.id}`}>View available rooms</Link></div></PageContainer>

  const bookingRoom = {
    ...room,
    roomName: room.name || room.roomName,
    pricePerNight: room.price,
    weekendPrice: Number(room.weekendPrice || Math.round(room.price * 1.15)),
    discount: Number(room.discount || 0),
    capacity: Number(room.capacity || 2),
  }

  return <PageContainer className="py-10"><div className="mb-8"><Link className="text-sm font-bold text-[#3F7D58]" to={`/property/${property.id}`}>← Back to property</Link><h1 className="mt-3 text-4xl font-black">Book {property.name}</h1><p className="mt-2 text-black/55">{bookingRoom.roomName} · {property.location}</p></div><div className="grid gap-8 lg:grid-cols-[1fr_390px]"><div className="overflow-hidden rounded-[2rem] bg-white shadow-lg shadow-black/5"><img className="h-72 w-full object-cover" src={bookingRoom.images?.[0] || property.image} alt={`${property.name} ${bookingRoom.roomName}`}/><div className="p-6"><h2 className="text-2xl font-black">Booking details</h2><p className="mt-3 leading-7 text-black/60">Availability is checked again inside a secure Firestore transaction when you confirm. Check-out dates are exclusive, so another guest may arrive on your departure date.</p></div></div><div className="rounded-[2rem] bg-white p-6 shadow-xl shadow-black/8"><BookingForm property={property} room={bookingRoom}/></div></div></PageContainer>
}
