# Estado actual

Actualizado: 2026-07-26.

## Capacidades

- Crea tareas con título, prioridad, tiempo estimado y estado.
- Lista y alterna tareas pendientes y completadas.
- Recomienda una tarea que cabe en el tiempo disponible y tiene la prioridad
  más alta posible.
- Permite empezar la recomendación o elegir otra equivalente.
- Guarda automáticamente las tareas web en `localStorage`.
- Conserva la interfaz de terminal y su almacenamiento JSON local.

## Arquitectura

- `src/App.tsx`: pantalla principal y gestión de tareas.
- `src/recommend.ts`: algoritmo puro de recomendación.
- `src/storage.ts`: persistencia web y validación de datos.
- `src/types.ts`: contrato de tareas.
- `selector.py`: interfaz original de terminal.
- `src/*.test.ts` y `tests/test_selector.py`: pruebas web y de terminal.
- `localStorage` y `tareas.json`: almacenamientos locales independientes.

## Verificación disponible

```bash
npm ci
npm test
npm run build
python3 -m unittest discover -s tests -v
```

Resultados del 2026-07-26:

- Vitest: 7 pruebas superadas.
- `unittest`: 8 pruebas superadas.
- Vite: compilación de producción completada.
- Los recursos compilados usan `/selector-de-tareas/assets/`.

## Publicación

- Vite usa `base: '/selector-de-tareas/'`.
- `.github/workflows/deploy-pages.yml` instala dependencias, ejecuta las pruebas,
  compila y publica `dist/` mediante GitHub Actions.
- El workflow se ejecuta al hacer push a `main` o manualmente.
- No se usa React Router; la aplicación tiene una única ruta y no necesita un
  fallback SPA para recargas.
- URL prevista: `https://oskrrr09.github.io/selector-de-tareas/`.
- Pendiente: fusionar la pull request de Pages y seleccionar **GitHub Actions**
  como fuente en Settings → Pages.

## Repositorio

- Ruta local: `/Users/oskrrr09/Proyectos/selector-de-tareas`.
- GitHub: `https://github.com/Oskrrr09/selector-de-tareas`.
- Visibilidad: pública, comprobada el 2026-07-26.
- Rama de despliegue: `codex/github-pages`.
- Base inicial publicada en `main`: `88710b0`.
- Implementación publicada en la rama: `96135c9`.
- Pull request en borrador:
  `https://github.com/Oskrrr09/selector-de-tareas/pull/1`.
- La pull request permanece abierta y no se ha fusionado.
