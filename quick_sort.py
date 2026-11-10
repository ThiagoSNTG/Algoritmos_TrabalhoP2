import random
import time


def quick_sort(lista):
    if len(lista) <= 1:
        return lista

    pivo = random.choice(lista)
    menores = [numero for numero in lista if numero < pivo]
    iguais = [numero for numero in lista if numero == pivo]
    maiores = [numero for numero in lista if numero > pivo]

    return quick_sort(menores) + iguais + quick_sort(maiores)


def testar(lista):
    inicio = time.perf_counter()
    resultado = quick_sort(lista.copy())
    tempo = time.perf_counter() - inicio
    print(f"Tempo de execução: {tempo:.4f} segundos")
    return resultado, tempo
