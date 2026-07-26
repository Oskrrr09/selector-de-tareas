# ¿Qué hago ahora?

## Objetivo

Continuar el proyecto existente con una pantalla que recomiende una tarea
pendiente según el tiempo disponible y la prioridad.

## Estado inicial

El repositorio contenía una utilidad Python de terminal, documentación
persistente y pruebas unitarias. `main` todavía no tenía un commit remoto.

## Trabajo realizado

- Publicada la base inicial necesaria en `main`.
- Creada la rama `feature/what-to-do-now` antes de cambiar el código.
- Añadida una aplicación Vite + React + TypeScript con Tailwind CSS.
- Añadida creación, listado y cambio de estado de tareas.
- Añadida recomendación por tiempo y prioridad.
- Añadida persistencia web en `localStorage`.
- Conservada y actualizada la interfaz de terminal.

## Decisiones

- Mantener web y terminal como interfaces compatibles, con almacenamiento
  independiente.
- Evitar librerías de animación porque no son necesarias para este alcance.
- Versionar la clave local como `selector-de-tareas:v1`.

## Comprobaciones

- `npm test`: 7 pruebas superadas.
- `python3 -m unittest discover -s tests -v`: 8 pruebas superadas.
- `npm run build`: compilación de producción completada.
- Navegador: flujo de alta, recomendación, prioridad, inicio, estado vacío y
  persistencia tras recarga comprobados.
- Diseño: revisión visual de escritorio y revisión de breakpoints, tamaños
  táctiles y apilado responsive para móvil completadas.

## Archivos y repositorios afectados

- Repositorio local `/Users/oskrrr09/Proyectos/selector-de-tareas`.
- Repositorio privado `https://github.com/Oskrrr09/selector-de-tareas`.
- Ficha central de Obsidian `Proyectos/selector-de-tareas/00-indice.md`.

## Pendientes y siguiente paso

Revisar el diff, crear el commit de la rama y abrir una pull request sin
fusionarla.
