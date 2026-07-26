import { type FormEvent, useEffect, useMemo, useState } from 'react'

import { recommendTask } from './recommend'
import { loadTasks, saveTasks } from './storage'
import {
  ESTIMATED_TIMES,
  PRIORITIES,
  type EstimatedTime,
  type Priority,
  type Task,
} from './types'

const PRIORITY_LABELS: Record<Priority, string> = {
  alta: 'Alta',
  media: 'Media',
  baja: 'Baja',
}

const PRIORITY_STYLES: Record<Priority, string> = {
  alta: 'bg-red-100 text-red-800',
  media: 'bg-amber-100 text-amber-800',
  baja: 'bg-sky-100 text-sky-800',
}

function createTaskId(): string {
  return globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`
}

function App() {
  const [tasks, setTasks] = useState<Task[]>(() =>
    loadTasks(window.localStorage),
  )
  const [title, setTitle] = useState('')
  const [priority, setPriority] = useState<Priority>('media')
  const [estimatedMinutes, setEstimatedMinutes] =
    useState<EstimatedTime>(15)
  const [availableMinutes, setAvailableMinutes] =
    useState<EstimatedTime>(15)
  const [recommendation, setRecommendation] = useState<Task | null>(null)
  const [hasRequestedRecommendation, setHasRequestedRecommendation] =
    useState(false)
  const [startedTaskId, setStartedTaskId] = useState<string | null>(null)

  useEffect(() => {
    saveTasks(window.localStorage, tasks)
  }, [tasks])

  const pendingCount = useMemo(
    () => tasks.filter((task) => task.status === 'pendiente').length,
    [tasks],
  )

  function addTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const cleanTitle = title.trim()

    if (!cleanTitle) {
      return
    }

    setTasks((current) => [
      {
        id: createTaskId(),
        title: cleanTitle,
        priority,
        estimatedMinutes,
        status: 'pendiente',
      },
      ...current,
    ])
    setTitle('')
  }

  function requestRecommendation(chooseAnother = false) {
    const next = recommendTask(
      tasks,
      availableMinutes,
      Math.random,
      chooseAnother ? recommendation?.id : undefined,
    )
    setRecommendation(next)
    setHasRequestedRecommendation(true)
    setStartedTaskId(null)
  }

  function toggleTask(taskId: string) {
    setTasks((current) =>
      current.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status:
                task.status === 'pendiente' ? 'completada' : 'pendiente',
            }
          : task,
      ),
    )

    if (recommendation?.id === taskId) {
      setRecommendation(null)
      setHasRequestedRecommendation(false)
      setStartedTaskId(null)
    }
  }

  return (
    <main className="min-h-screen px-4 py-6 sm:px-6 sm:py-10">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex flex-col gap-4 border-b border-line pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-xs font-bold tracking-[0.18em] text-moss uppercase">
              Selector de tareas
            </p>
            <h1 className="max-w-2xl text-4xl leading-[1.05] font-semibold tracking-[-0.04em] sm:text-6xl">
              Decide menos.
              <br />
              Empieza antes.
            </h1>
          </div>
          <p className="max-w-xs text-sm leading-6 text-ink/65">
            {pendingCount === 1
              ? 'Tienes 1 tarea pendiente.'
              : `Tienes ${pendingCount} tareas pendientes.`}
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
          <section className="rounded-3xl bg-moss p-5 text-white shadow-[0_24px_70px_rgba(49,92,67,0.2)] sm:p-8">
            <p className="text-sm font-semibold text-lime-soft">
              Una decisión para este momento
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-[-0.03em]">
              ¿Qué hago ahora?
            </h2>

            <div className="mt-7 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
              <label className="grid gap-2 text-sm font-semibold">
                Tiempo disponible
                <select
                  className="min-h-12 rounded-xl border border-white/20 bg-white px-4 text-ink"
                  value={availableMinutes}
                  onChange={(event) =>
                    setAvailableMinutes(
                      Number(event.target.value) as EstimatedTime,
                    )
                  }
                >
                  {ESTIMATED_TIMES.map((minutes) => (
                    <option key={minutes} value={minutes}>
                      {minutes} minutos
                    </option>
                  ))}
                </select>
              </label>
              <button
                className="min-h-12 rounded-xl bg-lime-soft px-6 font-bold text-moss-dark transition-transform hover:-translate-y-0.5 active:translate-y-0"
                type="button"
                onClick={() => requestRecommendation()}
              >
                ¿Qué hago ahora?
              </button>
            </div>

            <div className="mt-6" aria-live="polite">
              {recommendation ? (
                <article className="rounded-2xl bg-white p-5 text-ink sm:p-6">
                  <p className="text-xs font-bold tracking-[0.15em] text-moss uppercase">
                    Tu siguiente tarea
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold tracking-[-0.02em]">
                    {recommendation.title}
                  </h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${PRIORITY_STYLES[recommendation.priority]}`}
                    >
                      Prioridad {PRIORITY_LABELS[recommendation.priority]}
                    </span>
                    <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-bold text-stone-700">
                      {recommendation.estimatedMinutes} minutos
                    </span>
                  </div>
                  {startedTaskId === recommendation.id && (
                    <p className="mt-4 rounded-xl bg-lime-soft px-4 py-3 text-sm font-semibold text-moss-dark">
                      En marcha. Concéntrate solo en esto.
                    </p>
                  )}
                  <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                    <button
                      className="min-h-11 rounded-xl bg-moss px-5 font-bold text-white hover:bg-moss-dark"
                      type="button"
                      onClick={() => setStartedTaskId(recommendation.id)}
                    >
                      Empezar
                    </button>
                    <button
                      className="min-h-11 rounded-xl border border-line px-5 font-bold text-ink hover:bg-stone-100"
                      type="button"
                      onClick={() => requestRecommendation(true)}
                    >
                      Elegir otra
                    </button>
                  </div>
                </article>
              ) : hasRequestedRecommendation ? (
                <p className="rounded-2xl border border-white/20 bg-white/10 p-5 font-semibold">
                  No tienes tareas pendientes que encajen en ese tiempo
                </p>
              ) : (
                <p className="rounded-2xl border border-white/15 p-5 text-sm leading-6 text-white/75">
                  Ajusta el tiempo y te propondremos la tarea pendiente de mayor
                  prioridad que puedas completar.
                </p>
              )}
            </div>
          </section>

          <section className="rounded-3xl border border-line bg-white/65 p-5 sm:p-8">
            <h2 className="text-2xl font-semibold tracking-[-0.03em]">
              Nueva tarea
            </h2>
            <form className="mt-6 grid gap-4" onSubmit={addTask}>
              <label className="grid gap-2 text-sm font-semibold">
                Título
                <input
                  className="min-h-12 rounded-xl border border-line bg-white px-4 placeholder:text-ink/35"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  placeholder="Ej. Preparar el informe"
                  required
                />
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label className="grid gap-2 text-sm font-semibold">
                  Prioridad
                  <select
                    className="min-h-12 rounded-xl border border-line bg-white px-3"
                    value={priority}
                    onChange={(event) =>
                      setPriority(event.target.value as Priority)
                    }
                  >
                    {PRIORITIES.map((value) => (
                      <option key={value} value={value}>
                        {PRIORITY_LABELS[value]}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="grid gap-2 text-sm font-semibold">
                  Tiempo
                  <select
                    className="min-h-12 rounded-xl border border-line bg-white px-3"
                    value={estimatedMinutes}
                    onChange={(event) =>
                      setEstimatedMinutes(
                        Number(event.target.value) as EstimatedTime,
                      )
                    }
                  >
                    {ESTIMATED_TIMES.map((minutes) => (
                      <option key={minutes} value={minutes}>
                        {minutes} min
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <button
                className="min-h-12 rounded-xl bg-ink px-5 font-bold text-white hover:bg-moss-dark"
                type="submit"
              >
                Añadir tarea
              </button>
            </form>
          </section>
        </div>

        <section className="mt-6 rounded-3xl border border-line bg-white/65 p-5 sm:p-8">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-2xl font-semibold tracking-[-0.03em]">
              Tus tareas
            </h2>
            <span className="text-sm text-ink/55">{tasks.length} en total</span>
          </div>

          {tasks.length === 0 ? (
            <p className="mt-6 rounded-2xl border border-dashed border-line p-8 text-center text-sm text-ink/55">
              Añade tu primera tarea para recibir una recomendación.
            </p>
          ) : (
            <ul className="mt-5 grid gap-3">
              {tasks.map((task) => (
                <li
                  key={task.id}
                  className="flex items-start gap-3 rounded-2xl border border-line bg-white p-4"
                >
                  <input
                    className="mt-1 size-5 accent-moss"
                    type="checkbox"
                    checked={task.status === 'completada'}
                    onChange={() => toggleTask(task.id)}
                    aria-label={`Marcar “${task.title}” como ${
                      task.status === 'pendiente'
                        ? 'completada'
                        : 'pendiente'
                    }`}
                  />
                  <div className="min-w-0 flex-1">
                    <p
                      className={`font-semibold ${
                        task.status === 'completada'
                          ? 'text-ink/40 line-through'
                          : ''
                      }`}
                    >
                      {task.title}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2 text-xs font-bold">
                      <span
                        className={`rounded-full px-2.5 py-1 ${PRIORITY_STYLES[task.priority]}`}
                      >
                        {PRIORITY_LABELS[task.priority]}
                      </span>
                      <span className="rounded-full bg-stone-100 px-2.5 py-1 text-stone-600">
                        {task.estimatedMinutes} min
                      </span>
                      <span className="rounded-full bg-stone-100 px-2.5 py-1 text-stone-600">
                        {task.status === 'pendiente'
                          ? 'Pendiente'
                          : 'Completada'}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  )
}

export default App
