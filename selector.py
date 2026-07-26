#!/usr/bin/env python3
"""Gestiona una lista local de tareas y elige una pendiente al azar."""

from __future__ import annotations

import argparse
import json
import random
from pathlib import Path
from typing import Any, Sequence


DEFAULT_FILE = Path(__file__).with_name("tareas.json")


def load_tasks(path: Path) -> list[dict[str, Any]]:
    """Carga las tareas; un archivo inexistente representa una lista vacía."""
    if not path.exists():
        return []

    data = json.loads(path.read_text(encoding="utf-8"))
    if not isinstance(data, list):
        raise ValueError("El archivo de tareas debe contener una lista JSON.")
    return data


def save_tasks(path: Path, tasks: list[dict[str, Any]]) -> None:
    """Guarda las tareas de forma legible."""
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(
        json.dumps(tasks, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )


def add_task(path: Path, text: str) -> dict[str, Any]:
    tasks = load_tasks(path)
    task = {
        "id": max((int(item["id"]) for item in tasks), default=0) + 1,
        "text": text.strip(),
        "done": False,
    }
    if not task["text"]:
        raise ValueError("La tarea no puede estar vacía.")
    tasks.append(task)
    save_tasks(path, tasks)
    return task


def choose_task(
    path: Path, chooser: random.Random | Any = random
) -> dict[str, Any] | None:
    pending = [task for task in load_tasks(path) if not task.get("done", False)]
    return chooser.choice(pending) if pending else None


def complete_task(path: Path, task_id: int) -> dict[str, Any] | None:
    tasks = load_tasks(path)
    for task in tasks:
        if task.get("id") == task_id:
            task["done"] = True
            save_tasks(path, tasks)
            return task
    return None


def format_task(task: dict[str, Any]) -> str:
    marker = "x" if task.get("done", False) else " "
    return f"[{marker}] {task['id']}: {task['text']}"


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        description="Guarda tareas y elige una pendiente al azar."
    )
    parser.add_argument(
        "--file",
        type=Path,
        default=DEFAULT_FILE,
        help="archivo JSON de almacenamiento",
    )
    subparsers = parser.add_subparsers(dest="command", required=True)

    add_parser = subparsers.add_parser("add", help="añade una tarea")
    add_parser.add_argument("text", help="texto de la tarea")

    subparsers.add_parser("list", help="muestra todas las tareas")
    subparsers.add_parser("choose", help="elige una tarea pendiente")

    done_parser = subparsers.add_parser("done", help="marca una tarea terminada")
    done_parser.add_argument("id", type=int, help="identificador de la tarea")
    return parser


def main(argv: Sequence[str] | None = None) -> int:
    args = build_parser().parse_args(argv)

    try:
        if args.command == "add":
            task = add_task(args.file, args.text)
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
            task = choose_task(args.file)
            if task is None:
                print("No hay tareas pendientes.")
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

