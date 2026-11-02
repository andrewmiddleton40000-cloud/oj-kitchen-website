import { Info } from 'lucide-react'
import { formatNaira } from '@/config/site'
import type { CartSummary } from '@/lib/order'

export function CartTotals({ summary }: { summary: CartSummary }) {
  const allPriced = summary.unpricedLines === 0
  return (
    <div className="space-y-3">
      <div className="flex items-baseline justify-between">
        <span className="text-sm text-muted-foreground">Items</span>
        <span className="font-semibold tabular-nums">{summary.itemCount}</span>
      </div>
      <div className="flex items-baseline justify-between">
        <span className="text-sm text-muted-foreground">
          Estimated subtotal
          {!allPriced && summary.pricedSubtotal > 0 ? ' (priced items)' : ''}
        </span>
        <span className="font-display text-xl font-semibold tabular-nums">
          {summary.pricedSubtotal > 0 || allPriced
            ? formatNaira(summary.pricedSubtotal)
            : 'To be confirmed'}
        </span>
      </div>
      <div className="flex items-baseline justify-between">
        <span className="text-sm text-muted-foreground">Delivery</span>
        <span className="text-sm text-muted-foreground">
          Confirmed on WhatsApp
        </span>
      </div>
      {!allPriced && (
        <p className="flex gap-2 rounded-xl bg-gold-soft/70 p-3 text-xs leading-relaxed text-foreground/80">
          <Info className="mt-0.5 size-4 shrink-0 text-burgundy" />
          {summary.unpricedLines === 1
            ? 'One item doesn’t'
            : `${summary.unpricedLines} items don’t`}{' '}
          have a listed price yet. O.J KITCHEN will confirm final prices,
          availability and delivery charges with you on WhatsApp.
        </p>
      )}
    </div>
  )
}
