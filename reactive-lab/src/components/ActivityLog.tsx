import { useStore } from '@nanostores/react'
import { $logGroups, clearLog } from '../stores/activity-log'
import './activity-log.css'

export function ActivityLog() {
  const groups = useStore($logGroups)
  return <section className="panel activity-log">
    <div className="section-heading">
      <div><span className="eyebrow">05 / TRACE</span><h2>Журнал реактивности</h2></div>
      <button className="text-button clear-button" onClick={clearLog}>Очистить</button>
    </div>
    <p className="hint">Каждая группа — одно действие. Раскройте её, чтобы увидеть путь события через Nanostores.</p>
    <div className="log-groups">
      {!groups.length && <div className="log-empty">Пока нет событий. Измените зависимость или запустите эксперимент.</div>}
      {[...groups].reverse().map(group => <details className="log-group" key={group.id} open={group.id === groups[groups.length - 1]?.id}>
        <summary><span className="log-count">{group.entries.length}</span><strong>{group.title}</strong><time>#{group.id}</time></summary>
        <ol>{group.entries.map(entry => <li key={entry.id}><span className={`log-source source-${entry.source}`}>{entry.source}</span><span className="log-message">{entry.message}</span>{entry.detail && <code>{entry.detail}</code>}</li>)}</ol>
      </details>)}
    </div>
  </section>
}
