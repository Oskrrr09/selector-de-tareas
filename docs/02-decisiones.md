# Decisiones

## SEL-001 — Aplicación de terminal

- Fecha: 2026-07-26.
- Estado: aceptada.
- Decisión: usar una interfaz de terminal para mantener pequeña la prueba.
- Evidencia: los comandos están implementados con `argparse` en `selector.py`.

## SEL-002 — Solo biblioteca estándar

- Fecha: 2026-07-26.
- Estado: aceptada.
- Decisión: no añadir dependencias externas.
- Motivo: simplifica la ejecución y concentra la prueba en el flujo documental.

## SEL-003 — Datos locales no versionados

- Fecha: 2026-07-26.
- Estado: aceptada.
- Decisión: guardar las tareas en `tareas.json` e ignorar ese archivo en Git.
- Motivo: una lista personal no debe publicarse accidentalmente.

