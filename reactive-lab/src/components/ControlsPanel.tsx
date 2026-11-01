import { useStore } from '@nanostores/react'
import { $price, $quantity, $tax, setPrice, setQuantity, setTax } from '../stores/cart'

export function ControlsPanel() {
  const price = useStore($price)
  const quantity = useStore($quantity)
  const tax = useStore($tax)
  return <section className="panel">
    <div className="section-heading"><div><span className="eyebrow">02 / ЗАВИСИМОСТИ</span><h2>Исходные атомы</h2></div><span className="live-dot">LIVE</span></div>
    <div className="control-grid">
      <label>Цена товара <span className="input-wrap"><input type="number" min="0" value={price} onChange={event => setPrice(Number(event.target.value))} /><b>₽</b></span></label>
      <label>Количество <span className="input-wrap"><input type="number" min="1" value={quantity} onChange={event => setQuantity(Number(event.target.value))} /><b>шт.</b></span></label>
      <label>Налог <span className="input-wrap"><input type="number" min="0" max="100" value={tax} onChange={event => setTax(Number(event.target.value))} /><b>%</b></span></label>
    </div>
    <p className="hint">Поменяйте любое поле и проследите цепочку пересчёта в панели эксперимента и консоли.</p>
  </section>
}
