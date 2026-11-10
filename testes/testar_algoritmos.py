import contextlib
import io
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
from bubble_sort import testar as testar_bubble
from bucket import testar as testar_bucket
from counting_sort import testar as testar_counting
from heap_sort import testar as testar_heap
from insertion_sort import testar as testar_insertion
from merge_sort import testar as testar_merge
from quick_sort import testar as testar_quick
from radix_sort import testar as testar_radix
from selection_sort import testar as testar_selection


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

    def test_medicao_tempo(self):
        testes = [testar_bubble, testar_insertion, testar_selection,
                  testar_merge, testar_quick, testar_heap, testar_counting,
                  testar_radix, testar_bucket]
        lista = [17, 4, 91, 0, 12, -5, 17]

        for testar in testes:
            with self.subTest(algoritmo=testar.__module__):
                saida = io.StringIO()
                with contextlib.redirect_stdout(saida):
                    resultado, tempo = testar(lista)

                self.assertEqual(resultado, sorted(lista))
                self.assertEqual(lista, [17, 4, 91, 0, 12, -5, 17])
                self.assertGreaterEqual(tempo, 0)
                self.assertRegex(saida.getvalue().strip(),
                                 r"^Tempo de execução: \d+\.\d{4} segundos$")
