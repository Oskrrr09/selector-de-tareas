export const PRIORITIES = ['alta', 'media', 'baja'] as const
export const ESTIMATED_TIMES = [5, 15, 30, 60] as const

export type Priority = (typeof PRIORITIES)[number]
export type EstimatedTime = (typeof ESTIMATED_TIMES)[number]
export type TaskStatus = 'pendiente' | 'completada'

export interface Task {
  id: string
  title: string
  priority: Priority
  estimatedMinutes: EstimatedTime
  status: TaskStatus
}
