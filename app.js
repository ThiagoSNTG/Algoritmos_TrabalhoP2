// Conteúdo de estudo organizado por algoritmo, sem falas de apresentação.
const informacoesAlgoritmos = [
  {
    nome: "Bubble Sort",
    exemplo: [
      "A entrada é a lista completa de 100.000 números distintos, armazenados nas posições 0 a 99.999.",
      "Na primeira passada, o laço interno compara 99.999 pares de vizinhos e troca os que estiverem invertidos. O maior valor chega à última posição.",
      "A próxima passada não precisa verificar a última posição, pois ela já está correta. O mesmo processo continua com a parte ainda não ordenada.",
      "Quando uma passada termina sem nenhuma troca, a variável trocou permanece falsa e o algoritmo encerra a ordenação."
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
      "A entrada tem 100.000 valores distintos. Inicialmente, apenas o elemento da posição 0 é considerado ordenado.",
      "A partir da posição 1, cada número é guardado temporariamente na variável valor.",
      "O algoritmo percorre a parte anterior, deslocando para a direita todos os elementos maiores que valor.",
      "Insere valor no espaço encontrado e repete até a posição 99.999, quando toda a lista está em ordem."
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
      "A lista contém 100.000 valores distintos em posições de 0 a 99.999.",
      "Na posição 0, percorre toda a lista para localizar o menor número e colocá-lo no início.",
      "Na posição 1, procura o menor entre as 99.999 posições restantes e o coloca no lugar correto.",
      "A busca se repete para cada nova posição. A região ordenada cresce da esquerda para a direita até abranger a lista inteira."
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
      "Começa com os 100.000 números distintos e divide a lista em duas metades de 50.000 elementos.",
      "Continua dividindo cada metade até chegar a sublistas com um único elemento. Essas divisões fazem parte da ordenação dos 100.000 dados, não de um teste reduzido.",
      "Na etapa de intercalação, compara os próximos elementos de cada metade e copia o menor para o resultado.",
      "Repete as junções até formar novamente uma lista única, agora com os 100.000 números em ordem crescente."
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
      "Na lista de 100.000 números distintos, seleciona aleatoriamente um dos valores como pivô.",
      "Percorre toda a entrada e separa os valores menores e maiores que o pivô. Como não há repetição, a lista de iguais contém somente o pivô escolhido.",
      "Aplica a mesma divisão recursivamente às partes menores e maiores, até que não seja necessário subdividir mais.",
      "Junta todas as partes ordenadas. A escolha do pivô pode mudar as divisões, mas o resultado permanece crescente."
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
      "Os 100.000 valores distintos são reorganizados como um heap máximo, no qual cada pai é maior que seus filhos.",
      "O maior número fica na raiz, na posição 0. Ele é trocado com o elemento da posição 99.999, que fica definitivamente ordenado.",
      "O heap passa a considerar 99.999 elementos. A raiz é ajustada e o maior valor restante vai para o fim da região ativa.",
      "O processo continua, diminuindo o tamanho do heap até todos os 100.000 valores estarem ordenados."
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
      "A entrada contém 100.000 números únicos, escolhidos entre os 100.001 valores possíveis de 0 a 100.000.",
      "O algoritmo identifica o menor e o maior valor e cria as posições de contagem necessárias para cobrir esse intervalo.",
      "Cada número encontrado incrementa sua frequência. Como não há valores repetidos, cada posição de contagem vale 0 ou 1.",
      "Percorre a contagem em ordem crescente e escreve apenas os valores presentes, reconstruindo os 100.000 números sem comparar pares."
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
      "A entrada tem 100.000 inteiros distintos, cada um entre 0 e 100.000.",
      "Primeiro, percorre todos os elementos para ordená-los de maneira estável pelo dígito das unidades.",
      "Repete a ordenação pelas dezenas, centenas, milhares e demais casas decimais existentes.",
      "Como o limite é 100.000, são necessárias no máximo seis passadas por dígito para ordenar toda a lista."
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
      "Os 100.000 números distintos são distribuídos entre 1.000 baldes, conforme suas posições no intervalo de valores.",
      "Cada número é colocado no balde calculado pela fórmula do código; com valores bem espalhados, os baldes tendem a receber quantidades próximas de elementos.",
      "O Insertion Sort organiza os números dentro de cada balde, sem alterar o conjunto total de 100.000 entradas.",
      "Os baldes são percorridos na ordem e seus valores são reunidos em uma única lista crescente."
    ],
    complexidade: {melhor: "O(n + k) usual", media: "O(n + k) usual", pior: "O(n²)", memoria: "O(n + k)", nota: "k é o número de baldes. Quando os valores estão bem distribuídos, cada balde fica pequeno. Se quase todos caírem no mesmo balde, o Insertion Sort interno pode dominar o custo."},
    codigo: [
      "Encontra o menor e o maior valor e cria 1.000 baldes vazios por padrão.",
      "Calcula o índice de cada balde de acordo com a posição relativa do número no intervalo de dados.",
      "Ordena cada balde usando a lógica do Insertion Sort e concatena todos os baldes. As faixas são ajustadas ao intervalo real dos 100.000 dados."
    ],
    teste: "Com 100.000 números aleatórios bem distribuídos, tende a ser rápido. Se os números estiverem concentrados em poucos baldes, o tempo pode aumentar consideravelmente.",
    vantagens: ["Divide o problema em grupos menores.", "Tem bom desempenho quando os dados estão bem distribuídos.", "Permite usar um algoritmo simples dentro de cada balde."],
    desvantagens: ["Pode ficar muito lento se muitos valores caírem no mesmo balde.", "Precisa de memória adicional para armazenar os grupos.", "O número de baldes e a distribuição dos dados afetam o desempenho."],
    conclusao: "É útil quando a distribuição dos valores é favorável. Diferentemente de Counting Sort, não precisa reservar uma posição de contagem para cada valor possível."
  }
];

