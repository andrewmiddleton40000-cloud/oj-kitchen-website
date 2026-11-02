import { Minus, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'

export function QuantityStepper({
  value,
  onChange,
  min = 1,
  label,
  size = 'md',
  className,
}: {
  value: number
  onChange: (n: number) => void
  min?: number
  label: string
  size?: 'sm' | 'md'
  className?: string
}) {
  const btn = size === 'sm' ? 'size-8' : 'size-10'
  return (
    <div
      role="group"
      aria-label={`Quantity for ${label}`}
      className={cn(
        'inline-flex items-center rounded-full border border-input bg-white',
        className,
      )}
    >
      <button
        type="button"
        className={cn(
          btn,
          'grid place-items-center rounded-full text-foreground transition-colors hover:bg-muted disabled:opacity-40',
        )}
        onClick={() => onChange(value - 1)}
        disabled={value <= min}
        aria-label={`Decrease quantity of ${label}`}
      >
        <Minus className="size-4" />
      </button>
      <span
        className={cn(
          'min-w-8 text-center font-semibold tabular-nums',
          size === 'sm' && 'text-sm',
        )}
        aria-live="polite"
      >
        {value}
      </span>
      <button
        type="button"
        className={cn(
          btn,
          'grid place-items-center rounded-full text-foreground transition-colors hover:bg-muted disabled:opacity-40',
        )}
        onClick={() => onChange(value + 1)}
        disabled={value >= 99}
        aria-label={`Increase quantity of ${label}`}
      >
        <Plus className="size-4" />
      </button>
    </div>
  )
}
