/**
 * ─────────────────────────────────────────────────────────────
 *  O.J KITCHEN MENU & OJ FRESH CUTS CATALOGUE
 * ─────────────────────────────────────────────────────────────
 *  This is the single place to update the menu.
 *
 *  • Prices: set `price` to a number in Naira (e.g. 8500) once
 *    confirmed. Leave it as `null` to show "Price to be confirmed".
 *  • Soup sizes: each soup lists the bowl/bucket sizes it is sold in.
 *    Remove a size from a soup's `sizes` array if it isn't offered,
 *    and set each size's `price` when known.
 *  • Images: drop a new photo in /public/img and change `image`.
 *  • Featured: set `featured: true` to show the item on the homepage.
 * ─────────────────────────────────────────────────────────────
 */

export type Brand = 'kitchen' | 'fresh'

export type CategoryId = 'soups' | 'rice-mains' | 'other-meals' | 'fresh-cuts'

export interface PackSize {
  /** Label shown to customers, e.g. "2.4L" */
  label: string
  /** Price in Naira, or null while it is still to be confirmed */
  price: number | null
}

export interface Product {
  id: string
  name: string
  brand: Brand
  category: CategoryId
  description: string
  /** Path to an image inside /public */
  image: string
  /** Price in Naira for non-sized items, or null while unconfirmed */
  price: number | null
  /** Soup packaging options. When present, the customer must pick one. */
  sizes?: PackSize[]
  /** Optional short label, e.g. "Customer favourite" */
  tag?: string
  featured?: boolean
}

export interface Category {
  id: CategoryId
  name: string
  brand: Brand
  blurb: string
}

export const CATEGORIES: Category[] = [
  {
    id: 'soups',
    name: 'Nigerian Soups',
    brand: 'kitchen',
    blurb:
      'Rich, slow-cooked soups made the home way — packed in sealed bowls and buckets from 2.4L to 10L.',
  },
  {
    id: 'rice-mains',
    name: 'Rice & Main Dishes',
    brand: 'kitchen',
    blurb:
      'Comforting Nigerian classics for lunch, dinner and the whole family.',
  },
  {
    id: 'other-meals',
    name: 'Other Meals',
    brand: 'kitchen',
    blurb: 'Stews and stir-fries that make weekday cooking effortless.',
  },
  {
    id: 'fresh-cuts',
    name: 'OJ Fresh Cuts',
    brand: 'fresh',
    blurb:
      'Clean, washed, peeled and neatly cut vegetables and cooking essentials — ready for your pot.',
  },
]

/**
 * Soup packaging sizes offered by O.J KITCHEN (2.4L up to 10L).
 * The intermediate sizes below are placeholders — confirm the exact
 * sizes with the business and edit this list. Each soup copies this
 * list by default; override `sizes` on an individual soup if it is
 * only available in some sizes.
 */
export const SOUP_SIZES: PackSize[] = [
  { label: '2.4L', price: null },
  { label: '3L', price: null },
  { label: '4L', price: null },
  { label: '5L', price: null },
  { label: '7L', price: null },
  { label: '10L', price: null },
]

const soupSizes = () => SOUP_SIZES.map((s) => ({ ...s }))

