import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'

import { Toaster } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { NotFoundPage } from '@/components/error-pages'
import { CartProvider } from '@/lib/cart'
import { SiteHeader } from '@/components/site/header'
import { SiteFooter } from '@/components/site/footer'
import { CartDrawer } from '@/components/site/cart-drawer'
import { FloatingWhatsApp } from '@/components/site/floating-whatsapp'
import { SITE } from '@/config/site'

import '../styles.css'

const siteName = `${SITE.name} — ${SITE.tagline}`
const siteDescription = SITE.description

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: siteName,
      },
      {
        name: 'description',
        content: siteDescription,
      },
      {
        property: 'og:title',
        content: siteName,
      },
      {
        property: 'og:description',
        content: siteDescription,
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        property: 'og:image',
        content: '/img/hero.jpg',
      },
      {
        property: 'og:site_name',
        content: SITE.name,
      },
      {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
      {
        name: 'theme-color',
        content: '#710F12',
      },
    ],
    links: [
      { rel: 'icon', type: 'image/png', href: '/img/favicon-64.png' },
      { rel: 'apple-touch-icon', href: '/img/apple-touch-icon.png' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'anonymous',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400..700;1,9..144,400..600&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap',
      },
    ],
    scripts: [
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FoodEstablishment',
          name: SITE.name,
          description: SITE.description,
          telephone: SITE.phoneInternational,
          servesCuisine: 'Nigerian',
          areaServed: 'Lagos State, Nigeria',
          sameAs: [SITE.instagram, SITE.tiktok],
        }),
      },
    ],
  }),
  shellComponent: RootDocument,
  notFoundComponent: NotFoundPage,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-NG">
      <head>
        <HeadContent />
      </head>
      <body>
        <noscript>
          <style>
            {'.reveal{opacity:1!important;transform:none!important}'}
          </style>
        </noscript>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-burgundy"
        >
          Skip to content
        </a>
        <TooltipProvider>
          <CartProvider>
            <SiteHeader />
            <main id="main">{children}</main>
            <SiteFooter />
            <CartDrawer />
            <FloatingWhatsApp />
          </CartProvider>
        </TooltipProvider>
        <Toaster position="top-center" richColors={false} />
        <Scripts />
      </body>
    </html>
  )
}