const arquivos = [
  "bubble_sort.py", "insertion_sort.py", "selection_sort.py", "merge_sort.py",
  "quick_sort.py", "heap_sort.py", "counting_sort.py", "radix_sort.py", "bucket.py"
];

const seletor = document.getElementById("algoritmo");
const quantidade = document.getElementById("quantidade");
const executar = document.getElementById("executar");
const parar = document.getElementById("parar");
const situacao = document.getElementById("situacao");
const descricao = document.getElementById("descricao");
const alerta = document.getElementById("alerta");
let trabalhador = null;

function mostrarSituacao(texto, classe) {
  situacao.textContent = texto;
  situacao.className = `situacao ${classe}`;
}

function atualizarAlgoritmo() {
  const indice = Number(seletor.value);
  document.getElementById("arquivo").href = arquivos[indice];
  alerta.hidden = !(indice <= 2 && Number(quantidade.value) >= 100000);
}

function liberar() {
  executar.disabled = false;
  parar.disabled = true;
  seletor.disabled = false;
  quantidade.disabled = false;
  trabalhador = null;
}

function interromper() {
  if (!trabalhador) return;
  trabalhador.terminate();
  liberar();
  mostrarSituacao("Interrompido", "falha");
  descricao.textContent = "O teste foi interrompido. Você pode selecionar outro algoritmo e executar novamente.";
}

executar.addEventListener("click", () => {
  const total = Number(quantidade.value);
  if (!Number.isInteger(total) || total < 1 || total > 100000) {
    mostrarSituacao("Valor inválido", "falha");
    descricao.textContent = "Use uma quantidade inteira entre 1 e 100.000.";
    return;
  }

  const indice = Number(seletor.value);
  trabalhador = new Worker("worker.js?v=6");
  executar.disabled = true;
  parar.disabled = false;
  seletor.disabled = true;
  quantidade.disabled = true;
  mostrarSituacao("Executando…", "rodando");
  descricao.textContent = "Ordenando os números em segundo plano. Algoritmos quadráticos podem levar vários minutos ou mais.";
  document.getElementById("tempo").textContent = "—";
  document.getElementById("total").textContent = total.toLocaleString("pt-BR");
  document.getElementById("repetidos").textContent = "—";
  document.getElementById("primeiros").textContent = "—";
  document.getElementById("ultimos").textContent = "—";

  trabalhador.onmessage = (evento) => {
    const dados = evento.data;
    trabalhador.terminate();
    liberar();
    if (dados.erro) {
      mostrarSituacao("Erro", "falha");
      descricao.textContent = dados.erro;
      return;
    }
    mostrarSituacao(dados.correto ? "Ordenação correta" : "Ordenação incorreta", dados.correto ? "sucesso" : "falha");
    descricao.textContent = `${seletor.options[seletor.selectedIndex].textContent} finalizado.`;
    document.getElementById("tempo").textContent = `${dados.tempo.toFixed(4)} s`;
    document.getElementById("repetidos").textContent = String(dados.repetidos);
    document.getElementById("primeiros").textContent = dados.primeiros.join(", ");
    document.getElementById("ultimos").textContent = dados.ultimos.join(", ");
  };

  trabalhador.onerror = () => {
    trabalhador.terminate();
    liberar();
    mostrarSituacao("Erro", "falha");
    descricao.textContent = "Não foi possível executar o teste no navegador.";
  };
  trabalhador.postMessage({indice, quantidade: total});
});

