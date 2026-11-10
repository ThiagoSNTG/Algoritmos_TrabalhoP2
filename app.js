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
