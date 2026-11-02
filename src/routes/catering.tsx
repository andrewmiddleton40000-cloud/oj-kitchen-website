import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import {
  CalendarHeart,
  ExternalLink,
  PartyPopper,
  Users,
  UtensilsCrossed,
} from 'lucide-react'
import { SITE, img } from '@/config/site'
import {
  buildCateringMessage,
  whatsappUrl,
  type CateringDetails,
} from '@/lib/order'
import { Reveal } from '@/components/site/reveal'
import { PageHero, SectionHeading } from '@/components/site/sections'
import { WhatsAppIcon } from '@/components/site/icons'
import { Field, describedBy, fieldClass } from '@/components/site/field'

export const Route = createFileRoute('/catering')({
  head: () => ({
    meta: [
      { title: `Catering Services in Lagos | ${SITE.name}` },
      {
        name: 'description',
        content:
          'O.J KITCHEN caters birthdays, weddings, office events and family gatherings across Lagos with home-style Nigerian meals. Send your catering enquiry on WhatsApp.',
      },
    ],
  }),
  component: CateringPage,
})

const EVENT_TYPES = [
  'Birthday',
  'Wedding / Engagement',
  'Office / Corporate event',
  'Family gathering',
  'Church / Religious event',
  'Burial / Remembrance',
  'Other',
]

const OCCASIONS = [
  {
    icon: PartyPopper,
    title: 'Celebrations',
    text: 'Birthdays, anniversaries, naming ceremonies and more.',
  },
  {
    icon: Users,
    title: 'Corporate events',
    text: 'Office lunches, meetings, launches and staff parties.',
  },
  {
    icon: CalendarHeart,
    title: 'Weddings & family',
    text: 'Introductions, engagements and family get-togethers.',
  },
  {
    icon: UtensilsCrossed,
    title: 'Custom menus',
    text: 'Soups, rice dishes and sides planned around your guests.',
  },
]

const EMPTY: CateringDetails = {
  name: '',
  phone: '',
  eventType: '',
  eventDate: '',
  guests: '',
  meals: '',
  location: '',
  requests: '',
}

type Errors = Partial<Record<keyof CateringDetails, string>>

function validate(d: CateringDetails): Errors {
  const e: Errors = {}
  if (d.name.trim().length < 2) e.name = 'Please enter your name.'
  if (!d.eventType) e.eventType = 'Choose the type of event.'
  if (!d.eventDate) e.eventDate = 'Choose your event date.'
  else {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    if (new Date(`${d.eventDate}T00:00:00`) < today)
      e.eventDate = 'Choose a date that hasn’t passed.'
  }
  const g = Number(d.guests)
  if (!Number.isInteger(g) || g < 1)
    e.guests = 'Enter the approximate number of guests.'
  if (d.location.trim().length < 2) e.location = 'Enter the event location.'
  return e
}

