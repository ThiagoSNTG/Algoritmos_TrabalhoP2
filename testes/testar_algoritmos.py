import random
import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from bubble_sort import bubble_sort
from bucket import bucket_sort
from counting_sort import counting_sort
from heap_sort import heap_sort
from insertion_sort import insertion_sort
from merge_sort import merge_sort
from quick_sort import quick_sort
from radix_sort import radix_sort
from selection_sort import selection_sort


class TesteOrdenacao(unittest.TestCase):
    def test_todos(self):
        funcoes = [bubble_sort, insertion_sort, selection_sort, merge_sort,
                   quick_sort, heap_sort, counting_sort, radix_sort, bucket_sort]
        random.seed(7)
        casos = [[], [1], [4, 4, 4], [3, -7, 0, 3, -2],
                 list(range(40)), list(range(40, -1, -1))]
        casos.extend([random.choices(range(-500, 501), k=50) for _ in range(15)])

        for funcao in funcoes:
            for caso in casos:
                with self.subTest(algoritmo=funcao.__name__, caso=caso[:8]):
                    original = caso.copy()
                    self.assertEqual(funcao(caso.copy()), sorted(caso))
                    self.assertEqual(caso, original)
