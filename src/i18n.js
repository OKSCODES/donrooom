export const translations = Object.freeze({
  en: { appName: 'DONROOM', search: 'Search', bookings: 'Bookings', profile: 'Profile', support: 'Support' },
  kha: { appName: 'DONROOM', search: 'Wad', bookings: 'Ki booking', profile: 'Ka profile', support: 'Ka jingïarap' },
  hi: { appName: 'DONROOM', search: 'खोजें', bookings: 'बुकिंग', profile: 'प्रोफ़ाइल', support: 'सहायता' },
})
export function translate(locale, key){return translations[locale]?.[key] ?? translations.en[key] ?? key}
