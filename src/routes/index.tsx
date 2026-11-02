import { createFileRoute, Link } from '@tanstack/react-router'
import {
  ArrowRight,
  ChefHat,
  HeartPulse,
  Leaf,
  Truck,
  Sparkles,
} from 'lucide-react'
import { SITE, img } from '@/config/site'
import { PRODUCTS } from '@/data/products'
import { Reveal } from '@/components/site/reveal'
import {
  DeliveryInfo,
  SectionHeading,
  WhatsAppButton,
  WhatsAppCta,
} from '@/components/site/sections'
import { PriceLabel } from '@/components/site/product-card'
import { unitPriceFor } from '@/lib/order'

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      {
        title: `${SITE.name} | Home-Style Nigerian Meals & Fresh Cuts in Lagos`,
      },
      { name: 'description', content: SITE.description },
    ],
  }),
  component: Home,
})

const FRESH_LIST = [
  'Fresh-cut vegetables',
  'Washed vegetables',
  'Peeled vegetables',
  'Chopped vegetables',
  'Salad ingredients',
  'Cooking essentials',
]

const WHY = [
  {
    icon: ChefHat,
    title: 'Real home-style cooking',
    text: 'Recipes cooked the way they are at home — patiently, generously and full of flavour.',
  },
  {
    icon: Leaf,
    title: 'Fresh, quality ingredients',
    text: 'Fresh produce and proteins, carefully selected and cleaned for every pot.',
  },
  {
    icon: HeartPulse,
    title: 'Nutritious by design',
    text: 'Balanced, wholesome meals that support healthy living without compromising taste.',
  },
  {
    icon: Truck,
    title: 'Convenience, delivered',
    text: 'Order in a few taps and receive meals or ready-to-cook ingredients across Lagos.',
  },
]

const STEPS = [
  { title: 'Browse', text: 'Explore our meals and O.J FRESH CUTS.' },
  { title: 'Add to cart', text: 'Choose quantities and soup bowl sizes.' },
  {
    title: 'Send on WhatsApp',
    text: 'Your full order is written for you — just tap send.',
  },
  {
    title: 'Confirm & pay',
    text: 'We confirm prices, delivery and payment, then start cooking.',
  },
]

