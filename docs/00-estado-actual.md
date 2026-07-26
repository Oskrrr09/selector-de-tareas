# Estado actual

Actualizado: 2026-07-26.

## Capacidades

- Añade tareas con un identificador incremental.
- Lista tareas pendientes y completadas.
- Elige al azar entre las tareas pendientes.
- Marca una tarea como completada por identificador.
- Guarda los datos localmente en JSON.

## Arquitectura

- `selector.py`: aplicación y punto de entrada de terminal.
- `tests/test_selector.py`: pruebas unitarias con la biblioteca estándar.
- `tareas.json`: datos locales; se crea al usar la aplicación y está ignorado.

## Verificación disponible

```bash
python3 -m unittest discover -s tests -v
```

No hay dependencias externas, empaquetado ni integración continua.

## Repositorio

- Ruta local: `/Users/oskrrr09/Proyectos/selector-de-tareas`.
- GitHub: `https://github.com/Oskrrr09/selector-de-tareas`.
- Visibilidad: privada.
- Estado: rama `main` sin commits ni push.
