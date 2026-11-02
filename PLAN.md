# OJ Kitchen — Build Plan

1. ✅ Brand foundation — burgundy/gold + Fresh Cuts green theme, Fraunces/Plus Jakarta Sans fonts, logo emblem, favicon, SEO metadata.
2. ✅ Photography — 26 realistic Nigerian food images in `public/img` (swap with client photos using the same file names).
3. ✅ Menu data — all soups, rice/mains, other meals and Fresh Cuts in `src/data/products.ts`, prices `null` ("Price to be confirmed"), editable soup sizes 2.4L–10L.
4. ✅ Cart + WhatsApp logic — localStorage cart (`src/lib/cart.tsx`), order/catering message builders and wa.me links (`src/lib/order.ts`).
5. ✅ Site chrome — header with mobile menu, footer with socials, cart drawer, floating WhatsApp button.
6. ✅ Homepage — hero, intro, featured meals, Fresh Cuts, why us, catering, how to order, delivery info, CTA.
7. ✅ `/menu` route — category sections rendering `ProductCard` for soups, rice & mains, other meals.
8. ✅ `/fresh-cuts` route — green-themed `PageHero` + Fresh Cuts product grid.
9. ✅ `/cart` route — full cart list (`CartLineItem`, `CartTotals`), customer form (name, phone, address, location dropdown from `DELIVERY.areas`, instructions) → `buildOrderMessage` → WhatsApp. Must not claim the order is confirmed.
10. ✅ `/catering` route — form (name, event type, date, guests, meals, location, requests) → `buildCateringMessage` → WhatsApp.
11. ✅ `/about` and `/contact` routes.
12. ⬜ QA — typecheck, lint, test nav links, cart maths, WhatsApp encoding, mobile layouts.
