#!/usr/bin/env python3
"""Gestiona tareas locales y recomienda qué hacer según tiempo y prioridad."""

from __future__ import annotations

import argparse
import json
import random
from pathlib import Path
from typing import Any, Sequence


DEFAULT_FILE = Path(__file__).with_name("tareas.json")
PRIORITY_RANK = {"alta": 3, "media": 2, "baja": 1}
VALID_TIMES = (5, 15, 30, 60)


def normalize_task(task: dict[str, Any]) -> dict[str, Any]:
    """Normaliza también el formato inicial para conservar compatibilidad."""
    return {
        "id": int(task["id"]),
        "title": str(task.get("title", task.get("text", ""))),
        "priority": str(task.get("priority", "media")),
        "estimated_minutes": int(task.get("estimated_minutes", 15)),
        "status": str(
            task.get(
                "status",
                "completada" if task.get("done", False) else "pendiente",
            )
        ),
    }


def load_tasks(path: Path) -> list[dict[str, Any]]:
    """Carga las tareas; un archivo inexistente representa una lista vacía."""
    if not path.exists():
        return []

    data = json.loads(path.read_text(encoding="utf-8"))
    if not isinstance(data, list):
        raise ValueError("El archivo de tareas debe contener una lista JSON.")
    return [normalize_task(task) for task in data if isinstance(task, dict)]


def save_tasks(path: Path, tasks: list[dict[str, Any]]) -> None:
    """Guarda las tareas de forma legible."""
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(
        json.dumps(tasks, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )


def add_task(
    path: Path,
    title: str,
    priority: str = "media",
    estimated_minutes: int = 15,
) -> dict[str, Any]:
    tasks = load_tasks(path)
    clean_title = title.strip()
    if not clean_title:
        raise ValueError("La tarea no puede estar vacía.")
    if priority not in PRIORITY_RANK:
        raise ValueError("La prioridad debe ser alta, media o baja.")
    if estimated_minutes not in VALID_TIMES:
        raise ValueError("El tiempo debe ser 5, 15, 30 o 60 minutos.")

    task = {
        "id": max((int(item["id"]) for item in tasks), default=0) + 1,
        "title": clean_title,
        "priority": priority,
        "estimated_minutes": estimated_minutes,
        "status": "pendiente",
    }
    tasks.append(task)
    save_tasks(path, tasks)
    return task


def choose_task(
    path: Path,
    available_minutes: int = 60,
    chooser: random.Random | Any = random,
) -> dict[str, Any] | None:
    compatible = [
        task
        for task in load_tasks(path)
        if task["status"] == "pendiente"
        and task["estimated_minutes"] <= available_minutes
    ]
    if not compatible:
        return None

    highest_rank = max(PRIORITY_RANK[task["priority"]] for task in compatible)
    highest_priority = [
        task
        for task in compatible
        if PRIORITY_RANK[task["priority"]] == highest_rank
    ]
    return chooser.choice(highest_priority)


def complete_task(path: Path, task_id: int) -> dict[str, Any] | None:
    tasks = load_tasks(path)
    for task in tasks:
        if task["id"] == task_id:
            task["status"] = "completada"
            save_tasks(path, tasks)
            return task
    return None


def format_task(task: dict[str, Any]) -> str:
    marker = "x" if task["status"] == "completada" else " "
    return (
        f"[{marker}] {task['id']}: {task['title']} · "
        f"{task['priority']} · {task['estimated_minutes']} min"
    )


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        description="Guarda tareas y recomienda qué hacer ahora."
    )
    parser.add_argument(
        "--file",
        type=Path,
        default=DEFAULT_FILE,
        help="archivo JSON de almacenamiento",
    )
    subparsers = parser.add_subparsers(dest="command", required=True)

    add_parser = subparsers.add_parser("add", help="añade una tarea")
    add_parser.add_argument("title", help="título de la tarea")
    add_parser.add_argument(
        "--priority",
        choices=tuple(PRIORITY_RANK),
        default="media",
        help="prioridad de la tarea",
    )
    add_parser.add_argument(
        "--minutes",
        type=int,
        choices=VALID_TIMES,
        default=15,
        help="tiempo estimado",
    )

    subparsers.add_parser("list", help="muestra todas las tareas")
    choose_parser = subparsers.add_parser(
        "choose", help="recomienda una tarea pendiente"
    )
    choose_parser.add_argument(
        "--minutes",
        type=int,
        choices=VALID_TIMES,
        default=60,
        help="tiempo disponible",
    )

    done_parser = subparsers.add_parser("done", help="marca una tarea terminada")
    done_parser.add_argument("id", type=int, help="identificador de la tarea")
    return parser


def main(argv: Sequence[str] | None = None) -> int:
    args = build_parser().parse_args(argv)

    try:
        if args.command == "add":
            task = add_task(
                args.file,
                args.title,
                args.priority,
                args.minutes,
            )
            print(f"Añadida: {format_task(task)}")
            return 0

        if args.command == "list":
            tasks = load_tasks(args.file)
            if not tasks:
                print("No hay tareas.")
            else:
                for task in tasks:
                    print(format_task(task))
            return 0

        if args.command == "choose":
            task = choose_task(args.file, args.minutes)
            if task is None:
                print("No tienes tareas pendientes que encajen en ese tiempo")
            else:
                print(f"Empieza por: {format_task(task)}")
            return 0

        task = complete_task(args.file, args.id)
        if task is None:
            print(f"No existe la tarea {args.id}.")
            return 1
        print(f"Completada: {format_task(task)}")
        return 0
    except (OSError, ValueError, json.JSONDecodeError) as error:
        print(f"Error: {error}")
        return 1


if __name__ == "__main__":
    raise SystemExit(main())

