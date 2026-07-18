const encode = (message) => encodeURIComponent(message)
export const whatsappTemplates = Object.freeze({
  bookingConfirmation: (data) => encode(`DONROOM booking ${data.bookingNumber}\n${data.propertyName}\n${data.checkIn} to ${data.checkOut}\nTotal: ₹${data.grandTotal}\n${data.bookingUrl}`),
  reminder: (data) => encode(`Reminder: Your DONROOM stay at ${data.propertyName} begins on ${data.checkIn}. ${data.bookingUrl}`),
  cancellation: (data) => encode(`DONROOM booking ${data.bookingNumber} has been cancelled. ${data.bookingUrl}`),
  ownerNotification: (data) => encode(`New DONROOM booking request ${data.bookingNumber} from ${data.guestName} for ${data.roomName}, ${data.checkIn} to ${data.checkOut}. ${data.bookingUrl}`),
  checkInReminder: (data) => encode(`Check-in reminder for ${data.propertyName}: ${data.checkInTime}. Property contact: ${data.ownerPhone}`),
})
