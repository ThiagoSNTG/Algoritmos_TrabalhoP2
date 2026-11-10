import time


def counting_sort(lista):
    if not lista:
        return lista

    menor = min(lista)
    maior = max(lista)
    contagem = [0] * (maior - menor + 1)

    for numero in lista:
        contagem[numero - menor] += 1

    resultado = []
    for i, quantidade in enumerate(contagem):
        resultado.extend([i + menor] * quantidade)
    return resultado


def testar(lista):
    inicio = time.perf_counter()
    resultado = counting_sort(lista.copy())
    tempo = time.perf_counter() - inicio
    print(f"Tempo de execução: {tempo:.4f} segundos")
    return resultado, tempo
