import * as React from 'react'
import { Check, ShoppingBag } from 'lucide-react'
import { toast } from 'sonner'
import type { Product } from '@/data/products'
import { formatNaira, img } from '@/config/site'
import { unitPriceFor } from '@/lib/order'
import { useCart } from '@/lib/cart'
import { QuantityStepper } from './quantity'
import { cn } from '@/lib/utils'

export function PriceLabel({
  price,
  className,
}: {
  price: number | null
  className?: string
}) {
  return price === null ? (
    <span
      className={cn(
        'text-sm font-medium text-muted-foreground italic',
        className,
      )}
    >
      Price to be confirmed
    </span>
  ) : (
    <span
      className={cn('font-semibold text-foreground tabular-nums', className)}
    >
      {formatNaira(price)}
    </span>
  )
}

export function ProductCard({
  product,
  priority,
}: {
  product: Product
  priority?: boolean
}) {
  const { add, setDrawerOpen } = useCart()
  const isFresh = product.brand === 'fresh'
  const sizes = product.sizes ?? []
  const [size, setSize] = React.useState<string | undefined>(sizes[0]?.label)
  const [qty, setQty] = React.useState(1)
  const [added, setAdded] = React.useState(false)
  const groupId = React.useId()

  const price = unitPriceFor(product, size)

  function handleAdd() {
    if (sizes.length && !size) return
    add(product.id, qty, size)
    setAdded(true)
    window.setTimeout(() => setAdded(false), 1600)
    toast.success(
      `${product.name}${size ? ` (${size})` : ''} added to your cart`,
      {
        description: `Quantity: ${qty}`,
        action: { label: 'View cart', onClick: () => setDrawerOpen(true) },
      },
    )
    setQty(1)
  }

  return (
    <article
      id={product.id}
      className="group flex scroll-mt-32 flex-col overflow-hidden rounded-2xl bg-card shadow-[0_1px_0_rgba(0,0,0,0.04),0_12px_32px_-20px_rgba(74,9,11,0.35)] ring-1 ring-border/70"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={img(product.image, 640, 480)}
          srcSet={`${img(product.image, 420, 315)} 420w, ${img(product.image, 640, 480)} 640w, ${img(product.image, 960, 720)} 960w`}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          alt={product.name}
          width={640}
          height={480}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          className="size-full object-cover transition-transform duration-700 group-hover:scale-[1.04] motion-reduce:transition-none"
        />
        {product.tag && (
          <span
            className={cn(
              'absolute top-3 left-3 rounded-full px-3 py-1 text-[0.7rem] font-semibold tracking-wide',
              isFresh ? 'bg-forest text-white' : 'bg-gold text-burgundy-deep',
            )}
          >
            {product.tag}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-xl font-semibold text-foreground">
          {product.name}
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
          {product.description}
        </p>

        {sizes.length > 0 && (
          <fieldset className="mt-4">
            <legend
              id={groupId}
              className="mb-2 text-xs font-semibold tracking-wide text-foreground/70 uppercase"
            >
              Bowl / bucket size
            </legend>
            <div
              className="flex flex-wrap gap-1.5"
              role="radiogroup"
              aria-labelledby={groupId}
            >
              {sizes.map((s) => {
                const active = s.label === size
                return (
                  <button
                    key={s.label}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    onClick={() => setSize(s.label)}
                    className={cn(
                      'rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors',
                      active
                        ? 'border-burgundy bg-burgundy text-white'
                        : 'border-input bg-white text-foreground hover:border-burgundy/50',
                    )}
                  >
                    {s.label}
                  </button>
                )
              })}
            </div>
          </fieldset>
        )}

        <div className="mt-auto pt-5">
          <div className="mb-4 flex items-baseline justify-between gap-2 border-t border-dashed border-border pt-4">
            <PriceLabel price={price} />
            {sizes.length > 0 && (
              <span className="text-xs text-muted-foreground">
                Size availability confirmed on WhatsApp
              </span>
            )}
          </div>
          <div className="flex items-center gap-3">
            <QuantityStepper
              value={qty}
              onChange={setQty}
              label={product.name}
            />
            <button
              type="button"
              onClick={handleAdd}
              className={cn(
                'inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-full px-4 text-sm font-semibold text-white transition-colors focus-visible:ring-[3px] focus-visible:ring-gold/60 focus-visible:outline-none',
                isFresh
                  ? 'bg-forest hover:bg-forest-deep'
                  : 'bg-burgundy hover:bg-burgundy-deep',
              )}
            >
              {added ? (
                <Check className="size-4" />
              ) : (
                <ShoppingBag className="size-4" />
              )}
              {added ? 'Added' : 'Add to cart'}
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}
