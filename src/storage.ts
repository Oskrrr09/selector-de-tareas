import {
  ESTIMATED_TIMES,
  PRIORITIES,
  type EstimatedTime,
  type Priority,
  type Task,
  type TaskStatus,
} from './types'

export const STORAGE_KEY = 'selector-de-tareas:v1'

function isTask(value: unknown): value is Task {
  if (typeof value !== 'object' || value === null) {
    return false
  }

  const task = value as Record<string, unknown>
  return (
    typeof task.id === 'string' &&
    typeof task.title === 'string' &&
    PRIORITIES.includes(task.priority as Priority) &&
    ESTIMATED_TIMES.includes(task.estimatedMinutes as EstimatedTime) &&
    ['pendiente', 'completada'].includes(task.status as TaskStatus)
  )
}

export function loadTasks(storage: Pick<Storage, 'getItem'>): Task[] {
  const stored = storage.getItem(STORAGE_KEY)

  if (!stored) {
    return []
  }

  try {
    const parsed: unknown = JSON.parse(stored)
    return Array.isArray(parsed) ? parsed.filter(isTask) : []
  } catch {
    return []
  }
}

export function saveTasks(
  storage: Pick<Storage, 'setItem'>,
  tasks: Task[],
): void {
  storage.setItem(STORAGE_KEY, JSON.stringify(tasks))
}
