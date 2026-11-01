import { useStore } from '@nanostores/react'
import { $subtotal, $total } from '../stores/cart'

const money = (value: number) => `${value.toLocaleString('ru-RU', { maximumFractionDigits: 2 })} ₽`

export function ResultPanel() {
  const subtotal = useStore($subtotal)
  const total = useStore($total)
  return <section className="result-card">
    <span className="eyebrow">03 / COMPUTED</span>
    <h2>Вычисляемый результат</h2>
    <div className="result-line"><span>Сумма без налога <code>$subtotal</code></span><strong>{money(subtotal)}</strong></div>
    <div className="result-line total"><span>Итого с налогом <code>$total</code></span><strong>{money(total)}</strong></div>
    <p>Измените цену, количество или состав корзины: зависимые значения пересчитаются автоматически.</p>
  </section>
}