export const PRODUCTS: Product[] = [
  // ── Nigerian Soups ───────────────────────────────────────────
  {
    id: 'egusi-soup',
    name: 'Egusi Soup',
    brand: 'kitchen',
    category: 'soups',
    description:
      'Ground melon seed soup simmered with leafy greens, assorted meat and stockfish in a rich palm-oil base.',
    image: '/img/egusi.jpg',
    price: null,
    sizes: soupSizes(),
    tag: 'Customer favourite',
    featured: true,
  },
  {
    id: 'afang-soup',
    name: 'Afang Soup',
    brand: 'kitchen',
    category: 'soups',
    description:
      'A nourishing Efik classic of finely shredded okazi and waterleaf, with periwinkle, beef and dried fish.',
    image: '/img/afang.jpg',
    price: null,
    sizes: soupSizes(),
    featured: true,
  },
  {
    id: 'efo-riro',
    name: 'Efo Riro',
    brand: 'kitchen',
    category: 'soups',
    description:
      'Yoruba-style spinach stew cooked down in a peppery palm-oil base with locust beans and assorted meat.',
    image: '/img/efo-riro.jpg',
    price: null,
    sizes: soupSizes(),
  },
  {
    id: 'black-soup',
    name: 'Black Soup',
    brand: 'kitchen',
    category: 'soups',
    description:
      'Edo-style herbal leaf soup (omoebe) — deep, aromatic and full of fish and assorted meat.',
    image: '/img/black-soup.jpg',
    price: null,
    sizes: soupSizes(),
  },
  {
    id: 'bitterleaf-soup',
    name: 'Bitterleaf Soup',
    brand: 'kitchen',
    category: 'soups',
    description:
      'Ofe Onugbu — washed bitterleaf in a cocoyam-thickened broth with stockfish and tender meat.',
    image: '/img/bitterleaf.jpg',
    price: null,
    sizes: soupSizes(),
  },
  {
    id: 'ofe-nsala',
    name: 'Ofe Nsala',
    brand: 'kitchen',
    category: 'soups',
    description:
      'The light, peppery “white soup” thickened with yam and finished with fresh catfish and utazi.',
    image: '/img/ofe-nsala.jpg',
    price: null,
    sizes: soupSizes(),
  },
  {
    id: 'oha-soup',
    name: 'Oha Soup',
    brand: 'kitchen',
    category: 'soups',
    description:
      'Tender oha leaves in a cocoyam-thickened palm-oil broth with assorted meat and stockfish.',
    image: '/img/oha.jpg',
    price: null,
    sizes: soupSizes(),
  },
  {
    id: 'seafood-okro',
    name: 'Seafood Okro',
    brand: 'kitchen',
    category: 'soups',
    description:
      'Fresh chopped okro loaded with prawns, crab, calamari and fish — light, vibrant and generous.',
    image: '/img/seafood-okro.jpg',
    price: null,
    sizes: soupSizes(),
    featured: true,
  },
  {
    id: 'fisherman-soup',
    name: 'Fisherman Soup',
    brand: 'kitchen',
    category: 'soups',
    description:
      'A Rivers-style seafood pot of fresh fish, prawns, crab and periwinkle in a fiery pepper broth.',
    image: '/img/fisherman.jpg',
    price: null,
    sizes: soupSizes(),
  },
  {
    id: 'banga-soup',
    name: 'Banga Soup',
    brand: 'kitchen',
    category: 'soups',
    description:
      'Delta-style palm-nut soup, fragrant with banga spice and served with catfish and dried fish.',
    image: '/img/banga.jpg',
    price: null,
    sizes: soupSizes(),
  },
  {
    id: 'assorted-soups',
    name: 'Nigerian Assorted Soups',
    brand: 'kitchen',
    category: 'soups',
    description:
      'Can’t pick one? Build a mixed soup order for your freezer — tell us your favourites on WhatsApp.',
    image: '/img/assorted-soups.jpg',
    price: null,
    sizes: soupSizes(),
  },

  // ── Rice & Main Dishes ───────────────────────────────────────
  {
    id: 'jollof-rice',
    name: 'Jollof Rice',
    brand: 'kitchen',
    category: 'rice-mains',
    description:
      'Smoky, party-style Nigerian jollof cooked in a rich tomato and pepper base.',
    image: '/img/jollof.jpg',
    price: null,
    tag: 'Party favourite',
    featured: true,
  },
  {
    id: 'fried-rice',
    name: 'Fried Rice',
    brand: 'kitchen',
    category: 'rice-mains',
    description:
      'Nigerian fried rice tossed with carrots, green beans, sweetcorn, liver and shrimp.',
    image: '/img/fried-rice.jpg',
    price: null,
  },
  {
    id: 'ewa-agoyin',
    name: 'Ewa Agoyin',
    brand: 'kitchen',
    category: 'rice-mains',
    description:
      'Soft mashed beans topped with the signature deep, smoky agoyin pepper sauce.',
    image: '/img/ewa-agoyin.jpg',
    price: null,
    featured: true,
  },
  {
    id: 'bole-and-fish',
    name: 'Bole and Fish',
    brand: 'kitchen',
    category: 'rice-mains',
    description:
      'Roasted ripe plantain and grilled fish with spicy pepper sauce and fresh sliced onions.',
    image: '/img/bole-fish.jpg',
    price: null,
  },

  // ── Other Meals ──────────────────────────────────────────────
  {
    id: 'stew',
    name: 'Stew',
    brand: 'kitchen',
    category: 'other-meals',
    description:
      'Classic Nigerian tomato and pepper stew, well fried with your choice of protein.',
    image: '/img/stew.jpg',
    price: null,
  },
  {
    id: 'stir-fried-spaghetti',
    name: 'Stir-fried Spaghetti',
    brand: 'kitchen',
    category: 'other-meals',
    description:
      'Spaghetti stir-fried with colourful peppers, vegetables, sausage and prawns.',
    image: '/img/spaghetti.jpg',
    price: null,
  },
  {
    id: 'stir-fried-vegetables',
    name: 'Stir-fried Vegetables',
    brand: 'kitchen',
    category: 'other-meals',
    description:
      'A light, colourful wok of green beans, carrots, cabbage and peppers — healthy and satisfying.',
    image: '/img/stir-fry-veg.jpg',
    price: null,
  },

  // ── OJ Fresh Cuts ────────────────────────────────────────────
  {
    id: 'fresh-cut-vegetables',
    name: 'Fresh-Cut Vegetables',
    brand: 'fresh',
    category: 'fresh-cuts',
    description:
      'A neat mix of freshly cut peppers, onions, cabbage, carrots and greens, ready to cook.',
    image: '/img/fresh-hero.jpg',
    price: null,
    featured: true,
  },
  {
    id: 'washed-vegetables',
    name: 'Washed Vegetables',
    brand: 'fresh',
    category: 'fresh-cuts',
    description:
      'Thoroughly washed and sliced leafy greens — ugu, spinach, scent leaf and more.',
    image: '/img/fc-leafy.jpg',
    price: null,
  },
  {
    id: 'peeled-vegetables',
    name: 'Peeled Vegetables',
    brand: 'fresh',
    category: 'fresh-cuts',
    description:
      'Peeled onions, garlic, ginger, yam and other staples — the tedious part already done.',
    image: '/img/fc-peeled.jpg',
    price: null,
  },
  {
    id: 'chopped-vegetables',
    name: 'Chopped Vegetables',
    brand: 'fresh',
    category: 'fresh-cuts',
    description:
      'Evenly diced carrots, green beans, onions and peppers for fried rice, sauces and stir-fries.',
    image: '/img/fc-chopped.jpg',
    price: null,
  },
  {
    id: 'salad-ingredients',
    name: 'Salad Ingredients',
    brand: 'fresh',
    category: 'fresh-cuts',
    description:
      'Crisp lettuce, cucumber, tomatoes, carrots, sweetcorn and more — prepped for a fresh salad.',
    image: '/img/fc-salad.jpg',
    price: null,
  },
  {
    id: 'cooking-essentials',
    name: 'Cooking Essentials',
    brand: 'fresh',
    category: 'fresh-cuts',
    description:
      'Blended pepper mix, chopped herbs and prepped seasonings to make everyday cooking faster.',
    image: '/img/fc-essentials.jpg',
    price: null,
  },
]

export const PRODUCTS_BY_ID: Record<string, Product> = Object.fromEntries(
  PRODUCTS.map((p) => [p.id, p]),
)

export function productsIn(category: CategoryId) {
  return PRODUCTS.filter((p) => p.category === category)
}
