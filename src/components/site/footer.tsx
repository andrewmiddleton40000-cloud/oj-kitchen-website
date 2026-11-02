import { Link } from '@tanstack/react-router'
import { Phone } from 'lucide-react'
import { SITE } from '@/config/site'
import { whatsappUrl, GENERAL_ENQUIRY } from '@/lib/order'
import { InstagramIcon, TikTokIcon, WhatsAppIcon } from './icons'
import { NAV } from './header'

export function SiteFooter() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-burgundy-deep text-white/80">
      <div className="mx-auto max-w-content px-4 pt-16 pb-10 sm:px-6">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <img
                src="/.netlify/images?url=/img/logo-emblem.png&w=128&fm=webp"
                alt=""
                width={52}
                height={58}
                className="h-14 w-auto"
              />
              <div>
                <p className="font-display text-2xl font-semibold text-white">
                  O.J KITCHEN
                </p>
                <p className="text-xs tracking-[0.2em] text-gold uppercase">
                  &amp; <span className="text-[#b9c29b]">O.J FRESH CUTS</span>
                </p>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed">
              Fresh, nutritious home-style Nigerian meals and neatly prepared
              vegetables, delivered across {SITE.serviceArea}.
            </p>
            <p className="mt-6 font-display text-lg text-gold italic">
              {SITE.tagline}
            </p>
          </div>

          <nav aria-label="Footer">
            <p className="eyebrow text-gold">Explore</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {NAV.map((n) => (
                <li key={n.to}>
                  <Link to={n.to} className="hover:text-white hover:underline">
                    {n.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/cart" className="hover:text-white hover:underline">
                  Your Cart
                </Link>
              </li>
            </ul>
          </nav>

          <div>
            <p className="eyebrow text-gold">Get in touch</p>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href={whatsappUrl(GENERAL_ENQUIRY)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 hover:text-white"
                >
                  <WhatsAppIcon className="size-4 text-gold" /> WhatsApp{' '}
                  {SITE.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${SITE.phoneInternational}`}
                  className="inline-flex items-center gap-2.5 hover:text-white"
                >
                  <Phone className="size-4 text-gold" /> {SITE.phoneLocal}
                </a>
              </li>
            </ul>
            <p className="eyebrow mt-8 text-gold">Follow us</p>
            <div className="mt-4 flex gap-3">
              <a
                href={SITE.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`O.J KITCHEN on Instagram (${SITE.instagramHandle})`}
                className="grid size-11 place-items-center rounded-full border border-white/20 transition-colors hover:border-gold hover:bg-gold hover:text-burgundy-deep"
              >
                <InstagramIcon className="size-5" />
              </a>
              <a
                href={SITE.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`O.J KITCHEN on TikTok (${SITE.tiktokHandle})`}
                className="grid size-11 place-items-center rounded-full border border-white/20 transition-colors hover:border-gold hover:bg-gold hover:text-burgundy-deep"
              >
                <TikTokIcon className="size-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} O.J KITCHEN. All rights reserved.</p>
          <p>
            Orders, payment and delivery are confirmed directly on WhatsApp.
          </p>
        </div>
      </div>
    </footer>
  )
}
