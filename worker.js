importScripts("algoritmos.js");

self.onmessage = (evento) => {
  const {indice, quantidade} = evento.data;
  if (!Number.isInteger(quantidade) || quantidade < 1 || quantidade > 100000) {
    self.postMessage({erro: "Informe uma quantidade entre 1 e 100.000."});
    return;
  }

  // Semente fixa: cada algoritmo recebe a mesma sequência.
  let semente = 42;
  const lista = Array.from({length: quantidade}, () => {
    semente = (Math.imul(1664525, semente) + 1013904223) >>> 0;
    return Math.floor(semente / 4294967296 * 1000001);
  });

  try {
    const inicio = performance.now();
    const resultado = self.algoritmosWeb[indice](lista.slice());
    const tempo = (performance.now() - inicio) / 1000;

    let correto = resultado.length === lista.length;
    for (let i = 1; correto && i < resultado.length; i++) {
      if (resultado[i - 1] > resultado[i]) correto = false;
    }

    self.postMessage({
      tempo,
      quantidade,
      correto,
      primeiros: resultado.slice(0, 10),
      ultimos: resultado.slice(-10)
    });
  } catch (erro) {
    self.postMessage({erro: erro.message || "Ocorreu um erro na execução."});
  }
};
