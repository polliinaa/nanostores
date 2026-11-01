import { CartPanel } from './components/CartPanel'
import { ControlsPanel } from './components/ControlsPanel'
import { ExperimentPanel } from './components/ExperimentPanel'
import { ActivityLog } from './components/ActivityLog'
import { ResultPanel } from './components/ResultPanel'
import './stores/logging'

export default function App() {
  return <main className="shell">
    <header className="topbar"><a className="brand" href="#"><span className="brand-mark">N</span><span>NANOSTORES <b>REACTIVE LAB</b></span></a><span className="version">v1.5.5 · INTERACTIVE DEMO</span></header>
    <section className="hero"><div><span className="eyebrow">STATE → DERIVATION → UI</span><h1>Состояние,<br /><em>которое реагирует.</em></h1><p>Интерактивная лаборатория реактивных хранилищ. Меняйте зависимости и наблюдайте, как Nanostores проводит обновление через приложение.</p></div><div className="hero-diagram"><span>atom</span><i>→</i><span className="highlight">computed</span><i>→</i><span>React</span><small>поток данных</small></div></section>
    <div className="layout"><div className="main-column"><CartPanel /><ControlsPanel /><ExperimentPanel /></div><aside><ResultPanel /><div className="console-note"><span className="console-icon">↗</span><div><strong>Следите за потоком</strong><p>Ниже каждое действие собрано в раскрываемую группу логов.</p></div></div></aside></div>
    <ActivityLog />
    <footer><span>Nanostores Reactive Lab</span><span>Stores own the state · React renders it</span></footer>
  </main>
}
