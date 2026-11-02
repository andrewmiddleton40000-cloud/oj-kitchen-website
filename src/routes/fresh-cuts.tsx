import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowRight, Droplets, Leaf, Scissors, Sparkles } from 'lucide-react'
import { SITE } from '@/config/site'
import { CATEGORIES, PRODUCTS } from '@/data/products'
import { ProductCard } from '@/components/site/product-card'
import { Reveal } from '@/components/site/reveal'
import {
  PageHero,
  SectionHeading,
  WhatsAppButton,
  WhatsAppCta,
} from '@/components/site/sections'

export const Route = createFileRoute('/fresh-cuts')({
  head: () => ({
    meta: [
      {
        title: `O.J FRESH CUTS | Washed, Peeled & Cut Vegetables | ${SITE.name}`,
      },
      {
        name: 'description',
        content:
          'O.J FRESH CUTS by O.J KITCHEN: clean, washed, peeled and neatly cut vegetables, salad ingredients and cooking essentials delivered across Lagos.',
      },
    ],
  }),
  component: FreshCutsPage,
})

const category = CATEGORIES.find((c) => c.id === 'fresh-cuts')
const ITEMS = PRODUCTS.filter((p) => p.category === 'fresh-cuts')

const PROMISES = [
  {
    icon: Droplets,
    title: 'Thoroughly washed',
    text: 'Cleaned carefully so it’s ready for your pot.',
  },
  {
    icon: Scissors,
    title: 'Peeled & neatly cut',
    text: 'Prepped by hand to save you time in the kitchen.',
  },
  {
    icon: Leaf,
    title: 'Fresh every order',
    text: 'Prepared fresh with quality produce.',
  },
  {
    icon: Sparkles,
    title: 'Hygienically packed',
    text: 'Sealed and packed with care for delivery.',
  },
]

function FreshCutsPage() {
  return (
    <>
      <PageHero
        tone="fresh"
        eyebrow="O.J FRESH CUTS · by O.J KITCHEN"
        title="Skip the prep. Go straight to the pot."
        intro={
          category?.blurb ??
          'Clean, washed, peeled and neatly cut vegetables and cooking essentials.'
        }
        image="/img/fresh-hero.jpg"
      >
        <WhatsAppButton
          variant="gold"
          message={`Hello ${SITE.name}! I'd like to order from O.J FRESH CUTS. What's available today?`}
        >
          Order Fresh Cuts on WhatsApp
        </WhatsAppButton>
      </PageHero>

      <section className="border-b border-border bg-sage-soft/50">
        <ul className="mx-auto grid max-w-content gap-6 px-4 py-10 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
          {PROMISES.map((p) => (
            <li key={p.title} className="flex gap-3">
              <p.icon
                className="mt-0.5 size-6 shrink-0 text-forest"
                strokeWidth={1.6}
              />
              <div>
                <p className="font-semibold">{p.title}</p>
                <p className="text-sm text-muted-foreground">{p.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section
        aria-labelledby="fresh-heading"
        className="mx-auto max-w-content px-4 py-14 sm:px-6 sm:py-20"
      >
        <div id="fresh-heading">
          <SectionHeading
            tone="fresh"
            eyebrow="Shop Fresh Cuts"
            title="Fresh produce, ready when you are"
            intro="Add items to your cart alongside any O.J KITCHEN meals — everything goes in one WhatsApp order."
          />
        </div>
        {ITEMS.length === 0 ? (
          <p className="mt-10 text-muted-foreground">
            Our Fresh Cuts list is being updated. Message us on WhatsApp for
            today’s selection.
          </p>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ITEMS.map((p, i) => (
              <ProductCard key={p.id} product={p} priority={i < 3} />
            ))}
          </div>
        )}
      </section>

      <section className="bg-white">
        <Reveal className="mx-auto flex max-w-content flex-col items-start gap-6 px-4 py-12 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="max-w-xl">
            <p className="eyebrow text-burgundy">From the O.J KITCHEN pot</p>
            <p className="mt-2 font-display text-2xl font-semibold sm:text-3xl">
              Rather not cook today? Try our home-style meals.
            </p>
          </div>
          <Link
            to="/menu"
            className="inline-flex h-12 shrink-0 items-center gap-2 rounded-full bg-burgundy px-6 font-semibold text-white transition-colors hover:bg-burgundy-deep motion-reduce:transition-none"
          >
            See our meals <ArrowRight className="size-4" />
          </Link>
        </Reveal>
      </section>

      <WhatsAppCta />
    </>
  )
}
