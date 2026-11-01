import { atom } from 'nanostores'

export type LogEntry = { id: number; source: string; message: string; detail?: string }
export type LogGroup = { id: number; title: string; entries: LogEntry[] }

export const $logGroups = atom<LogGroup[]>([])
let activeGroup: LogGroup | undefined
let nextId = 1

export function recordLog(source: string, message: string, detail?: unknown) {
  const entry: LogEntry = {
    id: nextId++,
    source,
    message,
    detail: detail === undefined ? undefined : typeof detail === 'string' ? detail : JSON.stringify(detail)
  }
  if (activeGroup) {
    activeGroup = { ...activeGroup, entries: [...activeGroup.entries, entry] }
    $logGroups.set($logGroups.get().map(group => group.id === activeGroup?.id ? activeGroup : group))
    return
  }
  $logGroups.set([...$logGroups.get(), { id: nextId++, title: 'Событие lifecycle', entries: [entry] }])
}

export function runLoggedAction<T>(title: string, action: () => T): T {
  if (activeGroup) return action()
  const group: LogGroup = { id: nextId++, title, entries: [] }
  activeGroup = group
  try {
    return action()
  } finally {
    const completedGroup = activeGroup
    activeGroup = undefined
    const groups = [...$logGroups.get(), completedGroup ?? group]
    $logGroups.set(groups.slice(-40))
  }
}

export function clearLog() {
  $logGroups.set([])
}
