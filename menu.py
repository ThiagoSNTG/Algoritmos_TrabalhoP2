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
    if texto and (not texto.isdigit() or not 1 <= int(texto) <= 100000):
        print("Digite uma quantidade de 1 a 100000.")
        continue
    quantidade = int(texto) if texto else 100000

    nome, ordenar = algoritmos[int(escolha) - 1]
    if int(escolha) <= 3 and quantidade >= 100000:
        print("Atenção: esse algoritmo pode demorar bastante com 100 mil elementos.")
        if input("Continuar? (s/n): ").strip().lower() != "s":
            continue

    # A mesma semente deixa a comparação entre algoritmos mais justa.
    random.seed(42)
    lista = random.sample(range(100_001), quantidade)

    print(f"\nExecutando {nome} com {quantidade} elementos...")
    inicio = time.perf_counter()
    try:
        resultado = ordenar(lista.copy())
    except KeyboardInterrupt:
        print("\nExecução interrompida.")
        continue
    tempo = time.perf_counter() - inicio

    correto = resultado == sorted(lista)
    print("\nRESULTADO DA EXECUÇÃO EM PYTHON")
    print(f"Algoritmo: {nome}")
    print(f"Valores repetidos na entrada: {quantidade - len(set(lista))}")
    print(f"Ordenação correta: {'Sim' if correto else 'Não'}")
    print(f"Tempo de execução: {tempo:.4f} segundos")
    if tempo >= 60:
        minutos, segundos = divmod(tempo, 60)
        print(f"Duração: {int(minutos)} min e {segundos:.2f} s")
    print(f"Primeiros 10: {resultado[:10]}")
    print(f"Últimos 10: {resultado[-10:]}")
