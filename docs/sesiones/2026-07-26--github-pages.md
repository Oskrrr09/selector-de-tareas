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

## Archivos y repositorios afectados

- `vite.config.ts`.
- `.github/workflows/deploy-pages.yml`.
- `README.md`, `AGENTS.md` y `docs/`.
- Repositorio `https://github.com/Oskrrr09/selector-de-tareas`.

## Pendientes y siguiente paso

Abrir la pull request sin fusionarla. Tras su fusión, seleccionar
**GitHub Actions** en Settings → Pages y comprobar la URL pública.
