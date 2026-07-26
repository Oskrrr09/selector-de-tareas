import type { EstimatedTime, Priority, Task } from './types'

const PRIORITY_RANK: Record<Priority, number> = {
  alta: 3,
  media: 2,
  baja: 1,
}

export function recommendTask(
  tasks: Task[],
  availableMinutes: EstimatedTime,
  random: () => number = Math.random,
  excludedTaskId?: string,
): Task | null {
  const compatible = tasks.filter(
    (task) =>
      task.status === 'pendiente' &&
      task.estimatedMinutes <= availableMinutes,
  )

  if (compatible.length === 0) {
    return null
  }

  const highestRank = Math.max(
    ...compatible.map((task) => PRIORITY_RANK[task.priority]),
  )
  const highestPriority = compatible.filter(
    (task) => PRIORITY_RANK[task.priority] === highestRank,
  )
  const alternatives = highestPriority.filter(
    (task) => task.id !== excludedTaskId,
  )
  const pool = alternatives.length > 0 ? alternatives : highestPriority
  const index = Math.min(Math.floor(random() * pool.length), pool.length - 1)

  return pool[index]
}
