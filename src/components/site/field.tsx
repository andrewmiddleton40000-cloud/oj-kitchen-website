import * as React from 'react'
import { cn } from '@/lib/utils'

/** Labelled form control with an optional hint and error message. */
export function Field({
  id,
  label,
  required,
  hint,
  error,
  className,
  children,
}: {
  id: string
  label: string
  required?: boolean
  hint?: string
  error?: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className={cn('space-y-1.5', className)}>
      <label
        htmlFor={id}
        className="block text-sm font-semibold text-foreground"
      >
        {label}
        {required ? (
          <span className="text-burgundy" aria-hidden>
            {' '}
            *
          </span>
        ) : (
          <span className="font-normal text-muted-foreground"> (optional)</span>
        )}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="text-xs text-muted-foreground">
          {hint}
        </p>
      )}
      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className="text-xs font-medium text-destructive"
        >
          {error}
        </p>
      )}
    </div>
  )
}

export const fieldClass =
  'block w-full rounded-xl border border-input bg-white px-4 py-3 text-base text-foreground shadow-xs transition-colors placeholder:text-muted-foreground/70 focus-visible:border-burgundy focus-visible:ring-[3px] focus-visible:ring-burgundy/20 focus-visible:outline-none aria-invalid:border-destructive aria-invalid:ring-destructive/20 motion-reduce:transition-none sm:text-sm'

/** Props that wire an input to its Field hint/error for assistive tech. */
export function describedBy(id: string, error?: string, hint?: boolean) {
  return {
    id,
    'aria-invalid': error ? true : undefined,
    'aria-describedby': error ? `${id}-error` : hint ? `${id}-hint` : undefined,
  } as const
}