function formatDate(iso: string) {
  const d = new Date(`${iso}T00:00:00`)
  return Number.isNaN(d.getTime())
    ? iso
    : d.toLocaleDateString('en-NG', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
}

function CateringPage() {
  const [form, setForm] = React.useState<CateringDetails>(EMPTY)
  const [errors, setErrors] = React.useState<Errors>({})
  const [sentUrl, setSentUrl] = React.useState<string | null>(null)
  const set =
    (k: keyof CateringDetails) =>
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
      document.getElementById(`cat-${first}`)?.focus()
      return
    }
    const url = whatsappUrl(
      buildCateringMessage({ ...form, eventDate: formatDate(form.eventDate) }),
    )
    setSentUrl(url)
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <>
      <PageHero
        eyebrow="Catering Services"
        title="Home-style food for your special occasions."
        intro="From intimate family gatherings to office events, O.J KITCHEN caters with the same generous, home-cooked flavour our customers love."
        image="/img/catering.jpg"
      />

      <section className="mx-auto max-w-content px-4 py-14 sm:px-6 sm:py-20">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {OCCASIONS.map((o, i) => (
            <Reveal
              as="li"
              key={o.title}
              delay={i * 80}
              className="border-t-2 border-gold pt-5"
            >
              <o.icon className="size-7 text-burgundy" strokeWidth={1.6} />
              <h2 className="mt-3 text-lg font-semibold">{o.title}</h2>
              <p className="mt-1.5 text-sm text-muted-foreground">{o.text}</p>
            </Reveal>
          ))}
        </ul>
      </section>

      <section id="enquiry" className="scroll-mt-28 bg-white">
        <div className="mx-auto grid max-w-content gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Catering enquiry"
              title="Tell us about your event"
              intro="Fill in the details and we’ll prepare a WhatsApp message for you. Our team will reply with availability, menu options and a quote."
            />
            <img
              src={img('/img/catering.jpg', 800, 600)}
              alt="A spread of Nigerian dishes prepared for an event"
              width={800}
              height={600}
              loading="lazy"
              className="mt-8 hidden aspect-[4/3] w-full rounded-2xl object-cover lg:block"
            />
          </div>

          <form
            noValidate
            onSubmit={submit}
            aria-label="Catering enquiry"
            className="grid gap-4 sm:grid-cols-2"
          >
            <Field id="cat-name" label="Your name" required error={errors.name}>
              <input
                {...describedBy('cat-name', errors.name)}
                aria-required
                autoComplete="name"
                value={form.name}
                onChange={set('name')}
                className={fieldClass}
              />
            </Field>
            <Field id="cat-phone" label="Phone number">
              <input
                id="cat-phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                value={form.phone}
                onChange={set('phone')}
                className={fieldClass}
              />
            </Field>
            <Field
              id="cat-eventType"
              label="Event type"
              required
              error={errors.eventType}
            >
              <select
                {...describedBy('cat-eventType', errors.eventType)}
                aria-required
                value={form.eventType}
                onChange={set('eventType')}
                className={fieldClass}
              >
                <option value="">Select an event type</option>
                {EVENT_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </Field>
            <Field
              id="cat-eventDate"
              label="Event date"
              required
              error={errors.eventDate}
            >
              <input
                {...describedBy('cat-eventDate', errors.eventDate)}
                aria-required
                type="date"
                value={form.eventDate}
                onChange={set('eventDate')}
                className={fieldClass}
              />
            </Field>
            <Field
              id="cat-guests"
              label="Number of guests"
              required
              error={errors.guests}
            >
              <input
                {...describedBy('cat-guests', errors.guests)}
                aria-required
                type="number"
                inputMode="numeric"
                min={1}
                value={form.guests}
                onChange={set('guests')}
                className={fieldClass}
              />
            </Field>
            <Field
              id="cat-location"
              label="Event location"
              required
              error={errors.location}
            >
              <input
                {...describedBy('cat-location', errors.location)}
                aria-required
                placeholder="e.g. Lekki Phase 1"
                value={form.location}
                onChange={set('location')}
                className={fieldClass}
              />
            </Field>
            <Field
              id="cat-meals"
              label="Preferred meals"
              hint="e.g. Jollof rice, Fried rice, Egusi soup"
              className="sm:col-span-2"
            >
              <textarea
                {...describedBy('cat-meals', undefined, true)}
                rows={2}
                value={form.meals}
                onChange={set('meals')}
                className={fieldClass}
              />
            </Field>
            <Field
              id="cat-requests"
              label="Additional requests"
              className="sm:col-span-2"
            >
              <textarea
                id="cat-requests"
                rows={3}
                placeholder="Dietary needs, serving style, budget…"
                value={form.requests}
                onChange={set('requests')}
                className={fieldClass}
              />
            </Field>

            <div className="space-y-3 sm:col-span-2">
              <button
                type="submit"
                className="flex h-12 w-full items-center justify-center gap-2.5 rounded-full bg-burgundy font-semibold text-white transition-colors hover:bg-burgundy-deep focus-visible:ring-[3px] focus-visible:ring-gold/60 focus-visible:outline-none motion-reduce:transition-none sm:w-auto sm:px-8"
              >
                <WhatsAppIcon className="size-5" />
                Send enquiry on WhatsApp
              </button>
              {sentUrl && (
                <p
                  role="status"
                  className="rounded-xl bg-gold-soft/70 p-4 text-sm leading-relaxed"
                >
                  <span className="font-semibold">
                    WhatsApp should now be open.
                  </span>{' '}
                  Tap send to share your enquiry — we’ll reply with availability
                  and a quote. If it didn’t open,{' '}
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
              )}
            </div>
          </form>
        </div>
      </section>
    </>
  )
}
