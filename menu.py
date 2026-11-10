import random

from bubble_sort import testar as testar_bubble
from bucket import testar as testar_bucket
from counting_sort import testar as testar_counting
from heap_sort import testar as testar_heap
from insertion_sort import testar as testar_insertion
from merge_sort import testar as testar_merge
from quick_sort import testar as testar_quick
from radix_sort import testar as testar_radix
from selection_sort import testar as testar_selection


algoritmos = [
    ("Bubble Sort", testar_bubble),
    ("Insertion Sort", testar_insertion),
    ("Selection Sort", testar_selection),
    ("Merge Sort", testar_merge),
    ("Quick Sort", testar_quick),
    ("Heap Sort", testar_heap),
    ("Counting Sort", testar_counting),
    ("Radix Sort", testar_radix),
    ("Bucket Sort", testar_bucket),
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

    nome, testar = algoritmos[int(escolha) - 1]
    if int(escolha) <= 3 and quantidade >= 100000:
        print("Atenção: esse algoritmo pode demorar bastante com 100 mil elementos.")
        if input("Continuar? (s/n): ").strip().lower() != "s":
            continue

    # A mesma semente deixa a comparação entre algoritmos mais justa.
    random.seed(42)
    lista = random.sample(range(100_001), quantidade)

    print(f"\nExecutando {nome} com {quantidade} elementos...")
    try:
        resultado, tempo = testar(lista)
    except KeyboardInterrupt:
        print("\nExecução interrompida.")
        continue

    correto = resultado == sorted(lista)
    print("\nRESULTADO DA EXECUÇÃO EM PYTHON")
    print(f"Algoritmo: {nome}")
    print(f"Valores repetidos na entrada: {quantidade - len(set(lista))}")
    print(f"Ordenação correta: {'Sim' if correto else 'Não'}")
    if tempo >= 60:
        minutos, segundos = divmod(tempo, 60)
        print(f"Duração: {int(minutos)} min e {segundos:.2f} s")
    print(f"Primeiros 10: {resultado[:10]}")
    print(f"Últimos 10: {resultado[-10:]}")
