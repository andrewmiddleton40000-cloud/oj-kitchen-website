import * as React from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeft, ExternalLink, ShoppingBag } from 'lucide-react'
import { DELIVERY, SITE } from '@/config/site'
import { useCart } from '@/lib/cart'
import {
  buildOrderMessage,
  whatsappUrl,
  type CustomerDetails,
} from '@/lib/order'
import { CartLineItem } from '@/components/site/cart-line'
import { CartTotals } from '@/components/site/cart-summary'
import { DeliveryInfo } from '@/components/site/sections'
import { WhatsAppIcon } from '@/components/site/icons'
import { Field, describedBy, fieldClass } from '@/components/site/field'
import { Skeleton } from '@/components/ui/skeleton'

export const Route = createFileRoute('/cart')({
  head: () => ({
    meta: [
      { title: `Your Cart | ${SITE.name}` },
      {
        name: 'description',
        content: 'Review your O.J KITCHEN order and send it via WhatsApp.',
      },
      { name: 'robots', content: 'noindex' },
    ],
  }),
  component: CartPage,
})

type Errors = Partial<Record<keyof CustomerDetails, string>>

const EMPTY: CustomerDetails = {
  name: '',
  phone: '',
  address: '',
  location: '',
  instructions: '',
}

function validate(d: CustomerDetails): Errors {
  const e: Errors = {}
  if (d.name.trim().length < 2) e.name = 'Please enter your name.'
  const digits = d.phone.replace(/\D/g, '')
  if (digits.length < 10 || digits.length > 14)
    e.phone = 'Enter a valid phone number, e.g. 0803 123 4567.'
  if (d.address.trim().length < 5)
    e.address = 'Please enter your delivery address.'
  if (!d.location) e.location = 'Choose your delivery area.'
  return e
}

