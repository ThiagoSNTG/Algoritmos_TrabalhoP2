import random
import time

from bubble_sort import bubble_sort
from bucket import bucket_sort
from counting_sort import counting_sort
from heap_sort import heap_sort
from insertion_sort import insertion_sort
from merge_sort import merge_sort
from quick_sort import quick_sort
from radix_sort import radix_sort
from selection_sort import selection_sort


algoritmos = [
    ("Bubble Sort", bubble_sort),
    ("Insertion Sort", insertion_sort),
    ("Selection Sort", selection_sort),
    ("Merge Sort", merge_sort),
    ("Quick Sort", quick_sort),
    ("Heap Sort", heap_sort),
    ("Counting Sort", counting_sort),
    ("Radix Sort", radix_sort),
    ("Bucket Sort", bucket_sort),
]


while True:
    print("\nALGORITMOS DE ORDENAÇÃO")
    for numero, (nome, _) in enumerate(algoritmos, 1):
        print(f"{numero} - {nome}")
    print("0 - Sair")

    escolha = input("Escolha um algoritmo: ").strip()
    if escolha == "0":
        break
    if not escolha.isdigit() or not 1 <= int(escolha) <= len(algoritmos):
        print("Opção inválida.")
        continue

    texto = input("Quantidade de elementos [100000]: ").strip()
    if texto and (not texto.isdigit() or int(texto) < 1):
        print("Digite uma quantidade positiva.")
        continue
    quantidade = int(texto) if texto else 100000

    nome, ordenar = algoritmos[int(escolha) - 1]
    if int(escolha) <= 3 and quantidade >= 100000:
        print("Atenção: esse algoritmo pode demorar bastante com 100 mil elementos.")
        if input("Continuar? (s/n): ").strip().lower() != "s":
            continue

    # A mesma semente deixa a comparação entre algoritmos mais justa.
    random.seed(42)
    lista = [random.randint(0, 100_000) for _ in range(quantidade)]

    print(f"\nExecutando {nome} com {quantidade} elementos...")
    inicio = time.perf_counter()
    try:
        resultado = ordenar(lista.copy())
    except KeyboardInterrupt:
        print("\nExecução interrompida.")
        continue
    tempo = time.perf_counter() - inicio

    correto = resultado == sorted(lista)
    print(f"Ordenação correta: {'Sim' if correto else 'Não'}")
    print(f"Tempo: {tempo:.4f} segundos")
    print(f"Primeiros 10: {resultado[:10]}")
    print(f"Últimos 10: {resultado[-10:]}")
