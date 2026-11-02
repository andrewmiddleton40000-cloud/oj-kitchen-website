/**
 * Business details for O.J KITCHEN.
 * Edit these values to update contact details site-wide.
 */
export const SITE = {
  name: 'O.J KITCHEN',
  subBrand: 'OJ Fresh Cuts',
  tagline: 'Good Food. Healthy Living. Made Convenient.',
  description:
    'O.J KITCHEN serves fresh, nutritious, home-style Nigerian meals and OJ Fresh Cuts prepares washed, peeled and neatly cut vegetables — delivered across Lagos State. Order easily via WhatsApp.',
  mission:
    'To make healthy living and cooking easier through quality, convenience and good food.',
  phoneDisplay: '0901 965 9779',
  phoneLocal: '09019659779',
  phoneInternational: '+2349019659779',
  /** Digits only, international format, used for wa.me links */
  whatsappNumber: '2349019659779',
  instagram:
    'https://www.instagram.com/o.j_kitchen?rpxt=MTMxM2MyZzRjYXVvNw%3D%3D&utm_source=qr',
  instagramHandle: '@o.j_kitchen',
  tiktok: 'https://www.tiktok.com/@o.j_kitchen?_r=1&_t=ZS-9B52LCefsDI',
  tiktokHandle: '@o.j_kitchen',
  serviceArea: 'Lagos State',
} as const

/**
 * Delivery settings.
 * Set `freeDeliveryVgcConfirmed` to true ONLY once the business confirms
 * free delivery within VGC is still on offer.
 */
export const DELIVERY = {
  freeDeliveryVgcConfirmed: false,
  /** Areas offered in the checkout dropdown. Customers can also choose "Other". */
  areas: [
    'Ajah',
    'Apapa',
    'Victoria Garden City (VGC)',
    'Chevron / Lekki',
    'Lekki Phase 1',
    'Ikoyi',
    'Victoria Island',
    'Sangotedo',
    'Ikeja',
    'Gbagada',
    'Magodo',
    'Maryland',
    'Ogudu / Ojota',
    'Surulere',
    'Yaba',
    'Festac',
    'Ikorodu',
    'Other (Lagos State)',
  ],
} as const

/** Currency formatter used wherever a price is shown. */
export function formatNaira(amount: number) {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0,
  }).format(amount)
}

/** Builds an optimised Netlify Image CDN URL for an image in /public. */
export function img(path: string, width: number, height?: number) {
  const params = new URLSearchParams({
    url: path,
    w: String(width),
    fm: 'webp',
    q: '78',
  })
  if (height) {
    params.set('h', String(height))
    params.set('fit', 'cover')
  }
  return `/.netlify/images?${params.toString()}`
}
