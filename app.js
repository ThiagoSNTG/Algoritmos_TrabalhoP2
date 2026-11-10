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
  trabalhador = new Worker("worker.js");
  executar.disabled = true;
  parar.disabled = false;
  seletor.disabled = true;
  quantidade.disabled = true;
  mostrarSituacao("Executando…", "rodando");
  descricao.textContent = "Ordenando os números em segundo plano. Algoritmos quadráticos podem levar vários minutos ou mais.";
  document.getElementById("tempo").textContent = "—";
  document.getElementById("total").textContent = total.toLocaleString("pt-BR");
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
  document.getElementById("titulo-informacoes").textContent = dados.nome;
  conteudoInformacoes.replaceChildren();

  conteudoInformacoes.appendChild(criarSecaoInformacoes("Código na mão", dados.exemplo, true));

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
    "A atividade utiliza 100.000 números inteiros de 0 a 100.000, com sequência fixa. " +
    "A medição considera apenas a ordenação; o tempo real aparece no painel Resultado. " + dados.teste
  ));
  conteudoInformacoes.appendChild(criarSecaoInformacoes("Vantagens", dados.vantagens));
  conteudoInformacoes.appendChild(criarSecaoInformacoes("Desvantagens", dados.desvantagens));
  conteudoInformacoes.appendChild(criarSecaoInformacoes("Comparação e conclusão", dados.conclusao));

  janelaInformacoes.showModal();
}

document.getElementById("abrir-informacoes").addEventListener("click", abrirInformacoes);
document.getElementById("fechar-informacoes").addEventListener("click", () => janelaInformacoes.close());
