# Contexto del proyecto

## Propósito

`selector-de-tareas` es un proyecto de prueba para validar el flujo de memoria
persistente entre Obsidian, un repositorio local y GitHub. Su utilidad concreta
es ayudar a elegir por dónde empezar cuando existen varias tareas pendientes.

## Alcance actual

Incluye una aplicación web local de una página y conserva la interfaz de
terminal. La web usa Vite, React, TypeScript y Tailwind CSS; la terminal usa
únicamente la biblioteca estándar de Python.

No incluye cuentas, backend, sincronización entre dispositivos ni servicios
externos. Los datos de la web viven en `localStorage`; los de terminal, en
`tareas.json`. Ambos almacenamientos son deliberadamente independientes.

## Fuentes de verdad

- El comportamiento web está en `src/`.
- El comportamiento de terminal está en `selector.py`.
- El uso público está descrito en `README.md`.
- El estado y las decisiones están en `docs/`.
- La ficha de recuperación central vive en el vault de Obsidian.
