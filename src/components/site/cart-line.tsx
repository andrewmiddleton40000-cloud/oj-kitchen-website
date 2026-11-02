import { Trash2 } from 'lucide-react'
import { img } from '@/config/site'
import { useCart } from '@/lib/cart'
import type { ResolvedLine } from '@/lib/order'
import { QuantityStepper } from './quantity'
import { PriceLabel } from './product-card'
import { cn } from '@/lib/utils'

export function CartLineItem({
  line,
  compact,
}: {
  line: ResolvedLine
  compact?: boolean
}) {
  const { setQuantity, remove, changeSize } = useCart()
  const p = line.product
  const sizes = p.sizes ?? []
  return (
    <li className="flex gap-4 py-4">
      <img
        src={img(p.image, 160, 160)}
        alt=""
        width={80}
        height={80}
        loading="lazy"
        className={cn(
          'shrink-0 rounded-xl object-cover',
          compact ? 'size-16' : 'size-20 sm:size-24',
        )}
      />
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p
              className={cn(
                'eyebrow !text-[0.6rem]',
                p.brand === 'fresh' ? 'text-forest' : 'text-burgundy',
              )}
            >
              {p.brand === 'fresh' ? 'OJ Fresh Cuts' : 'O.J KITCHEN'}
            </p>
            <p className="truncate font-display text-lg leading-tight font-semibold">
              {p.name}
            </p>
          </div>
          <button
            type="button"
            onClick={() => remove(line.key)}
            className="-mt-1 -mr-1 grid size-9 shrink-0 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-destructive"
            aria-label={`Remove ${p.name}${line.size ? ` ${line.size}` : ''} from cart`}
          >
            <Trash2 className="size-4" />
          </button>
        </div>

        {sizes.length > 0 && (
          <label className="mt-1.5 flex items-center gap-2 text-xs text-muted-foreground">
            Size
            <select
              value={line.size}
              onChange={(e) => changeSize(line.key, e.target.value)}
              className="rounded-md border border-input bg-white px-2 py-1 text-xs font-semibold text-foreground"
              aria-label={`Packaging size for ${p.name}`}
            >
              {sizes.map((s) => (
                <option key={s.label} value={s.label}>
                  {s.label}
                </option>
              ))}
            </select>
          </label>
        )}

        <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
          <QuantityStepper
            size="sm"
            value={line.quantity}
            onChange={(n) => setQuantity(line.key, n)}
            label={p.name}
          />
          <div className="text-right">
            {line.lineTotal === null ? (
              <PriceLabel price={null} className="text-xs" />
            ) : (
              <PriceLabel price={line.lineTotal} />
            )}
          </div>
        </div>
      </div>
    </li>
  )
}
