# Selector de tareas

Una aplicación local que recomienda la mejor tarea pendiente para el tiempo que
tienes disponible. Prioriza primero la importancia y después elige al azar entre
las opciones equivalentes.

## Aplicación web

Requiere Node.js y npm:

```bash
npm ci
npm run dev
```

La pantalla permite:

- crear tareas con prioridad alta, media o baja;
- asignar una duración de 5, 15, 30 o 60 minutos;
- marcar tareas como pendientes o completadas;
- pedir una recomendación con “¿Qué hago ahora?”;
- conservar los datos en `localStorage` al recargar.

## Uso en terminal

La interfaz original sigue disponible y requiere Python 3.10 o posterior:

```bash
python3 selector.py add "Preparar la presentación" --priority alta --minutes 30
python3 selector.py list
python3 selector.py choose --minutes 30
python3 selector.py done 1
```

La terminal guarda sus datos en `tareas.json`, un archivo local ignorado por
Git. La web y la terminal usan almacenamientos independientes.

## Comprobaciones

```bash
npm test
npm run build
python3 -m unittest discover -s tests -v
```

## Publicación en GitHub Pages

Vite usa la base `/selector-de-tareas/` para que JavaScript y CSS se carguen
correctamente desde la subruta del repositorio.

El workflow `.github/workflows/deploy-pages.yml` ejecuta las pruebas web y de
terminal, compila la aplicación y publica `dist/` cuando hay un push a `main`.
También admite ejecución manual desde la pestaña Actions.

Antes del primer despliegue, en **Settings → Pages → Build and deployment** hay
que elegir **GitHub Actions** como fuente. La URL prevista es:

`https://oskrrr09.github.io/selector-de-tareas/`

El contexto persistente del proyecto está en [`docs/`](docs/00-estado-actual.md).
