import * as React from 'react'
import { cn } from '@/lib/utils'
import { SITE, DELIVERY, img } from '@/config/site'
import { Reveal } from './reveal'
import { WhatsAppIcon } from './icons'
import { whatsappUrl, GENERAL_ENQUIRY } from '@/lib/order'

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = 'left',
  tone = 'kitchen',
  className,
  as: Tag = 'h2',
}: {
  eyebrow?: string
  title: React.ReactNode
  intro?: React.ReactNode
  align?: 'left' | 'center'
  tone?: 'kitchen' | 'fresh' | 'light'
  className?: string
  as?: 'h1' | 'h2'
}) {
  return (
    <Reveal
      className={cn(
        align === 'center' && 'mx-auto text-center',
        'max-w-2xl',
        className,
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            'eyebrow mb-3',
            tone === 'kitchen' && 'text-burgundy',
            tone === 'fresh' && 'text-forest',
            tone === 'light' && 'text-gold',
          )}
        >
          {eyebrow}
        </p>
      )}
      <Tag
        className={cn(
          'text-3xl leading-[1.1] font-semibold text-balance sm:text-4xl lg:text-[2.75rem]',
          tone === 'light' ? 'text-white' : 'text-foreground',
        )}
      >
        {title}
      </Tag>
      {intro && (
        <p
          className={cn(
            'mt-4 text-base leading-relaxed text-pretty sm:text-lg',
            tone === 'light' ? 'text-white/80' : 'text-muted-foreground',
          )}
        >
          {intro}
        </p>
      )}
    </Reveal>
  )
}

/** Interior page banner with a photograph. */
export function PageHero({
  eyebrow,
  title,
  intro,
  image,
  tone = 'kitchen',
  children,
}: {
  eyebrow: string
  title: React.ReactNode
  intro: React.ReactNode
  image: string
  tone?: 'kitchen' | 'fresh'
  children?: React.ReactNode
}) {
  return (
    <section
      className={cn(
        'relative isolate overflow-hidden',
        tone === 'kitchen' ? 'bg-burgundy-deep' : 'bg-forest-deep',
      )}
    >
      <img
        src={img(image, 1600)}
        srcSet={`${img(image, 800)} 800w, ${img(image, 1600)} 1600w`}
        sizes="100vw"
        alt=""
        className="absolute inset-0 -z-10 size-full object-cover opacity-45"
        fetchPriority="high"
      />
      <div
        className={cn(
          'absolute inset-0 -z-10',
          tone === 'kitchen'
            ? 'bg-[linear-gradient(90deg,rgba(74,9,11,0.95)_0%,rgba(74,9,11,0.7)_55%,rgba(74,9,11,0.25)_100%)]'
            : 'bg-[linear-gradient(90deg,rgba(27,77,49,0.95)_0%,rgba(27,77,49,0.72)_55%,rgba(27,77,49,0.2)_100%)]',
        )}
      />
      <div className="mx-auto max-w-content px-4 py-20 sm:px-6 sm:py-28">
        <p
          className={cn(
            'eyebrow',
            tone === 'kitchen' ? 'text-gold' : 'text-[#d6dcbf]',
          )}
        >
          {eyebrow}
        </p>
        <h1 className="mt-4 max-w-2xl text-4xl leading-[1.05] font-semibold text-balance text-white sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
          {intro}
        </p>
        {children && (
          <div className="mt-8 flex flex-wrap gap-3">{children}</div>
        )}
      </div>
    </section>
  )
}

export function WhatsAppButton({
  message = GENERAL_ENQUIRY,
  children = 'Order via WhatsApp',
  variant = 'gold',
  className,
}: {
  message?: string
  children?: React.ReactNode
  variant?: 'gold' | 'green' | 'outline-light' | 'burgundy'
  className?: string
}) {
  return (
    <a
      href={whatsappUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'inline-flex h-12 items-center justify-center gap-2.5 rounded-full px-6 text-sm font-semibold transition-colors focus-visible:ring-[3px] focus-visible:ring-gold/60 focus-visible:outline-none sm:text-base',
        variant === 'gold' && 'bg-gold text-burgundy-deep hover:bg-[#f0c977]',
        variant === 'green' && 'bg-forest text-white hover:bg-forest-deep',
        variant === 'burgundy' &&
          'bg-burgundy text-white hover:bg-burgundy-deep',
        variant === 'outline-light' &&
          'border border-white/40 text-white hover:bg-white/10',
        className,
      )}
    >
      <WhatsAppIcon className="size-5" />
      {children}
    </a>
  )
}

/** Closing call-to-action band used at the bottom of pages. */
export function WhatsAppCta({
  title = 'Hungry? We’re one message away.',
  text = 'Send us your order on WhatsApp and we’ll confirm availability, final pricing, delivery charges and payment details.',
}: {
  title?: string
  text?: string
}) {
  return (
    <section className="px-4 py-16 sm:px-6 sm:py-20">
      <Reveal className="relative mx-auto max-w-content overflow-hidden rounded-[2rem] bg-burgundy px-6 py-14 text-center sm:px-12 sm:py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 -right-24 size-72 rounded-full border-[28px] border-gold/15"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-28 -left-20 size-72 rounded-full border-[28px] border-white/5"
        />
        <p className="eyebrow text-gold">Order via WhatsApp</p>
        <h2 className="mx-auto mt-4 max-w-2xl text-3xl leading-tight font-semibold text-balance text-white sm:text-5xl">
          {title}
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-white/80">{text}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <WhatsAppButton />
          <a
            href={`tel:${SITE.phoneInternational}`}
            className="inline-flex h-12 items-center rounded-full border border-white/30 px-6 font-semibold text-white hover:bg-white/10"
          >
            Call {SITE.phoneDisplay}
          </a>
        </div>
      </Reveal>
    </section>
  )
}

/** Payment & delivery explainer, shared by homepage, cart and contact. */
export function DeliveryInfo({ className }: { className?: string }) {
  const points = [
    {
      title: 'Delivery across Lagos State',
      text: DELIVERY.freeDeliveryVgcConfirmed
        ? 'We deliver to homes and offices across Lagos State — with free delivery within VGC.'
        : 'We deliver to homes and offices across Lagos State. Delivery charges depend on your location.',
    },
    {
      title: 'Confirmed on WhatsApp',
      text: 'We confirm product availability, final prices, delivery charges and payment instructions with you directly.',
    },
    {
      title: 'Payment verified first',
      text: 'Payment is arranged on WhatsApp and verified by O.J KITCHEN before your order is prepared.',
    },
  ]
  return (
    <div
      className={cn(
        'grid gap-px overflow-hidden rounded-2xl bg-border sm:grid-cols-3',
        className,
      )}
    >
      {points.map((p, i) => (
        <div key={p.title} className="bg-white p-6">
          <p className="font-display text-3xl text-gold">0{i + 1}</p>
          <p className="mt-2 font-semibold">{p.title}</p>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
            {p.text}
          </p>
        </div>
      ))}
    </div>
  )
}
