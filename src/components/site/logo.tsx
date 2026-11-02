import { Link } from '@tanstack/react-router'
import { cn } from '@/lib/utils'

/** O.J KITCHEN logo: Chef OJ emblem + wordmark. Replace /img/logo-emblem.png to update. */
export function Logo({
  className,
  tone = 'dark',
}: {
  className?: string
  tone?: 'dark' | 'light'
}) {
  return (
    <Link
      to="/"
      className={cn(
        'group inline-flex items-center gap-2.5 rounded-md',
        className,
      )}
      aria-label="O.J KITCHEN — home"
    >
      <img
        src="/.netlify/images?url=/img/logo-emblem.png&w=112&fm=webp"
        alt=""
        width={44}
        height={49}
        className="h-11 w-auto drop-shadow-sm transition-transform duration-300 group-hover:-rotate-3 motion-reduce:transition-none"
      />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            'font-display text-[1.35rem] font-semibold tracking-tight',
            tone === 'dark' ? 'text-burgundy' : 'text-white',
          )}
        >
          O.J KITCHEN
        </span>
        <span
          className={cn(
            'mt-1 text-[0.6rem] font-semibold uppercase tracking-[0.24em]',
            tone === 'dark' ? 'text-muted-foreground' : 'text-gold',
          )}
        >
          Cooking your cravings
        </span>
      </span>
    </Link>
  )
}
