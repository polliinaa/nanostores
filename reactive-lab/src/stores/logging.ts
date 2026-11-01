import { $items, $price, $quantity, $tax, $subtotal, $total } from './cart'
import { recordLog } from './activity-log'

// Development-oriented trace: useful to follow source -> computed -> subscriber.
$price.listen((value, oldValue) => recordLog('atom', '$price изменился', { oldValue, value }))
$quantity.listen((value, oldValue) => recordLog('atom', '$quantity изменился', { oldValue, value }))
$tax.listen((value, oldValue) => recordLog('atom', '$tax изменился', { oldValue, value }))
$items.listen((value, oldValue) => recordLog('atom', '$items изменился', { oldCount: oldValue?.length ?? 0, count: value.length }))
$subtotal.listen((value, oldValue) => recordLog('subscribe', '$subtotal обновился', { oldValue, value }))
$total.listen((value, oldValue) => recordLog('subscribe', '$total обновился', { oldValue, value }))
