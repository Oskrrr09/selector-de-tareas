import { describe, expect, it } from 'vitest'

import { loadTasks, saveTasks, STORAGE_KEY } from './storage'
import type { Task } from './types'

function createMemoryStorage(initialValue: string | null = null) {
  let value = initialValue

  return {
    getItem: () => value,
    setItem: (_key: string, nextValue: string) => {
      value = nextValue
    },
    currentValue: () => value,
  }
}

describe('task storage', () => {
  it('guarda y recupera tareas válidas', () => {
    const storage = createMemoryStorage()
    const tasks: Task[] = [
      {
        id: '1',
        title: 'Probar persistencia',
        priority: 'alta',
        estimatedMinutes: 15,
        status: 'pendiente',
      },
    ]

    saveTasks(storage, tasks)

    expect(storage.currentValue()).toContain('Probar persistencia')
    expect(loadTasks(storage)).toEqual(tasks)
  })

  it('descarta datos inválidos sin bloquear la aplicación', () => {
    const storage = createMemoryStorage(
      JSON.stringify([{ id: 1, title: 'Inválida' }]),
    )

    expect(loadTasks(storage)).toEqual([])
  })

  it('usa una clave versionada', () => {
    expect(STORAGE_KEY).toBe('selector-de-tareas:v1')
  })
})
