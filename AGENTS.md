# Guía de trabajo del repositorio

Este archivo se aplica a todo el repositorio.

## Antes de cambiar

1. Revisa `git status` y conserva cambios preexistentes.
2. Lee `docs/00-estado-actual.md` y `docs/01-contexto-del-proyecto.md`.
3. Consulta decisiones, roadmap y problemas pendientes relacionados.
4. Contrasta la documentación con el código, que es la fuente ejecutable.

## Reglas

- Mantén el proyecto sin dependencias externas mientras no exista una razón
  documentada para añadirlas.
- No versiones `tareas.json`; contiene datos locales del usuario.
- Conserva la interfaz de terminal documentada en `README.md`.
- No guardes secretos, credenciales ni datos personales en el repositorio.
- Actualiza la documentación cuando cambie el comportamiento o el alcance.
- No hagas commit ni push salvo petición explícita del usuario.

## Verificación

```bash
python3 -m unittest discover -s tests -v
```

Antes de terminar, revisa `git diff`, ejecuta la verificación proporcional al
cambio y confirma que no se incluyan datos locales ni artefactos de Python.

