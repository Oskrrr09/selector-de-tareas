# Decisiones

## SEL-001 — Aplicación de terminal

- Fecha: 2026-07-26.
- Estado: aceptada.
- Decisión: usar una interfaz de terminal para mantener pequeña la prueba.
- Evidencia: los comandos están implementados con `argparse` en `selector.py`.

## SEL-002 — Solo biblioteca estándar

- Fecha: 2026-07-26.
- Estado: reemplazada por SEL-004 para la interfaz web; vigente para terminal.
- Decisión: no añadir dependencias externas.
- Motivo: simplifica la ejecución y concentra la prueba en el flujo documental.

## SEL-003 — Datos locales no versionados

- Fecha: 2026-07-26.
- Estado: aceptada.
- Decisión: guardar las tareas en `tareas.json` e ignorar ese archivo en Git.
- Motivo: una lista personal no debe publicarse accidentalmente.

## SEL-004 — Interfaz web local

- Fecha: 2026-07-26.
- Estado: aceptada.
- Decisión: añadir Vite, React, TypeScript y Tailwind CSS para ofrecer una
  pantalla principal responsive.
- Motivo: la función solicitada necesita interacción visual y persistencia en
  navegador; no se añaden Motion, GSAP ni Lenis porque no aportan al alcance.

## SEL-005 — Orden de recomendación

- Fecha: 2026-07-26.
- Estado: aceptada.
- Decisión: filtrar primero por estado pendiente y tiempo disponible, conservar
  después la prioridad máxima y elegir al azar entre los empates.
- Evidencia: `src/recommend.ts` y `selector.py`.

## SEL-006 — Persistencia web versionada

- Fecha: 2026-07-26.
- Estado: aceptada.
- Decisión: guardar las tareas web en la clave
  `selector-de-tareas:v1` de `localStorage`.
- Motivo: preservar los datos al recargar sin introducir un backend.

## SEL-007 — Publicación bajo la subruta del repositorio

- Fecha: 2026-07-26.
- Estado: aceptada.
- Decisión: publicar con GitHub Pages bajo `/selector-de-tareas/` y ejecutar el
  despliegue con GitHub Actions desde `main`.
- Evidencia: `vite.config.ts` y
  `.github/workflows/deploy-pages.yml`.
- Consecuencia: los recursos generados usan la misma base y el despliegue solo
  ocurre después de superar pruebas y compilación.
- React Router: no aplica; la aplicación actual no tiene rutas cliente.
