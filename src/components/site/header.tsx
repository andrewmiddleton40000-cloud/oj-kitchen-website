import * as React from 'react'
import { Link } from '@tanstack/react-router'
import { Menu, ShoppingBag } from 'lucide-react'
import { Logo } from './logo'
import { WhatsAppIcon } from './icons'
import { useCart } from '@/lib/cart'
import { whatsappUrl, GENERAL_ENQUIRY } from '@/lib/order'
import { SITE } from '@/config/site'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { cn } from '@/lib/utils'

export const NAV = [
  { to: '/', label: 'Home' },
  { to: '/menu', label: 'Our Meals' },
  { to: '/fresh-cuts', label: 'OJ Fresh Cuts' },
  { to: '/catering', label: 'Catering' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
] as const

export function SiteHeader() {
  const { summary, setDrawerOpen, ready } = useCart()
  const [menuOpen, setMenuOpen] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const count = ready ? summary.itemCount : 0

  return (
    <header
      className={cn(
        'sticky top-0 z-40 border-b transition-colors duration-300 motion-reduce:transition-none',
        scrolled
          ? 'border-border bg-cream/90 backdrop-blur-md'
          : 'border-transparent bg-cream',
      )}
    >
      <div className="hidden bg-burgundy text-white sm:block">
        <div className="mx-auto flex max-w-content items-center justify-between px-4 py-1.5 text-xs sm:px-6">
          <p className="text-white/85">
            Home-style meals &amp; fresh cuts · Delivery across{' '}
            {SITE.serviceArea}
          </p>
          <a
            href={`tel:${SITE.phoneInternational}`}
            className="font-medium text-gold hover:underline"
          >
            Call / WhatsApp {SITE.phoneDisplay}
          </a>
        </div>
      </div>
      <div className="mx-auto flex h-16 max-w-content items-center justify-between gap-4 px-4 sm:h-[4.5rem] sm:px-6">
        <Logo />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="relative rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:text-burgundy data-[status=active]:text-burgundy"
                  activeOptions={{ exact: item.to === '/' }}
                >
                  {({ isActive }) => (
                    <>
                      {item.label}
                      <span
                        className={cn(
                          'absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-gold transition-transform duration-300 motion-reduce:transition-none',
                          isActive ? 'scale-x-100' : 'scale-x-0',
                        )}
                      />
                    </>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={whatsappUrl(GENERAL_ENQUIRY)}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-full border border-burgundy/20 px-4 py-2 text-sm font-semibold text-burgundy transition-colors hover:bg-burgundy hover:text-white md:inline-flex"
          >
            <WhatsAppIcon className="size-4" />
            Order on WhatsApp
          </a>
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="relative inline-flex size-11 items-center justify-center rounded-full bg-burgundy text-white shadow-sm transition-colors hover:bg-burgundy-deep focus-visible:ring-[3px] focus-visible:ring-gold/60 focus-visible:outline-none"
            aria-label={`Open cart, ${count} item${count === 1 ? '' : 's'}`}
          >
            <ShoppingBag className="size-5" />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 grid min-w-5 place-items-center rounded-full bg-gold px-1 text-[0.7rem] font-bold text-burgundy-deep ring-2 ring-cream">
                {count}
              </span>
            )}
          </button>

          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                className="inline-flex size-11 items-center justify-center rounded-full border border-border text-foreground lg:hidden"
                aria-label="Open menu"
              >
                <Menu className="size-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85vw] max-w-sm bg-cream">
              <SheetHeader>
                <SheetTitle className="font-display text-2xl text-burgundy">
                  Menu
                </SheetTitle>
                <SheetDescription>{SITE.tagline}</SheetDescription>
              </SheetHeader>
              <nav aria-label="Mobile" className="px-4">
                <ul className="divide-y divide-border border-y border-border">
                  {NAV.map((item) => (
                    <li key={item.to}>
                      <Link
                        to={item.to}
                        onClick={() => setMenuOpen(false)}
                        activeOptions={{ exact: item.to === '/' }}
                        className="flex items-center justify-between py-4 font-display text-xl text-foreground data-[status=active]:text-burgundy"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="mt-auto space-y-3 p-4">
                <a
                  href={whatsappUrl(GENERAL_ENQUIRY)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-full bg-forest px-5 py-3.5 font-semibold text-white"
                >
                  <WhatsAppIcon className="size-5" /> Chat on WhatsApp
                </a>
                <a
                  href={`tel:${SITE.phoneInternational}`}
                  className="block text-center text-sm text-muted-foreground"
                >
                  Call {SITE.phoneDisplay}
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