function Home() {
  const featured = PRODUCTS.filter((p) => p.featured && p.brand === 'kitchen')
  const [lead, ...rest] = featured

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-cream">
        <div className="mx-auto grid max-w-content items-center gap-10 px-4 pt-10 pb-16 sm:px-6 lg:grid-cols-[1.02fr_1fr] lg:gap-14 lg:pt-16 lg:pb-24">
          <div className="relative z-10">
            <Reveal>
              <p className="eyebrow inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-burgundy ring-1 ring-border">
                <span className="size-1.5 rounded-full bg-gold" />
                O.J KITCHEN · O.J FRESH CUTS · Lagos
              </p>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="mt-6 text-[2.6rem] leading-[1.02] font-semibold text-balance text-burgundy sm:text-6xl lg:text-[4.4rem]">
                Good Food.{' '}
                <span className="text-foreground">Healthy Living.</span>{' '}
                <em className="font-normal text-burgundy italic">
                  Made Convenient.
                </em>
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
                Enjoy delicious, nutritious home-style meals and freshly
                prepared cooking ingredients, delivered conveniently to your
                doorstep.
              </p>
            </Reveal>
            <Reveal delay={240} className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/menu"
                className="inline-flex h-12 items-center gap-2 rounded-full bg-burgundy px-6 font-semibold text-white shadow-[0_12px_30px_-12px_rgba(113,15,18,0.7)] transition-colors hover:bg-burgundy-deep"
              >
                Explore Our Menu <ArrowRight className="size-4" />
              </Link>
              <WhatsAppButton variant="gold" />
            </Reveal>
            <Reveal delay={320}>
              <dl className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-border pt-6">
                <div>
                  <dt className="text-xs text-muted-foreground">
                    Signature soups
                  </dt>
                  <dd className="font-display text-2xl font-semibold text-burgundy">
                    11
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-muted-foreground">Soup bowls</dt>
                  <dd className="font-display text-2xl font-semibold text-burgundy">
                    2.4–10L
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-muted-foreground">Delivery</dt>
                  <dd className="font-display text-2xl font-semibold text-burgundy">
                    Lagos
                  </dd>
                </div>
              </dl>
            </Reveal>
          </div>

          <Reveal delay={120} className="relative">
            <div className="relative overflow-hidden rounded-[2rem] shadow-[0_40px_80px_-40px_rgba(74,9,11,0.55)]">
              <img
                src={img('/img/hero.jpg', 1100, 900)}
                srcSet={`${img('/img/hero.jpg', 640, 524)} 640w, ${img('/img/hero.jpg', 1100, 900)} 1100w, ${img('/img/hero.jpg', 1500, 1228)} 1500w`}
                sizes="(min-width: 1024px) 50vw, 100vw"
                alt="A spread of O.J KITCHEN meals: egusi soup, jollof rice, fried plantain, peppered fish and efo riro"
                width={1100}
                height={900}
                fetchPriority="high"
                className="aspect-[11/9] w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 left-4 flex items-center gap-3 rounded-2xl bg-white p-3 pr-5 shadow-xl ring-1 ring-border sm:left-[-1.5rem]">
              <img
                src="/.netlify/images?url=/img/logo-emblem.png&w=120&fm=webp"
                alt=""
                width={48}
                height={54}
                className="h-12 w-auto"
              />
              <div>
                <p className="font-display text-base leading-tight font-semibold">
                  Cooked by Chef OJ
                </p>
                <p className="text-xs text-muted-foreground">
                  Cooking your cravings
                </p>
              </div>
            </div>
            <div className="absolute top-5 right-5 hidden rounded-full bg-forest px-4 py-2 text-xs font-semibold text-white shadow-lg sm:block">
              New · O.J FRESH CUTS
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Intro ────────────────────────────────────────── */}
      <section className="border-y border-border bg-white">
        <div className="mx-auto grid max-w-content gap-10 px-4 py-16 sm:px-6 md:grid-cols-[1fr_1.3fr] md:items-center lg:py-24">
          <SectionHeading
            eyebrow="Welcome to O.J KITCHEN"
            title={
              <>
                Home-style Nigerian food, made with care for{' '}
                <em className="font-normal text-burgundy">busy Lagos lives.</em>
              </>
            }
          />
          <Reveal className="space-y-5 text-lg leading-relaxed text-muted-foreground">
            <p>
              O.J KITCHEN provides fresh, nutritious and delicious home-style
              meals — from rich Nigerian soups packed in family-sized bowls to
              smoky jollof and comforting weekday favourites.
            </p>
            <p>
              Our mission is simple:{' '}
              <strong className="text-foreground">
                {SITE.mission.replace(/^To /, 'to ')}
              </strong>
            </p>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 font-semibold text-burgundy underline-offset-4 hover:underline"
            >
              Our story <ArrowRight className="size-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── Featured meals ───────────────────────────────── */}
      <section className="mx-auto max-w-content px-4 py-16 sm:px-6 lg:py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Featured meals"
            title="Favourites from our kitchen"
            intro="A taste of what’s cooking. Soups come in sealed bowls and buckets — choose your size when you order."
          />
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 rounded-full border border-burgundy/25 px-5 py-2.5 text-sm font-semibold text-burgundy hover:bg-burgundy hover:text-white"
          >
            See the full menu <ArrowRight className="size-4" />
          </Link>
        </div>

        {lead && (
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            <Reveal>
              <Link
                to="/menu"
                hash={lead.id}
                className="group relative block h-full min-h-[22rem] overflow-hidden rounded-3xl"
              >
                <img
                  src={img(lead.image, 900, 900)}
                  alt={lead.name}
                  loading="lazy"
                  className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                  {lead.tag && (
                    <span className="rounded-full bg-gold px-3 py-1 text-xs font-semibold text-burgundy-deep">
                      {lead.tag}
                    </span>
                  )}
                  <h3 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
                    {lead.name}
                  </h3>
                  <p className="mt-2 max-w-md text-white/80">
                    {lead.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-gold">
                    Choose size &amp; order <ArrowRight className="size-4" />
                  </span>
                </div>
              </Link>
            </Reveal>
            <ul className="grid gap-5 sm:grid-cols-2">
              {rest.slice(0, 4).map((p, i) => (
                <Reveal as="li" key={p.id} delay={i * 70}>
                  <Link
                    to="/menu"
                    hash={p.id}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-border transition-shadow hover:shadow-lg"
                  >
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={img(p.image, 520, 390)}
                        alt={p.name}
                        loading="lazy"
                        className="size-full object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none"
                      />
                    </div>
                    <div className="flex flex-1 items-end justify-between gap-3 p-4">
                      <div>
                        <h3 className="font-display text-lg font-semibold">
                          {p.name}
                        </h3>
                        <PriceLabel
                          price={unitPriceFor(p, p.sizes?.[0]?.label)}
                          className="text-xs"
                        />
                      </div>
                      <span className="grid size-9 shrink-0 place-items-center rounded-full bg-burgundy/5 text-burgundy transition-colors group-hover:bg-burgundy group-hover:text-white">
                        <ArrowRight className="size-4" />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </ul>
          </div>
        )}
      </section>

      {/* ── O.J FRESH CUTS ────────────────────────────────── */}
      <section className="bg-sage-soft">
        <div className="mx-auto grid max-w-content items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
          <Reveal className="relative order-last lg:order-first">
            <img
              src={img('/img/fresh-hero.jpg', 900, 720)}
              alt="Freshly washed and neatly cut vegetables from O.J FRESH CUTS"
              loading="lazy"
              className="aspect-[5/4] w-full rounded-[2rem] object-cover"
            />
            <img
              src={img('/img/fc-leafy.jpg', 360, 360)}
              alt=""
              loading="lazy"
              className="absolute -right-3 -bottom-8 hidden size-40 rounded-2xl border-[6px] border-sage-soft object-cover shadow-xl sm:block lg:-right-8"
            />
          </Reveal>
          <div>
            <SectionHeading
              tone="fresh"
              eyebrow="Introducing O.J FRESH CUTS"
              title={
                <>
                  Cooking made easier,{' '}
                  <em className="font-normal text-forest">one fresh cut</em> at
                  a time.
                </>
              }
              intro="Our fresh-produce line, operating under O.J KITCHEN. We wash, peel and neatly cut vegetables, salad ingredients and cooking essentials — so you skip the prep and go straight to the pot."
            />
            <Reveal as="ul" className="mt-8 grid grid-cols-2 gap-x-6 gap-y-3">
              {FRESH_LIST.map((f) => (
                <li
                  key={f}
                  className="flex items-center gap-2.5 text-sm font-medium sm:text-base"
                >
                  <Leaf className="size-4 shrink-0 text-forest" />
                  {f}
                </li>
              ))}
            </Reveal>
            <Reveal className="mt-9 flex flex-wrap gap-3">
              <Link
                to="/fresh-cuts"
                className="inline-flex h-12 items-center gap-2 rounded-full bg-forest px-6 font-semibold text-white hover:bg-forest-deep"
              >
                Shop Fresh Cuts <ArrowRight className="size-4" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Why choose us ────────────────────────────────── */}
      <section className="mx-auto max-w-content px-4 py-16 sm:px-6 lg:py-24">
        <SectionHeading
          align="center"
          eyebrow="Why choose us"
          title="Good food you can trust"
          intro="Everything we make is guided by quality, healthy eating and convenience."
        />
        <div className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {WHY.map((w, i) => (
            <Reveal
              key={w.title}
              delay={i * 80}
              className="border-t-2 border-gold pt-6"
            >
              <w.icon className="size-7 text-burgundy" strokeWidth={1.6} />
              <h3 className="mt-4 text-xl font-semibold">{w.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {w.text}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Catering ─────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-burgundy-deep">
        <img
          src={img('/img/catering.jpg', 1600)}
          alt=""
          loading="lazy"
          className="absolute inset-0 -z-10 size-full object-cover opacity-40"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-burgundy-deep via-burgundy-deep/85 to-burgundy-deep/30" />
        <div className="mx-auto max-w-content px-4 py-20 sm:px-6 lg:py-28">
          <SectionHeading
            tone="light"
            eyebrow="Catering services"
            title="Let us feed your guests"
            intro="From birthdays and owambes to office lunches and family gatherings, O.J KITCHEN caters events and special occasions with the same home-style care."
          />
          <Reveal className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/catering"
              className="inline-flex h-12 items-center gap-2 rounded-full bg-gold px-6 font-semibold text-burgundy-deep hover:bg-[#f0c977]"
            >
              <Sparkles className="size-4" /> Plan your event
            </Link>
            <WhatsAppButton
              variant="outline-light"
              message="Hello O.J KITCHEN! I'd like to enquire about catering for an event."
            >
              Enquire on WhatsApp
            </WhatsAppButton>
          </Reveal>
        </div>
      </section>

      {/* ── How to order ─────────────────────────────────── */}
      <section className="bg-white">
        <div className="mx-auto max-w-content px-4 py-16 sm:px-6 lg:py-24">
          <SectionHeading
            eyebrow="How to order"
            title="From our kitchen to your door in four steps"
          />
          <ol className="mt-12 grid gap-6 md:grid-cols-4">
            {STEPS.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 80} className="relative">
                <span className="font-display text-6xl leading-none font-semibold text-gold/60">
                  {i + 1}
                </span>
                <h3 className="mt-3 text-xl font-semibold">{s.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {s.text}
                </p>
              </Reveal>
            ))}
          </ol>
          <Reveal className="mt-14">
            <h3 className="mb-4 text-xl font-semibold">
              Payment &amp; delivery
            </h3>
            <DeliveryInfo />
          </Reveal>
        </div>
      </section>

      <WhatsAppCta />
    </>
  )
}
