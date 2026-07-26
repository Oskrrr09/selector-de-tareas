# Selector de tareas

Una utilidad pequeña de terminal que guarda tareas pendientes y elige una al
azar cuando no sabes por cuál empezar.

## Uso

No necesita dependencias externas. Requiere Python 3.10 o posterior.

```bash
python3 selector.py add "Preparar la presentación"
python3 selector.py list
python3 selector.py choose
python3 selector.py done 1
```

Por defecto, los datos se guardan en `tareas.json`, un archivo local ignorado
por Git. Para usar otro archivo:

```bash
python3 selector.py --file /ruta/tareas.json list
```

## Comprobación

```bash
python3 -m unittest discover -s tests -v
```

El contexto persistente del proyecto está en [`docs/`](docs/00-estado-actual.md).

