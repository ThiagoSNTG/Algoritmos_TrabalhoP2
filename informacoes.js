// Conteúdo de estudo organizado por algoritmo, sem falas de apresentação.
const informacoesAlgoritmos = [
  {
    nome: "Bubble Sort",
    exemplo: [
      "Lista inicial: [5, 2, 9, 1, 3].",
      "Na primeira passada, compara os vizinhos e troca os que estão invertidos: [2, 5, 1, 3, 9]. O 9 chega ao final.",
      "Na segunda passada: [2, 1, 3, 5, 9]. Na terceira: [1, 2, 3, 5, 9].",
      "Na passada seguinte não ocorre nenhuma troca. O algoritmo reconhece que a lista está ordenada e termina."
    ],
    complexidade: {melhor: "O(n)", media: "O(n²)", pior: "O(n²)", memoria: "O(1)", nota: "Os dois laços percorrem pares de vizinhos. Em listas aleatórias, há muitas comparações e trocas. A variável trocou permite encerrar após uma única passada quando a lista já está ordenada."},
    codigo: [
      "O laço externo controla as passadas e reduz a região que ainda precisa ser verificada.",
      "O laço interno compara lista[j] e lista[j + 1], trocando quando o valor da esquerda é maior.",
      "A variável trocou registra se houve alguma troca. Se continuar falsa, o laço é encerrado."
    ],
    teste: "Com 100.000 elementos, pode exigir muitos minutos devido à quantidade de comparações e trocas. O teste pode ser interrompido na versão web.",
    vantagens: ["Simples de entender e implementar.", "Estável: valores iguais mantêm a ordem relativa.", "Usa pouca memória e pode parar cedo quando a lista está ordenada."],
    desvantagens: ["Desempenho fraco em listas grandes e aleatórias.", "Realiza muitas trocas, além das comparações.", "A otimização trocou não elimina o custo quadrático no caso médio."],
    conclusao: "É útil para aprender comparações e trocas entre vizinhos. Para listas grandes, Merge, Quick e Heap são alternativas muito mais eficientes."
  },
  {
    nome: "Insertion Sort",
    exemplo: [
      "Lista inicial: [5, 2, 9, 1, 3]. A parte ordenada começa com [5].",
      "Insere o 2 antes do 5: [2, 5]. O 9 já está na posição correta: [2, 5, 9].",
      "Para inserir o 1, desloca 9, 5 e 2: [1, 2, 5, 9].",
      "Por fim, abre espaço para o 3 entre 2 e 5: [1, 2, 3, 5, 9]."
    ],
    complexidade: {melhor: "O(n)", media: "O(n²)", pior: "O(n²)", memoria: "O(1)", nota: "O for seleciona o próximo elemento e o while desloca os maiores para a direita. Uma lista já ordenada quase não exige deslocamentos; uma lista invertida exige o máximo."},
    codigo: [
      "O for começa no índice 1, considerando o primeiro elemento já ordenado.",
      "A variável valor guarda o elemento a inserir; j percorre as posições anteriores.",
      "Enquanto lista[j] for maior que valor, os elementos são deslocados. Depois, valor é colocado em lista[j + 1]."
    ],
    teste: "Com 100.000 números aleatórios, os deslocamentos podem levar muito tempo. Em entradas quase ordenadas, a execução costuma ser bem mais rápida.",
    vantagens: ["Fácil de entender, como organizar cartas na mão.", "É estável e não precisa de lista auxiliar.", "Muito eficiente para conjuntos pequenos ou quase ordenados."],
    desvantagens: ["Lento em listas grandes e aleatórias.", "Na ordem inversa, cada novo elemento precisa atravessar quase toda a parte já ordenada."],
    conclusao: "É uma boa escolha para poucas entradas ou dados quase ordenados. Também é útil para ordenar os pequenos grupos formados pelo Bucket Sort."
  },
  {
    nome: "Selection Sort",
    exemplo: [
      "Lista inicial: [5, 2, 9, 1, 3].",
      "Procura o menor valor, 1, e troca com o primeiro: [1, 2, 9, 5, 3].",
      "O menor da parte restante é 2, que já está no lugar.",
      "Encontra 3 e troca com 9: [1, 2, 3, 5, 9]. A parte ordenada cresce da esquerda para a direita."
    ],
    complexidade: {melhor: "O(n²)", media: "O(n²)", pior: "O(n²)", memoria: "O(1)", nota: "O laço externo escolhe cada posição e o interno procura o menor valor restante. São aproximadamente n(n - 1)/2 comparações, mesmo que a lista já esteja ordenada. As trocas são poucas: no máximo uma por posição."},
    codigo: [
      "O for externo define a posição i que receberá o próximo menor elemento.",
      "A variável menor guarda o índice do menor valor encontrado na parte não ordenada.",
      "O for interno examina o restante da lista e atualiza menor. Se necessário, troca lista[i] com lista[menor]."
    ],
    teste: "Com 100.000 elementos, faz quase 5 bilhões de comparações e pode levar vários minutos. O tempo exato depende da máquina e deve ser consultado no resultado do teste.",
    vantagens: ["Lógica curta e fácil de acompanhar.", "Realiza poucas trocas.", "Ordena na própria lista, com memória extra constante."],
    desvantagens: ["É lento para listas grandes.", "Não aproveita uma lista que já está em ordem.", "Não é estável na implementação com trocas."],
    conclusao: "É indicado para fins didáticos e listas pequenas, especialmente quando o custo de troca é importante. Não é recomendado para grandes volumes de dados."
  },
  {
    nome: "Merge Sort",
    exemplo: [
      "Lista inicial: [5, 2, 9, 1].",
      "Divide em [5, 2] e [9, 1], depois em [5], [2], [9] e [1].",
      "Intercala cada par em ordem: [2, 5] e [1, 9].",
      "Intercala as duas metades ordenadas e obtém [1, 2, 5, 9]."
    ],
    complexidade: {melhor: "O(n log n)", media: "O(n log n)", pior: "O(n log n)", memoria: "O(n)", nota: "A divisão pela metade cria cerca de log₂(n) níveis. Em cada nível, a intercalação percorre os elementos. O custo de tempo é previsível, mas são criadas listas auxiliares."},
    codigo: [
      "A função é recursiva e retorna imediatamente quando há zero ou um elemento.",
      "Calcula meio = len(lista) // 2 e ordena separadamente as duas metades.",
      "Dois índices percorrem esquerda e direita. O menor valor é acrescentado ao resultado, seguido pelas sobras."
    ],
    teste: "Com 100.000 elementos, costuma executar em frações de segundo ou poucos segundos. O tempo permanece da mesma ordem de grandeza para listas aleatórias, ordenadas ou invertidas.",
    vantagens: ["Bom desempenho para listas grandes.", "Tempo de execução previsível em todos os casos.", "Estável: preserva a ordem relativa dos elementos iguais."],
    desvantagens: ["Consome memória extra proporcional ao tamanho da lista.", "A recursão e a intercalação exigem mais atenção para compreender o código."],
    conclusao: "É recomendado quando se precisa de estabilidade e desempenho previsível. A principal limitação é a memória adicional."
  },
  {
    nome: "Quick Sort",
    exemplo: [
      "Lista inicial: [5, 2, 9, 1, 3]. Considere o pivô 3 neste exemplo.",
      "Separa os números em menores [2, 1], iguais [3] e maiores [5, 9].",
      "Ordena recursivamente as partes menores e maiores: [1, 2] e [5, 9].",
      "Junta tudo: [1, 2, 3, 5, 9]. O pivô sorteado pode alterar as etapas intermediárias."
    ],
    complexidade: {melhor: "O(n log n)", media: "O(n log n)", pior: "O(n²)", memoria: "O(n) usual", nota: "Uma divisão equilibrada gera poucos níveis de recursão. Se o pivô produzir divisões muito desequilibradas repetidamente, o custo pode chegar a O(n²). Nesta versão, são criadas três listas em cada divisão."},
    codigo: [
      "O caso base devolve a lista quando ela tem zero ou um elemento.",
      "Um pivô é selecionado com random.choice(lista).",
      "Os elementos são divididos em menores, iguais e maiores. As duas partes externas são ordenadas recursivamente e concatenadas com os iguais."
    ],
    teste: "Geralmente rápido com 100.000 números aleatórios. Como o pivô é sorteado, podem ocorrer pequenas variações no tempo, mesmo com os mesmos valores de entrada.",
    vantagens: ["Muito rápido na prática para grandes listas.", "A escolha aleatória do pivô reduz a chance de divisões ruins.", "A versão com três listas é relativamente simples de acompanhar."],
    desvantagens: ["O pior caso ainda pode ser quadrático.", "Esta implementação não é estável.", "Usa recursão e cria listas auxiliares."],
    conclusao: "É adequado para grandes listas aleatórias. Comparado ao Merge, costuma ter bom desempenho prático, mas não oferece a mesma garantia de tempo nem estabilidade."
  },
  {
    nome: "Heap Sort",
    exemplo: [
      "Lista inicial: [5, 2, 9, 1, 3].",
      "Constrói um heap máximo, em que cada pai é maior ou igual aos filhos: [9, 3, 5, 1, 2].",
      "Troca o maior elemento com o último e reorganiza os restantes: [5, 3, 2, 1, 9].",
      "Repete a retirada do maior até chegar a [1, 2, 3, 5, 9]."
    ],
    complexidade: {melhor: "O(n log n)", media: "O(n log n)", pior: "O(n log n)", memoria: "O(log n)*", nota: "Construir o heap custa O(n). Cada retirada do maior exige um ajuste de até log n níveis. *A estrutura ordena na própria lista, mas a função ajeitar é recursiva e usa pilha de chamadas."},
    codigo: [
      "A função ajeitar compara uma posição com seus filhos de índices 2 * i + 1 e 2 * i + 2.",
      "Primeiro o algoritmo reorganiza a lista para formar o heap máximo.",
      "Depois troca a raiz com o último elemento disponível, diminui o heap e ajusta novamente até ordenar tudo."
    ],
    teste: "Com 100.000 elementos, mantém tempo O(n log n), independentemente da ordem inicial. Costuma ter desempenho previsível, embora possa ser mais lento que Quick em algumas entradas.",
    vantagens: ["Desempenho garantido de O(n log n).", "Não precisa criar outra lista do tamanho da entrada.", "Boa opção quando previsibilidade e economia de memória importam."],
    desvantagens: ["Menos intuitivo por depender da estrutura de heap.", "Não é estável.", "Os ajustes sucessivos podem torná-lo mais lento que Quick Sort na prática."],
    conclusao: "É uma alternativa para listas grandes quando se deseja evitar o pior caso quadrático e limitar o uso de memória auxiliar."
  },
  {
    nome: "Counting Sort",
    exemplo: [
      "Lista inicial: [3, 1, 2, 1, 3].",
      "Cria uma contagem para os valores de 0 a 3: [0, 0, 0, 0].",
      "Após percorrer os elementos, as frequências ficam [0, 2, 1, 2].",
      "Reconstrói a lista em ordem crescente: [1, 1, 2, 3, 3]. Não precisa comparar pares de valores."
    ],
    complexidade: {melhor: "O(n + k)", media: "O(n + k)", pior: "O(n + k)", memoria: "O(k)", nota: "n é a quantidade de elementos e k é a amplitude de valores possíveis. Nesta atividade, com valores de 0 a 100.000, a contagem pode ocupar até 100.001 posições."},
    codigo: [
      "Calcula o menor e o maior valor para definir o intervalo necessário à contagem.",
      "Cada número incrementa uma posição da lista contagem, compensada pelo menor valor.",
      "Percorre as frequências do menor ao maior e escreve cada valor a quantidade de vezes em que apareceu."
    ],
    teste: "Para 100.000 inteiros entre 0 e 100.000, costuma ser rápido porque o intervalo de contagem também é limitado. O tempo e o consumo de memória crescem se os valores possíveis estiverem muito distantes.",
    vantagens: ["Não depende de comparar elementos entre si.", "Pode ser muito rápido para inteiros em faixas pequenas ou médias.", "A lógica de contar e reconstruir é direta."],
    desvantagens: ["Exige valores inteiros nesta implementação.", "O vetor de contagem pode ocupar muita memória se o intervalo entre menor e maior for enorme.", "Não é adequado diretamente a textos ou números decimais."],
    conclusao: "É excelente para muitos inteiros dentro de uma faixa conhecida e limitada, como a desta atividade. Em entradas com valores muito dispersos, outros métodos podem ser mais adequados."
  },
  {
    nome: "Radix Sort",
    exemplo: [
      "Lista inicial: [170, 45, 75, 90, 802, 24, 2, 66].",
      "Ordena pelas unidades: [170, 90, 802, 2, 24, 45, 75, 66].",
      "Depois pelas dezenas: [802, 2, 24, 45, 66, 170, 75, 90].",
      "Por fim, pelas centenas: [2, 24, 45, 66, 75, 90, 170, 802]. Cada etapa preserva a ordem dos empates da etapa anterior."
    ],
    complexidade: {melhor: "O(d(n + b))", media: "O(d(n + b))", pior: "O(d(n + b))", memoria: "O(n + b)", nota: "d é a quantidade de dígitos e b é a base usada, aqui 10. De 0 a 100.000, o maior valor possui até 6 dígitos, portanto são no máximo 6 passadas por casa decimal."},
    codigo: [
      "A função ordenar_positivos começa pela casa das unidades, depois dezenas, centenas e assim por diante.",
      "Para cada casa, conta a frequência dos dígitos de 0 a 9 e reorganiza os números de maneira estável.",
      "A função radix_sort também separa números negativos e não negativos antes de reunir os resultados ordenados."
    ],
    teste: "Com 100.000 valores até 100.000, o número de passadas é pequeno. O desempenho costuma ser bom para inteiros, já que cada etapa percorre os elementos sem comparar pares.",
    vantagens: ["Muito eficiente para grandes quantidades de inteiros com poucos dígitos.", "Usa a contagem de dígitos em vez de comparações diretas.", "As passadas preservam a ordem dos elementos com o mesmo dígito."],
    desvantagens: ["Não ordena diretamente textos ou números decimais nesta versão.", "Precisa de memória auxiliar para as etapas de contagem.", "A implementação é mais extensa que algoritmos básicos."],
    conclusao: "É indicado para inteiros com quantidade limitada de dígitos. Entender Counting Sort ajuda a compreender como cada passada funciona."
  },
  {
    nome: "Bucket Sort",
    exemplo: [
      "Lista didática: [29, 25, 3, 49, 9, 37, 21, 43], usando faixas de dez em dez.",
      "Distribui: 0–9 → [3, 9]; 20–29 → [29, 25, 21]; 30–39 → [37]; 40–49 → [49, 43].",
      "Ordena os valores dentro de cada balde: [3, 9], [21, 25, 29], [37] e [43, 49].",
      "Junta os baldes na ordem das faixas: [3, 9, 21, 25, 29, 37, 43, 49]."
    ],
    complexidade: {melhor: "O(n + k) usual", media: "O(n + k) usual", pior: "O(n²)", memoria: "O(n + k)", nota: "k é o número de baldes. Quando os valores estão bem distribuídos, cada balde fica pequeno. Se quase todos caírem no mesmo balde, o Insertion Sort interno pode dominar o custo."},
    codigo: [
      "Encontra o menor e o maior valor e cria 1.000 baldes vazios por padrão.",
      "Calcula o índice de cada balde de acordo com a posição relativa do número no intervalo de dados.",
      "Ordena cada balde usando a lógica do Insertion Sort e concatena todos os baldes. O exemplo didático usa faixas de dez, mas o código ajusta as faixas ao intervalo encontrado."
    ],
    teste: "Com 100.000 números aleatórios bem distribuídos, tende a ser rápido. Se os números estiverem concentrados em poucos baldes, o tempo pode aumentar consideravelmente.",
    vantagens: ["Divide o problema em grupos menores.", "Tem bom desempenho quando os dados estão bem distribuídos.", "Permite usar um algoritmo simples dentro de cada balde."],
    desvantagens: ["Pode ficar muito lento se muitos valores caírem no mesmo balde.", "Precisa de memória adicional para armazenar os grupos.", "O número de baldes e a distribuição dos dados afetam o desempenho."],
    conclusao: "É útil quando a distribuição dos valores é favorável. Diferentemente de Counting Sort, não precisa reservar uma posição de contagem para cada valor possível."
  }
];

if (typeof module !== "undefined") module.exports = informacoesAlgoritmos;
