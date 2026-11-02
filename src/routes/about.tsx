import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowRight, HeartPulse, Leaf, ShieldCheck, Truck } from 'lucide-react'
import { SITE, img } from '@/config/site'
import { Reveal } from '@/components/site/reveal'
import {
  PageHero,
  SectionHeading,
  WhatsAppCta,
} from '@/components/site/sections'

export const Route = createFileRoute('/about')({
  head: () => ({
    meta: [
      { title: `About Us | ${SITE.name}` },
      {
        name: 'description',
        content: `${SITE.name} makes healthy living and cooking easier through quality, convenience and good food — home-style Nigerian meals and O.J FRESH CUTS in Lagos.`,
      },
    ],
  }),
  component: AboutPage,
})

const VALUES = [
  {
    icon: ShieldCheck,
    title: 'Commitment to quality',
    text: 'We choose fresh, quality ingredients and prepare every order with care and hygiene — the way we would for our own family.',
  },
  {
    icon: HeartPulse,
    title: 'Healthy eating',
    text: 'Wholesome, balanced Nigerian meals and fresh vegetables that make it easier to eat well every day.',
  },
  {
    icon: Truck,
    title: 'Convenience',
    text: 'Ready-to-eat meals and ready-to-cook ingredients, ordered in minutes on WhatsApp and delivered across Lagos.',
  },
]

function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About O.J KITCHEN"
        title="Good food. Healthy living. Made convenient."
        intro="We’re a Lagos food business on a simple mission: to make healthy living and cooking easier through quality, convenience and good food."
        image="/img/hero.jpg"
      />

      <section className="mx-auto grid max-w-content items-center gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <img
            src={img('/img/egusi.jpg', 900, 700)}
            alt="A bowl of freshly made egusi soup"
            width={900}
            height={700}
            loading="lazy"
            className="aspect-[9/7] w-full rounded-2xl object-cover"
          />
        </Reveal>
        <div>
          <SectionHeading
            eyebrow="Our story"
            title="Home-style cooking for busy Lagos lives"
          />
          <div className="mt-5 max-w-reading space-y-4 leading-relaxed text-muted-foreground">
            <p>
              O.J KITCHEN provides fresh, nutritious and delicious home-style
              meals — rich Nigerian soups, comforting rice dishes and everyday
              favourites, cooked patiently and generously.
            </p>
            <p>
              Our sub-brand,{' '}
              <strong className="font-semibold text-forest">
                O.J FRESH CUTS
              </strong>
              , offers fresh, clean, washed, peeled and neatly cut vegetables,
              salad ingredients and cooking essentials, so you can skip the prep
              and get straight to cooking.
            </p>
          </div>
          <blockquote className="mt-8 border-l-4 border-gold pl-5">
            <p className="eyebrow text-burgundy">Our mission</p>
            <p className="mt-2 font-display text-xl leading-snug italic sm:text-2xl">
              {SITE.mission}
            </p>
          </blockquote>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-content px-4 py-14 sm:px-6 sm:py-20">
          <SectionHeading
            align="center"
            eyebrow="What we stand for"
            title="Quality, health and convenience"
          />
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {VALUES.map((v, i) => (
              <Reveal
                key={v.title}
                delay={i * 80}
                className="rounded-2xl bg-cream p-6 sm:p-8"
              >
                <v.icon className="size-8 text-burgundy" strokeWidth={1.6} />
                <h3 className="mt-4 text-xl font-semibold">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {v.text}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-content gap-6 px-4 py-14 sm:px-6 md:grid-cols-2">
        <Link
          to="/menu"
          className="group flex items-center justify-between rounded-2xl bg-burgundy p-6 text-white sm:p-8"
        >
          <span>
            <span className="eyebrow block text-gold">O.J KITCHEN</span>
            <span className="mt-2 block font-display text-2xl font-semibold">
              Explore our meals
            </span>
          </span>
          <ArrowRight className="size-6 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" />
        </Link>
        <Link
          to="/fresh-cuts"
          className="group flex items-center justify-between rounded-2xl bg-forest p-6 text-white sm:p-8"
        >
          <span>
            <span className="eyebrow flex items-center gap-1.5 text-[#d6dcbf]">
              <Leaf className="size-3.5" /> O.J FRESH CUTS
            </span>
            <span className="mt-2 block font-display text-2xl font-semibold">
              Shop fresh cuts
            </span>
          </span>
          <ArrowRight className="size-6 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" />
        </Link>
      </section>

      <WhatsAppCta />
    </>
  )
}
