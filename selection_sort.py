import time


def selection_sort(lista):
    for i in range(len(lista)):
        menor = i
        for j in range(i + 1, len(lista)):
            if lista[j] < lista[menor]:
                menor = j
        if menor != i:
            lista[i], lista[menor] = lista[menor], lista[i]
    return lista


def testar(lista):
    inicio = time.perf_counter()
    resultado = selection_sort(lista.copy())
    tempo = time.perf_counter() - inicio
    print(f"Tempo de execução: {tempo:.4f} segundos")
    return resultado, tempo
