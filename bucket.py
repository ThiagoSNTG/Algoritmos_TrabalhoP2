import time


def bucket_sort(lista, qtd_baldes=1000):
    if not lista:
        return lista
    if qtd_baldes < 1:
        raise ValueError("A quantidade de baldes deve ser positiva.")

    menor = min(lista)
    maior = max(lista)
    intervalo = maior - menor + 1
    baldes = [[] for _ in range(qtd_baldes)]

    for numero in lista:
        indice = (numero - menor) * qtd_baldes // intervalo
        baldes[indice].append(numero)

    resultado = []
    for balde in baldes:
        # Insertion Sort dentro de cada balde.
        for i in range(1, len(balde)):
            valor = balde[i]
            j = i - 1
            while j >= 0 and balde[j] > valor:
                balde[j + 1] = balde[j]
                j -= 1
            balde[j + 1] = valor
        resultado.extend(balde)

    return resultado


def testar(lista):
    inicio = time.perf_counter()
    resultado = bucket_sort(lista.copy())
    tempo = time.perf_counter() - inicio
    print(f"Tempo de execução: {tempo:.4f} segundos")
    return resultado, tempo
