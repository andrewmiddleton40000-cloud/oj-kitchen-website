import { PRODUCTS_BY_ID, type Product } from '@/data/products'
import { SITE, formatNaira } from '@/config/site'

/** A line in the cart. Soups carry the chosen packaging size. */
export interface CartLine {
  productId: string
  size?: string
  quantity: number
}

export interface ResolvedLine extends CartLine {
  key: string
  product: Product
  /** Unit price in Naira, or null when it is still to be confirmed */
  unitPrice: number | null
  lineTotal: number | null
}

export const lineKey = (productId: string, size?: string) =>
  size ? `${productId}::${size}` : productId

/** Unit price for a product (and size, for soups). null = to be confirmed. */
export function unitPriceFor(product: Product, size?: string): number | null {
  if (product.sizes?.length) {
    return product.sizes.find((s) => s.label === size)?.price ?? null
  }
  return product.price
}

/** Joins cart lines with catalogue data, dropping anything no longer on the menu. */
export function resolveLines(lines: CartLine[]): ResolvedLine[] {
  return lines.flatMap((line) => {
    const product = PRODUCTS_BY_ID[line.productId]
    if (!product || line.quantity < 1) return []
    if (
      product.sizes?.length &&
      !product.sizes.some((s) => s.label === line.size)
    )
      return []
    const unitPrice = unitPriceFor(product, line.size)
    return [
      {
        ...line,
        key: lineKey(line.productId, line.size),
        product,
        unitPrice,
        lineTotal: unitPrice === null ? null : unitPrice * line.quantity,
      },
    ]
  })
}

export interface CartSummary {
  itemCount: number
  /** Sum of lines that have a known price */
  pricedSubtotal: number
  /** Number of lines whose price is still to be confirmed */
  unpricedLines: number
  hasKitchen: boolean
  hasFresh: boolean
}

export function summarise(lines: ResolvedLine[]): CartSummary {
  return lines.reduce<CartSummary>(
    (acc, l) => ({
      itemCount: acc.itemCount + l.quantity,
      pricedSubtotal: acc.pricedSubtotal + (l.lineTotal ?? 0),
      unpricedLines: acc.unpricedLines + (l.lineTotal === null ? 1 : 0),
      hasKitchen: acc.hasKitchen || l.product.brand === 'kitchen',
      hasFresh: acc.hasFresh || l.product.brand === 'fresh',
    }),
    {
      itemCount: 0,
      pricedSubtotal: 0,
      unpricedLines: 0,
      hasKitchen: false,
      hasFresh: false,
    },
  )
}

export interface CustomerDetails {
  name: string
  phone: string
  address: string
  location: string
  instructions?: string
}

/** Builds the pre-filled WhatsApp order message. */
export function buildOrderMessage(
  lines: ResolvedLine[],
  customer: CustomerDetails,
) {
  const summary = summarise(lines)
  const items = lines.map((l, i) => {
    const parts = [`${i + 1}. ${l.product.name}`]
    if (l.size) parts.push(l.size)
    parts.push(`Quantity: ${l.quantity}`)
    parts.push(
      l.unitPrice === null
        ? 'Price: to be confirmed'
        : `Price: ${formatNaira(l.unitPrice)} each (${formatNaira(l.lineTotal ?? 0)})`,
    )
    return parts.join(' – ')
  })

  let subtotal: string
  if (summary.unpricedLines === 0) {
    subtotal = `Estimated subtotal: ${formatNaira(summary.pricedSubtotal)} (excluding delivery)`
  } else if (summary.pricedSubtotal > 0) {
    subtotal = `Estimated subtotal for priced items: ${formatNaira(summary.pricedSubtotal)} — ${summary.unpricedLines} item(s) still to be priced`
  } else {
    subtotal = 'Estimated subtotal: to be confirmed'
  }

  return [
    `Hello ${SITE.name}!`,
    '',
    'I would like to place an order.',
    '',
    `Name: ${customer.name.trim()}`,
    `Phone: ${customer.phone.trim()}`,
    `Delivery Address: ${customer.address.trim()}`,
    `Delivery Location: ${customer.location.trim()}`,
    '',
    'Order Details:',
    ...items,
    '',
    subtotal,
    ...(customer.instructions?.trim()
      ? ['', `Additional Instructions: ${customer.instructions.trim()}`]
      : []),
    '',
    'Please confirm availability, final pricing and delivery charges.',
    '',
    'Thank you.',
  ].join('\n')
}

export interface CateringDetails {
  name: string
  phone?: string
  eventType: string
  eventDate: string
  guests: string
  meals: string
  location: string
  requests?: string
}

export function buildCateringMessage(d: CateringDetails) {
  return [
    `Hello ${SITE.name}!`,
    '',
    'I would like to enquire about catering for an event.',
    '',
    `Name: ${d.name.trim()}`,
    ...(d.phone?.trim() ? [`Phone: ${d.phone.trim()}`] : []),
    `Event Type: ${d.eventType.trim()}`,
    `Event Date: ${d.eventDate.trim()}`,
    `Number of Guests: ${d.guests.trim()}`,
    `Preferred Meals: ${d.meals.trim() || 'Open to suggestions'}`,
    `Event Location: ${d.location.trim()}`,
    ...(d.requests?.trim()
      ? [`Additional Requests: ${d.requests.trim()}`]
      : []),
    '',
    'Please share availability, menu options and a quote.',
    '',
    'Thank you.',
  ].join('\n')
}

/** Official WhatsApp click-to-chat URL with an encoded message. */
export function whatsappUrl(message?: string) {
  const base = `https://wa.me/${SITE.whatsappNumber}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}

export const GENERAL_ENQUIRY = `Hello ${SITE.name}! I'd like to place an order. Could you share today's menu and prices?`
