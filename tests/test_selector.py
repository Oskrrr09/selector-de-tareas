import random
import tempfile
import unittest
from pathlib import Path

from selector import add_task, choose_task, complete_task, load_tasks


class SelectorTests(unittest.TestCase):
    def setUp(self) -> None:
        self.temp_dir = tempfile.TemporaryDirectory()
        self.path = Path(self.temp_dir.name) / "tareas.json"

    def tearDown(self) -> None:
        self.temp_dir.cleanup()

    def test_missing_file_starts_empty(self) -> None:
        self.assertEqual(load_tasks(self.path), [])

    def test_add_assigns_fields_and_incremental_ids(self) -> None:
        first = add_task(self.path, "Primera", "alta", 5)
        second = add_task(self.path, "Segunda", "baja", 60)

        self.assertEqual((first["id"], second["id"]), (1, 2))
        self.assertEqual(first["priority"], "alta")
        self.assertEqual(first["estimated_minutes"], 5)
        self.assertEqual(first["status"], "pendiente")

    def test_choose_prefers_highest_compatible_priority(self) -> None:
        add_task(self.path, "Baja y corta", "baja", 5)
        high = add_task(self.path, "Alta y compatible", "alta", 15)
        add_task(self.path, "Alta pero larga", "alta", 60)

        selected = choose_task(self.path, 15, random.Random(7))

        self.assertEqual(selected, high)

    def test_choose_ignores_completed_tasks(self) -> None:
        add_task(self.path, "Terminada", "alta", 5)
        pending = add_task(self.path, "Pendiente", "media", 5)
        complete_task(self.path, 1)

        selected = choose_task(self.path, 5, random.Random(7))

        self.assertEqual(selected, pending)

    def test_choose_returns_none_when_no_task_fits(self) -> None:
        add_task(self.path, "Larga", "alta", 60)

        self.assertIsNone(choose_task(self.path, 15, random.Random(7)))

    def test_complete_returns_none_for_unknown_id(self) -> None:
        self.assertIsNone(complete_task(self.path, 99))

    def test_empty_title_is_rejected(self) -> None:
        with self.assertRaises(ValueError):
            add_task(self.path, "   ")

    def test_initial_format_is_normalized(self) -> None:
        self.path.write_text(
            '[{"id": 1, "text": "Anterior", "done": false}]',
            encoding="utf-8",
        )

        self.assertEqual(
            load_tasks(self.path),
            [
                {
                    "id": 1,
                    "title": "Anterior",
                    "priority": "media",
                    "estimated_minutes": 15,
                    "status": "pendiente",
                }
            ],
        )


if __name__ == "__main__":
    unittest.main()

