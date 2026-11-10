import time


def bubble_sort(lista):
    for i in range(len(lista) - 1):
        trocou = False
        for j in range(len(lista) - 1 - i):
            if lista[j] > lista[j + 1]:
                lista[j], lista[j + 1] = lista[j + 1], lista[j]
                trocou = True
        if not trocou:
            break
    return lista


def testar(lista):
    inicio = time.perf_counter()
    resultado = bubble_sort(lista.copy())
    tempo = time.perf_counter() - inicio
    print(f"Tempo de execução: {tempo:.4f} segundos")
    return resultado, tempo
