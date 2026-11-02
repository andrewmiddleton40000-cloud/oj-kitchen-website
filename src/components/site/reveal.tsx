import * as React from 'react'
import { cn } from '@/lib/utils'

/** Fades content up gently when it scrolls into view. */
export function Reveal({
  as: Tag = 'div',
  className,
  delay = 0,
  children,
  ...rest
}: {
  as?: React.ElementType
  className?: string
  delay?: number
  children: React.ReactNode
} & React.HTMLAttributes<HTMLElement>) {
  const ref = React.useRef<HTMLElement>(null)
  const [visible, setVisible] = React.useState(false)

  React.useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true)
          io.disconnect()
        }
      },
      { rootMargin: '0px 0px -8% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      className={cn('reveal', visible && 'is-visible', className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  )
}
