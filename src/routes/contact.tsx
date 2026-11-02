import { createFileRoute } from '@tanstack/react-router'
import { MapPin, Phone } from 'lucide-react'
import { SITE } from '@/config/site'
import { whatsappUrl, GENERAL_ENQUIRY } from '@/lib/order'
import {
  DeliveryInfo,
  SectionHeading,
  WhatsAppButton,
} from '@/components/site/sections'
import {
  InstagramIcon,
  TikTokIcon,
  WhatsAppIcon,
} from '@/components/site/icons'

export const Route = createFileRoute('/contact')({
  head: () => ({
    meta: [
      { title: `Contact Us | ${SITE.name}` },
      {
        name: 'description',
        content: `Call or WhatsApp ${SITE.name} on ${SITE.phoneDisplay}, or follow ${SITE.instagramHandle} on Instagram and TikTok.`,
      },
    ],
  }),
  component: ContactPage,
})

const CHANNELS = [
  {
    icon: WhatsAppIcon,
    label: 'WhatsApp',
    value: SITE.phoneDisplay,
    note: 'Fastest way to order or ask a question',
    href: whatsappUrl(GENERAL_ENQUIRY),
    external: true,
  },
  {
    icon: Phone,
    label: 'Phone',
    value: SITE.phoneDisplay,
    note: 'Call us directly',
    href: `tel:${SITE.phoneInternational}`,
    external: false,
  },
  {
    icon: InstagramIcon,
    label: 'Instagram',
    value: SITE.instagramHandle,
    note: 'Menus, offers and behind the scenes',
    href: SITE.instagram,
    external: true,
  },
  {
    icon: TikTokIcon,
    label: 'TikTok',
    value: SITE.tiktokHandle,
    note: 'Watch us cook',
    href: SITE.tiktok,
    external: true,
  },
]

function ContactPage() {
  return (
    <div className="mx-auto max-w-content px-4 py-14 sm:px-6 sm:py-20">
      <SectionHeading
        as="h1"
        eyebrow="Contact us"
        title="We’d love to hear from you"
        intro="Orders, questions, catering enquiries — reach O.J KITCHEN and OJ Fresh Cuts on any of the channels below."
      />

      <ul className="mt-12 grid gap-4 sm:grid-cols-2">
        {CHANNELS.map((c) => (
          <li key={c.label}>
            <a
              href={c.href}
              {...(c.external
                ? { target: '_blank', rel: 'noopener noreferrer' }
                : {})}
              className="group flex h-full items-start gap-4 rounded-2xl bg-white p-6 ring-1 ring-border transition-shadow hover:shadow-lg hover:ring-burgundy/30 focus-visible:ring-[3px] focus-visible:ring-gold/60 focus-visible:outline-none motion-reduce:transition-none"
            >
              <span className="grid size-12 shrink-0 place-items-center rounded-full bg-gold-soft text-burgundy">
                <c.icon className="size-5" />
              </span>
              <span>
                <span className="eyebrow block text-burgundy">{c.label}</span>
                <span className="mt-1 block font-display text-xl font-semibold group-hover:underline">
                  {c.value}
                </span>
                <span className="mt-1 block text-sm text-muted-foreground">
                  {c.note}
                </span>
              </span>
            </a>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex items-start gap-4 rounded-2xl bg-burgundy p-6 text-white">
        <MapPin className="mt-1 size-5 shrink-0 text-gold" />
        <div>
          <p className="font-semibold">Serving {SITE.serviceArea}</p>
          <p className="mt-1 text-sm text-white/80">
            We deliver to homes and offices across Lagos. Send us your location
            on WhatsApp and we’ll confirm delivery charges.
          </p>
          <WhatsAppButton className="mt-5">Chat on WhatsApp</WhatsAppButton>
        </div>
      </div>

      <section aria-labelledby="how-heading" className="mt-16">
        <h2 id="how-heading" className="text-2xl font-semibold sm:text-3xl">
          How ordering works
        </h2>
        <DeliveryInfo className="mt-6" />
      </section>
    </div>
  )
}
