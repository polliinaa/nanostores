import { useStore } from '@nanostores/react'
import { $computeCalls, $labActive, $labDisplay, $price, $quantity, $subscriberCalls, $tax, applyInputsBatched, applyInputsSeparately, startLabSubscriber, stopLabSubscriberNow } from '../stores/cart'

export function ExperimentPanel() {
  const active = useStore($labActive)
  const calls = useStore($computeCalls)
  const subscriberCalls = useStore($subscriberCalls)
  const value = useStore($labDisplay)
  const price = useStore($price)
  const quantity = useStore($quantity)
  const tax = useStore($tax)

  return <section className="panel experiment">
    <div className="section-heading"><div><span className="eyebrow">04 / REACTIVE LAB</span><h2>Исследуйте механизм</h2></div><span className={active ? 'status active' : 'status'}><i />{active ? 'смонтирован' : 'не смонтирован'}</span></div>
    <p className="hint">Подписчик в этом блоке слушает отдельный computed. Снимите его, чтобы увидеть, что происходит без подписчиков.</p>
    <div className="metrics">
      <div><span>Вызовы computed</span><strong>{calls}</strong></div>
      <div><span>Вызовы listen</span><strong>{subscriberCalls}</strong></div>
      <div><span>Значение</span><strong>{value.toLocaleString('ru-RU', { maximumFractionDigits: 2 })} ₽</strong></div>
    </div>
    <div className="button-row">
      <button className="button primary" onClick={startLabSubscriber}>Подписать listener</button>
      <button className="button secondary" onClick={stopLabSubscriberNow}>Отписать listener</button>
    </div>
    <div className="button-row experiment-buttons">
      <button className="button secondary" onClick={applyInputsSeparately}>Изменить два atom отдельно</button>
      <button className="button secondary" onClick={applyInputsBatched}>Изменить два atom через batch</button>
    </div>
    <div className="formula"><span>Текущие зависимости</span><code>{price} × {quantity} × (1 + {tax}% / 100)</code></div>
  </section>
}
