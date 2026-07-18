export const BOOKING_STATUSES = Object.freeze({ PENDING:'pending', CONFIRMED:'confirmed', REJECTED:'rejected', CANCELLED:'cancelled', CHECKED_IN:'checked_in', CHECKED_OUT:'checked_out', COMPLETED:'completed' })
export const PAYMENT_STATUSES = Object.freeze({ PENDING:'pending', PAID:'paid', REFUNDED:'refunded', FAILED:'failed' })
export const ACTIVE_BOOKING_STATUSES = ['pending','confirmed','checked_in']
export const TAX_RATE = 0.05
export const SERVICE_FEE_RATE = 0.06
export const MAX_BOOKING_NIGHTS = 30
export const BOOKING_STATUS_LABELS = { pending:'Pending', confirmed:'Confirmed', rejected:'Rejected', cancelled:'Cancelled', checked_in:'Checked in', checked_out:'Checked out', completed:'Completed' }
