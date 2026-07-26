# Publicación en GitHub Pages

## Objetivo

Preparar “Selector de tareas” para abrirlo desde cualquier navegador mediante
GitHub Pages, sin cambiar el comportamiento de la aplicación.

## Estado inicial

- Repositorio `Oskrrr09/selector-de-tareas`, público.
- Rama principal `main`.
- Aplicación Vite + React + TypeScript sin `base` específico.
- Sin workflow de integración o despliegue.
- PR #1 abierta y sin fusionar.

## Trabajo realizado

- Creada la rama `codex/github-pages` desde la aplicación actual.
- Configurada la base Vite `/selector-de-tareas/`.
- Añadido un workflow de GitHub Actions para instalar, probar, compilar y
  desplegar `dist/`.
- Documentada la fuente de Pages y la URL pública prevista.
- Publicado el commit `bc02210` en `codex/github-pages`.
- Abierta la pull request
  `https://github.com/Oskrrr09/selector-de-tareas/pull/2`.
- Cambiada la fuente de GitHub Pages de publicación heredada desde la raíz de
  `main` a GitHub Actions.
- Fusionada la PR #2 en `main` mediante el commit `5b7e34d`.
- GitHub marcó también la PR #1 como fusionada al quedar sus commits incluidos
  en `main`.
- Publicada y verificada la aplicación en
  `https://oskrrr09.github.io/selector-de-tareas/`.

## Decisiones

- Abrir la nueva PR contra `main` para que sea autocontenida mientras la PR #1
  siga sin fusionar.
- Desplegar solo desde `main` o mediante ejecución manual.
- No añadir fallback 404 porque la aplicación no usa React Router.

## Comprobaciones

- `npm test`: 7 pruebas superadas.
- `python3 -m unittest discover -s tests -v`: 8 pruebas superadas.
- `npm run build`: compilación completada.
- `dist/index.html`: JavaScript y CSS apuntan a
  `/selector-de-tareas/assets/`.
- Workflow `30203983384`: compilación y despliegue superados.
- Comprobación HTTP sin caché: el documento publicado carga los recursos bajo
  `/selector-de-tareas/assets/`.
- Comprobación visual: la URL muestra “Decide menos. Empieza antes.”, el
  selector de tiempo y el botón “¿Qué hago ahora?”.

## Archivos y repositorios afectados

- `vite.config.ts`.
- `.github/workflows/deploy-pages.yml`.
- `README.md`, `AGENTS.md` y `docs/`.
- Repositorio `https://github.com/Oskrrr09/selector-de-tareas`.

## Pendientes y siguiente paso

La publicación está operativa y no quedan pull requests abiertas. El siguiente
paso de producto es recoger feedback sobre la experiencia.
