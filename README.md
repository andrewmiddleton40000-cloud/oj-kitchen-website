# O.J KITCHEN website

Catalogue and WhatsApp ordering site for O.J KITCHEN and its sub-brand OJ Fresh Cuts (Lagos State). Customers browse meals and fresh-cut vegetables, build a cart (saved in the browser), and send the order as a pre-filled WhatsApp message. No backend, accounts or payment gateway — payment and delivery are arranged on WhatsApp.

## Tech
TanStack Start (React 19, TypeScript), Tailwind CSS 4, Netlify hosting and Image CDN.

## Run locally
```bash
pnpm install
npm run dev          # http://localhost:3000
# or with Netlify emulation (needed for /.netlify/images):
netlify dev --port 8889
```

## Editing content
- Menu, prices, soup sizes, images: `src/data/products.ts`
- Phone, socials, delivery areas, VGC free-delivery flag: `src/config/site.ts`
- Photos: `public/img`

## Roadmap
See [PLAN.md](PLAN.md). Remaining: Our Meals, Fresh Cuts, Cart/checkout, Catering, About and Contact pages, then QA.
