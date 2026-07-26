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

    def test_add_assigns_incremental_ids(self) -> None:
        first = add_task(self.path, "Primera")
        second = add_task(self.path, "Segunda")

        self.assertEqual((first["id"], second["id"]), (1, 2))
        self.assertEqual(len(load_tasks(self.path)), 2)

    def test_choose_ignores_completed_tasks(self) -> None:
        add_task(self.path, "Terminada")
        pending = add_task(self.path, "Pendiente")
        complete_task(self.path, 1)

        selected = choose_task(self.path, random.Random(7))

        self.assertEqual(selected, pending)

    def test_complete_returns_none_for_unknown_id(self) -> None:
        self.assertIsNone(complete_task(self.path, 99))

    def test_empty_text_is_rejected(self) -> None:
        with self.assertRaises(ValueError):
            add_task(self.path, "   ")


if __name__ == "__main__":
    unittest.main()

