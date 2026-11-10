import time


def ajeitar(lista, tamanho, posicao):
    maior = posicao
    esquerda = 2 * posicao + 1
    direita = 2 * posicao + 2

    if esquerda < tamanho and lista[esquerda] > lista[maior]:
        maior = esquerda
    if direita < tamanho and lista[direita] > lista[maior]:
        maior = direita

    if maior != posicao:
        lista[posicao], lista[maior] = lista[maior], lista[posicao]
        ajeitar(lista, tamanho, maior)


def heap_sort(lista):
    tamanho = len(lista)

    for i in range(tamanho // 2 - 1, -1, -1):
        ajeitar(lista, tamanho, i)

    for fim in range(tamanho - 1, 0, -1):
        lista[0], lista[fim] = lista[fim], lista[0]
        ajeitar(lista, fim, 0)

    return lista


def testar(lista):
    inicio = time.perf_counter()
    resultado = heap_sort(lista.copy())
    tempo = time.perf_counter() - inicio
    print(f"Tempo de execução: {tempo:.4f} segundos")
    return resultado, tempo
