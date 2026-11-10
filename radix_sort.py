import time


def ordenar_positivos(lista):
    if not lista:
        return lista

    casa = 1
    maior = max(lista)

    while maior // casa > 0:
        contagem = [0] * 10
        resultado = [0] * len(lista)

        for numero in lista:
            contagem[(numero // casa) % 10] += 1

        for i in range(1, 10):
            contagem[i] += contagem[i - 1]

        for i in range(len(lista) - 1, -1, -1):
            digito = (lista[i] // casa) % 10
            contagem[digito] -= 1
            resultado[contagem[digito]] = lista[i]

        lista = resultado
        casa *= 10

    return lista


def radix_sort(lista):
    negativos = [-numero for numero in lista if numero < 0]
    positivos = [numero for numero in lista if numero >= 0]

    negativos = ordenar_positivos(negativos)
    positivos = ordenar_positivos(positivos)
    return [-numero for numero in reversed(negativos)] + positivos


def testar(lista):
    inicio = time.perf_counter()
    resultado = radix_sort(lista.copy())
    tempo = time.perf_counter() - inicio
    print(f"Tempo de execução: {tempo:.4f} segundos")
    return resultado, tempo
