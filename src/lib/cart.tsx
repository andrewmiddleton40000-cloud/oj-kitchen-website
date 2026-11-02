import * as React from 'react'
import { lineKey, resolveLines, summarise, type CartLine } from '@/lib/order'

const STORAGE_KEY = 'oj-kitchen-cart-v1'

interface CartContextValue {
  lines: CartLine[]
  resolved: ReturnType<typeof resolveLines>
  summary: ReturnType<typeof summarise>
  ready: boolean
  add: (productId: string, quantity?: number, size?: string) => void
  setQuantity: (key: string, quantity: number) => void
  changeSize: (key: string, size: string) => void
  remove: (key: string) => void
  clear: () => void
  drawerOpen: boolean
  setDrawerOpen: (open: boolean) => void
}

const CartContext = React.createContext<CartContextValue | null>(null)

function isLine(v: unknown): v is CartLine {
  if (!v || typeof v !== 'object') return false
  const o = v as Record<string, unknown>
  return (
    typeof o.productId === 'string' &&
    typeof o.quantity === 'number' &&
    (o.size === undefined || typeof o.size === 'string')
  )
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = React.useState<CartLine[]>([])
  const [ready, setReady] = React.useState(false)
  const [drawerOpen, setDrawerOpen] = React.useState(false)

  // Load from localStorage after mount (avoids SSR hydration mismatch)
  React.useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed: unknown = JSON.parse(raw)
        // eslint-disable-next-line react-hooks/set-state-in-effect -- localStorage must be read after mount to avoid hydration mismatches
        if (Array.isArray(parsed)) setLines(parsed.filter(isLine))
      }
    } catch {
      /* ignore corrupt storage */
    }
    setReady(true)
  }, [])

  React.useEffect(() => {
    if (!ready) return
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines))
    } catch {
      /* storage may be unavailable (private mode) */
    }
  }, [lines, ready])

  // Keep tabs in sync
  React.useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key !== STORAGE_KEY) return
      try {
        const parsed: unknown = e.newValue ? JSON.parse(e.newValue) : []
        if (Array.isArray(parsed)) setLines(parsed.filter(isLine))
      } catch {
        /* ignore */
      }
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const add = React.useCallback(
    (productId: string, quantity = 1, size?: string) => {
      setLines((prev) => {
        const key = lineKey(productId, size)
        const existing = prev.find((l) => lineKey(l.productId, l.size) === key)
        if (existing) {
          return prev.map((l) =>
            l === existing
              ? { ...l, quantity: Math.min(99, l.quantity + quantity) }
              : l,
          )
        }
        return [...prev, { productId, size, quantity: Math.min(99, quantity) }]
      })
    },
    [],
  )

  const setQuantity = React.useCallback((key: string, quantity: number) => {
    setLines((prev) =>
      quantity < 1
        ? prev.filter((l) => lineKey(l.productId, l.size) !== key)
        : prev.map((l) =>
            lineKey(l.productId, l.size) === key
              ? { ...l, quantity: Math.min(99, quantity) }
              : l,
          ),
    )
  }, [])

  const changeSize = React.useCallback((key: string, size: string) => {
    setLines((prev) => {
      const line = prev.find((l) => lineKey(l.productId, l.size) === key)
      if (!line || line.size === size) return prev
      const targetKey = lineKey(line.productId, size)
      const target = prev.find(
        (l) => lineKey(l.productId, l.size) === targetKey,
      )
      if (target) {
        // merge into the existing line for that size
        return prev
          .filter((l) => l !== line)
          .map((l) =>
            l === target
              ? { ...l, quantity: Math.min(99, l.quantity + line.quantity) }
              : l,
          )
      }
      return prev.map((l) => (l === line ? { ...l, size } : l))
    })
  }, [])

  const remove = React.useCallback((key: string) => {
    setLines((prev) => prev.filter((l) => lineKey(l.productId, l.size) !== key))
  }, [])

  const clear = React.useCallback(() => setLines([]), [])

  const resolved = React.useMemo(() => resolveLines(lines), [lines])
  const summary = React.useMemo(() => summarise(resolved), [resolved])

  const value = React.useMemo(
    () => ({
      lines,
      resolved,
      summary,
      ready,
      add,
      setQuantity,
      changeSize,
      remove,
      clear,
      drawerOpen,
      setDrawerOpen,
    }),
    [
      lines,
      resolved,
      summary,
      ready,
      add,
      setQuantity,
      changeSize,
      remove,
      clear,
      drawerOpen,
    ],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = React.useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>')
  return ctx
}
