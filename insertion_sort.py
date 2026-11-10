import time


def insertion_sort(lista):
    for i in range(1, len(lista)):
        valor = lista[i]
        j = i - 1

        while j >= 0 and lista[j] > valor:
            lista[j + 1] = lista[j]
            j -= 1

        lista[j + 1] = valor
    return lista


def testar(lista):
    inicio = time.perf_counter()
    resultado = insertion_sort(lista.copy())
    tempo = time.perf_counter() - inicio
    print(f"Tempo de execução: {tempo:.4f} segundos")
    return resultado, tempo
