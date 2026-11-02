import { Link } from '@tanstack/react-router'
import { ShoppingBag } from 'lucide-react'
import { useCart } from '@/lib/cart'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { CartLineItem } from './cart-line'
import { CartTotals } from './cart-summary'

export function CartDrawer() {
  const { drawerOpen, setDrawerOpen, resolved, summary } = useCart()
  const empty = resolved.length === 0
  return (
    <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
      <SheetContent side="right" className="w-full gap-0 bg-cream sm:max-w-md">
        <SheetHeader className="border-b border-border px-5 py-5">
          <SheetTitle className="font-display text-2xl text-burgundy">
            Your cart
          </SheetTitle>
          <SheetDescription>
            {empty
              ? 'Your cart is empty.'
              : 'Meals and fresh cuts can be ordered together in one WhatsApp message.'}
          </SheetDescription>
        </SheetHeader>

        {empty ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
            <div className="grid size-16 place-items-center rounded-full bg-gold-soft">
              <ShoppingBag className="size-7 text-burgundy" />
            </div>
            <p className="font-display text-xl">Nothing here yet</p>
            <p className="text-sm text-muted-foreground">
              Browse our home-style meals and fresh-cut vegetables to start your
              order.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <Link
                to="/menu"
                onClick={() => setDrawerOpen(false)}
                className="rounded-full bg-burgundy px-5 py-2.5 text-sm font-semibold text-white"
              >
                Our Meals
              </Link>
              <Link
                to="/fresh-cuts"
                onClick={() => setDrawerOpen(false)}
                className="rounded-full bg-forest px-5 py-2.5 text-sm font-semibold text-white"
              >
                Fresh Cuts
              </Link>
            </div>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-border overflow-y-auto px-5">
              {resolved.map((l) => (
                <CartLineItem key={l.key} line={l} compact />
              ))}
            </ul>
            <div className="space-y-4 border-t border-border bg-white px-5 py-5">
              <CartTotals summary={summary} />
              <Link
                to="/cart"
                onClick={() => setDrawerOpen(false)}
                className="flex h-12 items-center justify-center rounded-full bg-burgundy font-semibold text-white transition-colors hover:bg-burgundy-deep"
              >
                Checkout via WhatsApp
              </Link>
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="w-full text-center text-sm font-medium text-burgundy underline-offset-4 hover:underline"
              >
                Continue shopping
              </button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
