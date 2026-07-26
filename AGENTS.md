# Guía de trabajo del repositorio

Este archivo se aplica a todo el repositorio.

## Antes de cambiar

1. Revisa `git status` y conserva cambios preexistentes.
2. Lee `docs/00-estado-actual.md` y `docs/01-contexto-del-proyecto.md`.
3. Consulta decisiones, roadmap y problemas pendientes relacionados.
4. Contrasta la documentación con el código, que es la fuente ejecutable.

## Reglas

- Mantén acotadas las dependencias web y documenta cualquier incorporación.
- No versiones `tareas.json`; contiene datos locales del usuario.
- Conserva la interfaz de terminal documentada en `README.md`.
- Conserva la forma versionada de la clave `selector-de-tareas:v1` o documenta
  una migración antes de cambiarla.
- Respeta los valores admitidos de prioridad, duración y estado definidos en
  `src/types.ts`.
- Mantén controles táctiles, foco visible y funcionamiento responsive.
- No guardes secretos, credenciales ni datos personales en el repositorio.
- Actualiza la documentación cuando cambie el comportamiento o el alcance.
- No hagas commit ni push salvo petición explícita del usuario.

## Verificación

```bash
npm ci
npm test
npm run build
python3 -m unittest discover -s tests -v
```

Antes de terminar, revisa `git diff`, ejecuta la verificación proporcional al
cambio y confirma que no se incluyan `node_modules/`, `dist/`, datos locales ni
artefactos de Python.
