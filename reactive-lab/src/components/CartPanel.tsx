import { useStore } from '@nanostores/react'
import { $items, addCurrentProduct, removeItem, updateItem } from '../stores/cart'

export function CartPanel() {
  const items = useStore($items)
  return <section className="panel">
    <div className="section-heading"><div><span className="eyebrow">01 / КОРЗИНА</span><h2>Состав заказа</h2></div><span className="pill">{items.length} поз.</span></div>
    <div className="item-list">
      {items.map(item => <article className="item-row" key={item.id}>
        <div className="item-info"><strong>{item.name}</strong><span>{item.price.toLocaleString('ru-RU')} ₽ за шт.</span></div>
        <label className="compact-input">Кол-во<input aria-label={`Количество: ${item.name}`} type="number" min="1" value={item.quantity} onChange={event => updateItem(item.id, { quantity: Number(event.target.value) })} /></label>
        <button className="icon-button" aria-label={`Удалить ${item.name}`} onClick={() => removeItem(item.id)}>×</button>
      </article>)}
      {!items.length && <p className="empty">Корзина пуста — добавьте товар из панели параметров.</p>}
    </div>
    <button className="text-button" onClick={addCurrentProduct}>＋ Добавить текущий товар</button>
  </section>
}