parar.addEventListener("click", interromper);
seletor.addEventListener("change", atualizarAlgoritmo);
quantidade.addEventListener("input", atualizarAlgoritmo);
atualizarAlgoritmo();

const janelaInformacoes = document.getElementById("janela-informacoes");
const conteudoInformacoes = document.getElementById("conteudo-informacoes");

function criarSecaoInformacoes(titulo, conteudo, numerada = false) {
  const secao = document.createElement("section");
  secao.className = "secao-informacoes";
  const cabecalho = document.createElement("h3");
  cabecalho.textContent = titulo;
  secao.appendChild(cabecalho);

  if (Array.isArray(conteudo)) {
    const lista = document.createElement(numerada ? "ol" : "ul");
    for (const item of conteudo) {
      const linha = document.createElement("li");
      linha.textContent = item;
      lista.appendChild(linha);
    }
    secao.appendChild(lista);
  } else {
    const texto = document.createElement("p");
    texto.textContent = conteudo;
    secao.appendChild(texto);
  }
  return secao;
}

function abrirInformacoes() {
  const dados = informacoesAlgoritmos[Number(seletor.value)];
  if (!dados) {
    descricao.textContent = "Não foi possível encontrar as informações deste algoritmo.";
    return;
  }
  document.getElementById("titulo-informacoes").textContent = dados.nome;
  conteudoInformacoes.replaceChildren();

  conteudoInformacoes.appendChild(criarSecaoInformacoes("Código na mão: 100.000 elementos", dados.exemplo, true));

  const secaoComplexidade = criarSecaoInformacoes("Complexidade", dados.complexidade.nota);
  const grade = document.createElement("div");
  grade.className = "complexidade-grade";
  for (const [rotulo, valor] of [
    ["Melhor caso", dados.complexidade.melhor],
    ["Caso médio", dados.complexidade.media],
    ["Pior caso", dados.complexidade.pior],
    ["Memória extra", dados.complexidade.memoria]
  ]) {
    const caixa = document.createElement("div");
    const etiqueta = document.createElement("span");
    const numero = document.createElement("strong");
    etiqueta.textContent = rotulo;
    numero.textContent = valor;
    caixa.append(etiqueta, numero);
    grade.appendChild(caixa);
  }
  secaoComplexidade.insertBefore(grade, secaoComplexidade.querySelector("p"));
  conteudoInformacoes.appendChild(secaoComplexidade);

  conteudoInformacoes.appendChild(criarSecaoInformacoes("Código (geral)", dados.codigo));
  conteudoInformacoes.appendChild(criarSecaoInformacoes(
    "Teste de execução",
    "A atividade utiliza 100.000 números inteiros distintos de 0 a 100.000, com sequência fixa. " +
    "A medição considera apenas a ordenação; o tempo real aparece no painel Resultado. " +
    "Como não há repetições, a estabilidade de cada método é uma propriedade teórica, não observável nesta amostra. " + dados.teste
  ));
  conteudoInformacoes.appendChild(criarSecaoInformacoes("Vantagens", dados.vantagens));
  conteudoInformacoes.appendChild(criarSecaoInformacoes("Desvantagens", dados.desvantagens));
  conteudoInformacoes.appendChild(criarSecaoInformacoes("Comparação e conclusão", dados.conclusao));

  if (typeof janelaInformacoes.showModal === "function") {
    janelaInformacoes.showModal();
  } else {
    janelaInformacoes.setAttribute("open", "");
  }
}

document.getElementById("abrir-informacoes").addEventListener("click", abrirInformacoes);
document.getElementById("fechar-informacoes").addEventListener("click", () => {
  if (typeof janelaInformacoes.close === "function") janelaInformacoes.close();
  else janelaInformacoes.removeAttribute("open");
});
