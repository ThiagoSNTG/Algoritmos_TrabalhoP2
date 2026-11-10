importScripts("algoritmos.js?v=6");

self.onmessage = (evento) => {
  const {indice, quantidade} = evento.data;
  if (!Number.isInteger(quantidade) || quantidade < 1 || quantidade > 100000) {
    self.postMessage({erro: "Informe uma quantidade entre 1 e 100.000."});
    return;
  }

  // Sorteio sem reposição: cada número aparece uma única vez.
  let semente = 42;
  const universo = Array.from({length: 100001}, (_, i) => i);
  for (let i = 0; i < quantidade; i++) {
    semente = (Math.imul(1664525, semente) + 1013904223) >>> 0;
    const j = i + Math.floor(semente / 4294967296 * (universo.length - i));
    [universo[i], universo[j]] = [universo[j], universo[i]];
  }
  const lista = universo.slice(0, quantidade);

  try {
    const inicio = performance.now();
    const resultado = self.algoritmosWeb[indice](lista.slice());
    const tempo = (performance.now() - inicio) / 1000;

    const repetidos = quantidade - new Set(lista).size;
    const valoresOriginais = new Set(lista);
    let correto = resultado.length === lista.length &&
      repetidos === 0 && new Set(resultado).size === resultado.length;
    for (let i = 1; correto && i < resultado.length; i++) {
      if (resultado[i - 1] > resultado[i]) correto = false;
    }
    if (correto) correto = resultado.every(valor => valoresOriginais.has(valor));

    self.postMessage({
      tempo,
      quantidade,
      repetidos,
      correto,
      primeiros: resultado.slice(0, 10),
      ultimos: resultado.slice(-10)
    });
  } catch (erro) {
    self.postMessage({erro: erro.message || "Ocorreu um erro na execução."});
  }
};
