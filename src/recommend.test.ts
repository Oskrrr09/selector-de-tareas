import { describe, expect, it } from 'vitest'

import { recommendTask } from './recommend'
import type { Task } from './types'

const tasks: Task[] = [
  {
    id: '1',
    title: 'Responder correo',
    priority: 'media',
    estimatedMinutes: 5,
    status: 'pendiente',
  },
  {
    id: '2',
    title: 'Preparar informe',
    priority: 'alta',
    estimatedMinutes: 30,
    status: 'pendiente',
  },
  {
    id: '3',
    title: 'Revisar agenda',
    priority: 'alta',
    estimatedMinutes: 15,
    status: 'completada',
  },
]

describe('recommendTask', () => {
  it('elige la prioridad más alta que cabe en el tiempo disponible', () => {
    expect(recommendTask(tasks, 30, () => 0)?.id).toBe('2')
    expect(recommendTask(tasks, 15, () => 0)?.id).toBe('1')
  })

  it('nunca recomienda tareas completadas', () => {
    expect(recommendTask(tasks, 15, () => 0)?.id).not.toBe('3')
  })

  it('devuelve null cuando ninguna tarea encaja', () => {
    const longTask: Task = {
      ...tasks[1],
      estimatedMinutes: 60,
    }

    expect(recommendTask([longTask], 30, () => 0)).toBeNull()
  })

  it('evita repetir una tarea cuando existe otra equivalente', () => {
    const equivalent: Task = {
      ...tasks[1],
      id: '4',
      title: 'Preparar reunión',
    }

    expect(recommendTask([tasks[1], equivalent], 60, () => 0, '2')?.id).toBe(
      '4',
    )
  })
})
