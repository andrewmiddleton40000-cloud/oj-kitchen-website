import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'
import { SITE } from '@/config/site'
import { CATEGORIES, PRODUCTS } from '@/data/products'
import { ProductCard } from '@/components/site/product-card'
import {
  PageHero,
  SectionHeading,
  WhatsAppButton,
  WhatsAppCta,
} from '@/components/site/sections'

export const Route = createFileRoute('/menu')({
  head: () => ({
    meta: [
      { title: `Our Meals | ${SITE.name}` },
      {
        name: 'description',
        content:
          'Browse O.J KITCHEN’s Nigerian soups, rice dishes, stews and stir-fries. Pick your soup bowl size, add to cart and order via WhatsApp across Lagos.',
      },
    ],
  }),
  component: MenuPage,
})

const KITCHEN_CATEGORIES = CATEGORIES.filter((c) => c.brand === 'kitchen')

function MenuPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Meals"
        title="Home-style Nigerian meals, cooked with care."
        intro="Rich soups in 2.4L to 10L bowls and buckets, comforting rice dishes and everyday favourites. Add what you love to your cart and send your order on WhatsApp."
        image="/img/assorted-soups.jpg"
      >
        <WhatsAppButton>Ask about today’s menu</WhatsAppButton>
      </PageHero>

      <nav
        aria-label="Menu categories"
        className="sticky top-16 z-30 border-b border-border bg-cream/95 backdrop-blur-md sm:top-[6.25rem]"
      >
        <ul className="mx-auto flex max-w-content gap-2 overflow-x-auto px-4 py-3 sm:px-6">
          {KITCHEN_CATEGORIES.map((c) => (
            <li key={c.id} className="shrink-0">
              <a
                href={`#${c.id}`}
                className="inline-flex rounded-full border border-burgundy/20 bg-white px-4 py-2 text-sm font-semibold text-burgundy transition-colors hover:border-burgundy hover:bg-burgundy hover:text-white motion-reduce:transition-none"
              >
                {c.name}
              </a>
            </li>
          ))}
          <li className="shrink-0">
            <Link
              to="/fresh-cuts"
              className="inline-flex rounded-full border border-forest/25 bg-white px-4 py-2 text-sm font-semibold text-forest transition-colors hover:bg-forest hover:text-white motion-reduce:transition-none"
            >
              OJ Fresh Cuts
            </Link>
          </li>
        </ul>
      </nav>

      {KITCHEN_CATEGORIES.map((c, i) => {
        const items = PRODUCTS.filter((p) => p.category === c.id)
        if (items.length === 0) return null
        return (
          <section
            key={c.id}
            id={c.id}
            aria-labelledby={`${c.id}-heading`}
            className={i % 2 === 1 ? 'scroll-mt-40 bg-white' : 'scroll-mt-40'}
          >
            <div className="mx-auto max-w-content px-4 py-14 sm:px-6 sm:py-20">
              <div id={`${c.id}-heading`}>
                <SectionHeading
                  eyebrow={`${items.length} ${items.length === 1 ? 'dish' : 'dishes'}`}
                  title={c.name}
                  intro={c.blurb}
                />
              </div>
              <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((p, idx) => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    priority={i === 0 && idx < 3}
                  />
                ))}
              </div>
            </div>
          </section>
        )
      })}

      <section className="bg-sage-soft/60">
        <div className="mx-auto flex max-w-content flex-col items-start gap-6 px-4 py-12 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="max-w-xl">
            <p className="eyebrow text-forest">Also from O.J KITCHEN</p>
            <p className="mt-2 font-display text-2xl font-semibold sm:text-3xl">
              Cooking at home? Add OJ Fresh Cuts to the same order.
            </p>
            <p className="mt-2 text-muted-foreground">
              Washed, peeled and neatly cut vegetables, salad ingredients and
              cooking essentials.
            </p>
          </div>
          <Link
            to="/fresh-cuts"
            className="inline-flex h-12 shrink-0 items-center gap-2 rounded-full bg-forest px-6 font-semibold text-white transition-colors hover:bg-forest-deep motion-reduce:transition-none"
          >
            Shop Fresh Cuts <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

      <WhatsAppCta />
    </>
  )
}
