// Versões para o navegador. Os arquivos .py continuam sendo o código da atividade.
function bubbleSort(lista) {
  for (let i = 0; i < lista.length - 1; i++) {
    let trocou = false;
    for (let j = 0; j < lista.length - 1 - i; j++) {
      if (lista[j] > lista[j + 1]) {
        [lista[j], lista[j + 1]] = [lista[j + 1], lista[j]];
        trocou = true;
      }
    }
    if (!trocou) break;
  }
  return lista;
}

function insertionSort(lista) {
  for (let i = 1; i < lista.length; i++) {
    const valor = lista[i];
    let j = i - 1;
    while (j >= 0 && lista[j] > valor) {
      lista[j + 1] = lista[j];
      j--;
    }
    lista[j + 1] = valor;
  }
  return lista;
}

function selectionSort(lista) {
  for (let i = 0; i < lista.length; i++) {
    let menor = i;
    for (let j = i + 1; j < lista.length; j++) {
      if (lista[j] < lista[menor]) menor = j;
    }
    if (menor !== i) [lista[i], lista[menor]] = [lista[menor], lista[i]];
  }
  return lista;
}

function mergeSort(lista) {
  if (lista.length <= 1) return lista;
  const meio = Math.floor(lista.length / 2);
  const esquerda = mergeSort(lista.slice(0, meio));
  const direita = mergeSort(lista.slice(meio));
  const resultado = [];
  let i = 0;
  let j = 0;
  while (i < esquerda.length && j < direita.length) {
    if (esquerda[i] <= direita[j]) resultado.push(esquerda[i++]);
    else resultado.push(direita[j++]);
  }
  return resultado.concat(esquerda.slice(i), direita.slice(j));
}

function quickSort(lista) {
  if (lista.length <= 1) return lista;
  const pivo = lista[Math.floor(Math.random() * lista.length)];
  const menores = [];
  const iguais = [];
  const maiores = [];
  for (const numero of lista) {
    if (numero < pivo) menores.push(numero);
    else if (numero > pivo) maiores.push(numero);
    else iguais.push(numero);
  }
  return quickSort(menores).concat(iguais, quickSort(maiores));
}

function ajeitar(lista, tamanho, posicao) {
  let maior = posicao;
  const esquerda = 2 * posicao + 1;
  const direita = 2 * posicao + 2;
  if (esquerda < tamanho && lista[esquerda] > lista[maior]) maior = esquerda;
  if (direita < tamanho && lista[direita] > lista[maior]) maior = direita;
  if (maior !== posicao) {
    [lista[posicao], lista[maior]] = [lista[maior], lista[posicao]];
    ajeitar(lista, tamanho, maior);
  }
}

function heapSort(lista) {
  const tamanho = lista.length;
  for (let i = Math.floor(tamanho / 2) - 1; i >= 0; i--) ajeitar(lista, tamanho, i);
  for (let fim = tamanho - 1; fim > 0; fim--) {
    [lista[0], lista[fim]] = [lista[fim], lista[0]];
    ajeitar(lista, fim, 0);
  }
  return lista;
}

function countingSort(lista) {
  if (!lista.length) return lista;
  let menor = lista[0];
  let maior = lista[0];
  for (const numero of lista) {
    if (numero < menor) menor = numero;
    if (numero > maior) maior = numero;
  }
  const contagem = new Uint32Array(maior - menor + 1);
  for (const numero of lista) contagem[numero - menor]++;
  const resultado = [];
  for (let i = 0; i < contagem.length; i++) {
    for (let j = 0; j < contagem[i]; j++) resultado.push(i + menor);
  }
  return resultado;
}

function ordenarPositivos(lista) {
  if (!lista.length) return lista;
  let maior = lista[0];
  for (const numero of lista) if (numero > maior) maior = numero;
  for (let casa = 1; Math.floor(maior / casa) > 0; casa *= 10) {
    const contagem = Array(10).fill(0);
    const resultado = Array(lista.length).fill(0);
    for (const numero of lista) contagem[Math.floor(numero / casa) % 10]++;
    for (let i = 1; i < 10; i++) contagem[i] += contagem[i - 1];
    for (let i = lista.length - 1; i >= 0; i--) {
      const digito = Math.floor(lista[i] / casa) % 10;
      contagem[digito]--;
      resultado[contagem[digito]] = lista[i];
    }
    lista = resultado;
  }
  return lista;
}

function radixSort(lista) {
  const negativos = ordenarPositivos(lista.filter(n => n < 0).map(n => -n));
  const positivos = ordenarPositivos(lista.filter(n => n >= 0));
  return negativos.reverse().map(n => -n).concat(positivos);
}

function bucketSort(lista, qtdBaldes = 1000) {
  if (!lista.length) return lista;
  if (qtdBaldes < 1) throw new Error("Quantidade de baldes inválida.");
  let menor = lista[0];
  let maior = lista[0];
  for (const numero of lista) {
    if (numero < menor) menor = numero;
    if (numero > maior) maior = numero;
  }
  const intervalo = maior - menor + 1;
  const baldes = Array.from({length: qtdBaldes}, () => []);
  for (const numero of lista) {
    const indice = Math.floor((numero - menor) * qtdBaldes / intervalo);
    baldes[indice].push(numero);
  }
  const resultado = [];
  for (const balde of baldes) {
    for (const numero of insertionSort(balde)) resultado.push(numero);
  }
  return resultado;
}

const algoritmosWeb = [
  bubbleSort, insertionSort, selectionSort, mergeSort, quickSort,
  heapSort, countingSort, radixSort, bucketSort
];

if (typeof self !== "undefined") self.algoritmosWeb = algoritmosWeb;
if (typeof module !== "undefined") module.exports = algoritmosWeb;
