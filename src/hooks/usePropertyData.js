import { useCallback } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useAuth } from './useAuth'
import { getOwnerProperty, listAvailability, listOwnerBookings, listOwnerReviews, listOwnerRooms, listPropertyImages } from '../services/propertyService'
export function usePropertyData() {
  const { user } = useAuth(); const queryClient = useQueryClient()
  const propertyQuery = useQuery({ queryKey: ['owner-property', user?.uid], queryFn: () => getOwnerProperty(user.uid), enabled: Boolean(user?.uid) })
  const propertyId = propertyQuery.data?.id
  const roomsQuery = useQuery({ queryKey: ['owner-rooms', user?.uid, propertyId], queryFn: () => listOwnerRooms(user.uid, propertyId), enabled: Boolean(user?.uid && propertyId) })
  const galleryQuery = useQuery({ queryKey: ['owner-gallery', user?.uid, propertyId], queryFn: () => listPropertyImages(user.uid, propertyId), enabled: Boolean(user?.uid && propertyId) })
  const availabilityQuery = useQuery({ queryKey: ['owner-availability', user?.uid, propertyId], queryFn: () => listAvailability(user.uid, propertyId), enabled: Boolean(user?.uid && propertyId) })
  const bookingsQuery = useQuery({ queryKey: ['owner-bookings', user?.uid, propertyId], queryFn: () => listOwnerBookings(user.uid, propertyId), enabled: Boolean(user?.uid && propertyId) })
  const reviewsQuery = useQuery({ queryKey: ['owner-reviews', user?.uid, propertyId], queryFn: () => listOwnerReviews(user.uid, propertyId), enabled: Boolean(user?.uid && propertyId) })
  const refresh = useCallback(() => queryClient.invalidateQueries({ predicate: (item) => String(item.queryKey[0]).startsWith('owner-') }), [queryClient])
  return { user, property: propertyQuery.data, propertyId, rooms: roomsQuery.data || [], images: galleryQuery.data || [], availability: availabilityQuery.data || [], bookings: bookingsQuery.data || [], reviews: reviewsQuery.data || [], isLoading: propertyQuery.isLoading, refresh, queryClient }
}
