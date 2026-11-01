import { atom, batch, computed, onMount } from 'nanostores'
import { recordLog, runLoggedAction } from './activity-log'

export type CartItem = {
  id: number
  name: string
  price: number
  quantity: number
}

export const $items = atom<CartItem[]>([
  { id: 1, name: 'Механическая клавиатура', price: 8900, quantity: 1 },
  { id: 2, name: 'Коврик для мыши', price: 1800, quantity: 2 }
])
export const $price = atom(8900)
export const $quantity = atom(1)
export const $tax = atom(20)

export const $subtotal = computed([$items], items => {
  recordLog('computed', 'Пересчёт $subtotal', { items: items.length })
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0)
})

export const $total = computed([$subtotal, $tax], (subtotal, tax) => {
  recordLog('computed', 'Пересчёт $total', { subtotal, tax })
  return subtotal * (1 + tax / 100)
})

export const $labActive = atom(false)
export const $computeCalls = atom(0)
export const $subscriberCalls = atom(0)
export const $labDisplay = atom(0)
export const $labValue = computed([$price, $quantity, $tax], (price, quantity, tax) => {
  // Breakpoint: inspect source values and this computed's mount state here.
  recordLog('computed', 'Пересчёт $labValue', { price, quantity, tax })
  $computeCalls.set($computeCalls.get() + 1)
  return price * quantity * (1 + tax / 100)
})

// The lifecycle counter records activation/cleanup without keeping the store mounted.
onMount($labValue, () => {
  recordLog('lifecycle', '$labValue смонтирован; подписка на источники активна')
  $labActive.set(true)
  return () => {
    recordLog('lifecycle', '$labValue размонтирован; подписки на источники сняты')
    $labActive.set(false)
  }
})

let stopLabSubscriber: (() => void) | undefined

export function startLabSubscriber() {
  runLoggedAction('Подписать listener на $labValue', () => {
    if (stopLabSubscriber) {
      recordLog('action', 'Listener уже подписан')
      return
    }
    stopLabSubscriber = $labValue.listen(value => {
      recordLog('listen', 'Получено обновление $labValue', value)
      $subscriberCalls.set($subscriberCalls.get() + 1)
      $labDisplay.set(value)
    })
    // atom.listen does not emit the current value, so seed the display explicitly.
    $labDisplay.set($labValue.get())
    recordLog('action', 'Listener подписан')
  })
}

export function stopLabSubscriberNow() {
  runLoggedAction('Отписать listener от $labValue', () => {
    stopLabSubscriber?.()
    stopLabSubscriber = undefined
    recordLog('action', 'Listener отписан; lifecycle завершится после задержки Nanostores')
  })
}

export function setPrice(value: number) {
  runLoggedAction('Изменить цену', () => $price.set(Math.max(0, value)))
}

export function setQuantity(value: number) {
  runLoggedAction('Изменить количество', () => $quantity.set(Math.max(1, value)))
}

export function setTax(value: number) {
  runLoggedAction('Изменить налог', () => $tax.set(Math.min(100, Math.max(0, value))))
}

export function addCurrentProduct() {
  runLoggedAction('Добавить товар', () => {
  const price = $price.get()
  const quantity = $quantity.get()
  const items = $items.get()
  const item: CartItem = {
    id: Math.max(0, ...items.map(existing => existing.id)) + 1,
    name: `Товар ${items.length + 1}`,
    price,
    quantity
  }
  recordLog('action', 'Добавлен товар', item)
  $items.set([...items, item])
  })
}

export function removeItem(id: number) {
  runLoggedAction('Удалить товар', () => {
    recordLog('action', 'Удаляется товар', { id })
    $items.set($items.get().filter(item => item.id !== id))
  })
}

export function updateItem(id: number, patch: Partial<Pick<CartItem, 'price' | 'quantity'>>) {
  runLoggedAction('Изменить товар в корзине', () => {
    recordLog('action', 'Обновляются поля товара', { id, patch })
    $items.set($items.get().map(item => item.id === id ? { ...item, ...patch } : item))
  })
}

export function applyInputsSeparately() {
  runLoggedAction('Два изменения без batch', () => {
    recordLog('demo', 'Цена и количество изменяются по очереди')
    setPrice($price.get() + 100)
    setQuantity($quantity.get() + 1)
  })
}

export function applyInputsBatched() {
  runLoggedAction('Два изменения внутри batch', () => {
    batch(() => {
      setPrice($price.get() + 100)
      setQuantity($quantity.get() + 1)
    })
  })
}