function CartPage() {
  const { ready, resolved, summary, clear } = useCart()
  const [form, setForm] = React.useState<CustomerDetails>(EMPTY)
  const [errors, setErrors] = React.useState<Errors>({})
  const [sentUrl, setSentUrl] = React.useState<string | null>(null)

  const set =
    (k: keyof CustomerDetails) =>
    (
      ev: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => {
      setForm((f) => ({ ...f, [k]: ev.target.value }))
      if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }))
    }

  function submit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault()
    const e = validate(form)
    setErrors(e)
    const first = Object.keys(e)[0]
    if (first) {
      document.getElementById(`cart-${first}`)?.focus()
      return
    }
    const url = whatsappUrl(buildOrderMessage(resolved, form))
    setSentUrl(url)
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="mx-auto max-w-content px-4 py-12 sm:px-6 sm:py-16">
      <Link
        to="/menu"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-burgundy hover:underline"
      >
        <ArrowLeft className="size-4" /> Continue shopping
      </Link>
      <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">Your cart</h1>
      <p className="mt-3 max-w-reading text-muted-foreground">
        Review your items, add your delivery details and we’ll write your
        WhatsApp order for you.
      </p>

      {!ready ? (
        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_26rem]">
          <div className="space-y-4">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex gap-4">
                <Skeleton className="size-20 rounded-xl" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-5 w-1/2" />
                  <Skeleton className="h-4 w-1/3" />
                </div>
              </div>
            ))}
          </div>
          <Skeleton className="h-80 rounded-2xl" />
        </div>
      ) : resolved.length === 0 ? (
        <div className="mt-10 flex flex-col items-center rounded-2xl bg-white px-6 py-16 text-center ring-1 ring-border">
          <div className="grid size-16 place-items-center rounded-full bg-gold-soft">
            <ShoppingBag className="size-7 text-burgundy" />
          </div>
          <h2 className="mt-5 text-2xl font-semibold">Your cart is empty</h2>
          <p className="mt-2 max-w-sm text-muted-foreground">
            Browse our home-style meals and fresh-cut vegetables to start your
            order.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              to="/menu"
              className="rounded-full bg-burgundy px-6 py-3 font-semibold text-white hover:bg-burgundy-deep"
            >
              Our Meals
            </Link>
            <Link
              to="/fresh-cuts"
              className="rounded-full bg-forest px-6 py-3 font-semibold text-white hover:bg-forest-deep"
            >
              OJ Fresh Cuts
            </Link>
          </div>
        </div>
      ) : (
        <div className="mt-10 grid items-start gap-8 lg:grid-cols-[1fr_26rem]">
          <section
            aria-labelledby="items-heading"
            className="rounded-2xl bg-white px-5 ring-1 ring-border sm:px-6"
          >
            <div className="flex items-center justify-between border-b border-border py-4">
              <h2 id="items-heading" className="text-xl font-semibold">
                Items ({summary.itemCount})
              </h2>
              <button
                type="button"
                onClick={() => {
                  if (window.confirm('Remove all items from your cart?'))
                    clear()
                }}
                className="text-sm font-medium text-muted-foreground underline-offset-4 hover:text-destructive hover:underline"
              >
                Clear cart
              </button>
            </div>
            <ul className="divide-y divide-border">
              {resolved.map((l) => (
                <CartLineItem key={l.key} line={l} />
              ))}
            </ul>
          </section>

          <aside className="space-y-6 lg:sticky lg:top-32">
            <div className="rounded-2xl bg-white p-5 ring-1 ring-border sm:p-6">
              <h2 className="mb-4 text-xl font-semibold">Order summary</h2>
              <CartTotals summary={summary} />
            </div>

            <form
              noValidate
              onSubmit={submit}
              aria-labelledby="details-heading"
              className="space-y-4 rounded-2xl bg-white p-5 ring-1 ring-border sm:p-6"
            >
              <h2 id="details-heading" className="text-xl font-semibold">
                Delivery details
              </h2>
              <Field
                id="cart-name"
                label="Full name"
                required
                error={errors.name}
              >
                <input
                  {...describedBy('cart-name', errors.name)}
                  aria-required
                  autoComplete="name"
                  value={form.name}
                  onChange={set('name')}
                  className={fieldClass}
                />
              </Field>
              <Field
                id="cart-phone"
                label="Phone number"
                required
                error={errors.phone}
              >
                <input
                  {...describedBy('cart-phone', errors.phone)}
                  aria-required
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="0803 123 4567"
                  value={form.phone}
                  onChange={set('phone')}
                  className={fieldClass}
                />
              </Field>
              <Field
                id="cart-address"
                label="Delivery address"
                required
                error={errors.address}
              >
                <textarea
                  {...describedBy('cart-address', errors.address)}
                  aria-required
                  rows={2}
                  autoComplete="street-address"
                  value={form.address}
                  onChange={set('address')}
                  className={fieldClass}
                />
              </Field>
              <Field
                id="cart-location"
                label="Delivery area"
                required
                error={errors.location}
              >
                <select
                  {...describedBy('cart-location', errors.location)}
                  aria-required
                  value={form.location}
                  onChange={set('location')}
                  className={fieldClass}
                >
                  <option value="">Select your area</option>
                  {DELIVERY.areas.map((a) => (
                    <option key={a} value={a}>
                      {a}
                    </option>
                  ))}
                </select>
              </Field>
              <Field id="cart-instructions" label="Additional instructions">
                <textarea
                  id="cart-instructions"
                  rows={3}
                  placeholder="Delivery time, landmarks, spice level…"
                  value={form.instructions}
                  onChange={set('instructions')}
                  className={fieldClass}
                />
              </Field>

              <button
                type="submit"
                className="flex h-12 w-full items-center justify-center gap-2.5 rounded-full bg-[#1f9d55] font-semibold text-white transition-colors hover:bg-[#188046] focus-visible:ring-[3px] focus-visible:ring-gold/60 focus-visible:outline-none motion-reduce:transition-none"
              >
                <WhatsAppIcon className="size-5" />
                Send order on WhatsApp
              </button>
              <p className="text-xs leading-relaxed text-muted-foreground">
                This opens WhatsApp with your order written out. Your order is
                only placed once you tap send and O.J KITCHEN replies to confirm
                availability, final pricing, delivery charges and payment.
              </p>

              {sentUrl && (
                <div
                  role="status"
                  className="rounded-xl bg-gold-soft/70 p-4 text-sm leading-relaxed"
                >
                  <p className="font-semibold">WhatsApp should now be open.</p>
                  <p className="mt-1 text-foreground/80">
                    Remember to tap send — O.J KITCHEN will reply to confirm
                    your order. If WhatsApp didn’t open,{' '}
                    <a
                      href={sentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-semibold text-burgundy underline"
                    >
                      tap here <ExternalLink className="size-3.5" />
                    </a>
                    .
                  </p>
                </div>
              )}
            </form>
          </aside>
        </div>
      )}

      <DeliveryInfo className="mt-14" />
    </div>
  )
}
