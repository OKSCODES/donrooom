export const DEFAULT_FEATURE_FLAGS = Object.freeze({
  reviews: true,
  bookings: true,
  registration: true,
  propertyCreation: true,
  notifications: true,
  announcements: true,
  offers: true,
})

export const DEFAULT_APP_SETTINGS = Object.freeze({
  applicationName: 'DONROOM',
  supportEmail: 'support@donroom.in',
  supportPhone: '+91 00000 00000',
  timezone: 'Asia/Kolkata',
  currency: 'INR',
  language: 'en',
  maxUploadSizeMb: 5,
  maxBookingNights: 30,
  maintenanceMode: false,
  maintenanceMessage: 'DONROOM is undergoing scheduled maintenance. Please check back shortly.',
})

export const SUPPORTED_LANGUAGES = Object.freeze([
  { code: 'en', label: 'English' },
  { code: 'kha', label: 'Khasi' },
  { code: 'hi', label: 'Hindi' },
])
