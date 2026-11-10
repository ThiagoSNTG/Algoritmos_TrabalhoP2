const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const algoritmos = require("../algoritmos.js");

const casos = [
  [], [1], [2, 2, 2], [4, -2, 0, -2, 19],
  Array.from({length: 70}, (_, i) => i - 35),
  Array.from({length: 70}, (_, i) => 35 - i)
];

for (let i = 0; i < 20; i++) {
  casos.push(Array.from({length: 60}, () => Math.floor(Math.random() * 2000) - 1000));
}

for (const [indice, ordenar] of algoritmos.entries()) {
  for (const caso of casos) {
    assert.deepEqual(ordenar(caso.slice()), caso.slice().sort((a, b) => a - b), `Algoritmo ${indice + 1}`);
  }
}

const grandes = Array.from({length: 100000}, (_, i) => i);
let sementeTeste = 42;
for (let i = grandes.length - 1; i > 0; i--) {
  sementeTeste = (Math.imul(1664525, sementeTeste) + 1013904223) >>> 0;
  const j = Math.floor(sementeTeste / 4294967296 * (i + 1));
  [grandes[i], grandes[j]] = [grandes[j], grandes[i]];
}
assert.equal(new Set(grandes).size, 100000);
const esperado = grandes.slice().sort((a, b) => a - b);
for (const indice of [3, 4, 5, 6, 7, 8]) {
  assert.deepEqual(algoritmos[indice](grandes.slice()), esperado, `Teste 100.000: algoritmo ${indice + 1}`);
}

// Confere também a ligação entre o menu web e o código de execução em segundo plano.
let mensagem;
const ambiente = {performance};
ambiente.self = {postMessage: dados => { mensagem = dados; }};
const contexto = vm.createContext(ambiente);
ambiente.importScripts = arquivo => {
  const nomeArquivo = arquivo.split("?")[0];
  vm.runInContext(fs.readFileSync(path.join(__dirname, "..", nomeArquivo), "utf8"), contexto);
};
vm.runInContext(fs.readFileSync(path.join(__dirname, "..", "worker.js"), "utf8"), contexto);

for (let indice = 0; indice < 9; indice++) {
  mensagem = null;
  ambiente.self.onmessage({data: {indice, quantidade: 80}});
  assert.equal(mensagem.correto, true, `Worker: algoritmo ${indice + 1}`);
  assert.equal(mensagem.quantidade, 80);
  assert.equal(mensagem.repetidos, 0);
}

// A geração real do menu deve entregar 100.000 valores distintos e reproduzíveis.
let entradaCapturada;
const ordenarOriginal = ambiente.self.algoritmosWeb[3];
ambiente.self.algoritmosWeb[3] = lista => {
  entradaCapturada = Array.from(lista);
  return ordenarOriginal(lista);
};
ambiente.self.onmessage({data: {indice: 3, quantidade: 100000}});
assert.equal(mensagem.correto, true);
assert.equal(mensagem.repetidos, 0);
assert.equal(new Set(entradaCapturada).size, 100000);
assert.equal(Math.min(...entradaCapturada.slice(0, 1000)) >= 0, true);
assert.equal(entradaCapturada.every(valor => valor >= 0 && valor <= 100000), true);
const primeiraEntrada = entradaCapturada;
ambiente.self.onmessage({data: {indice: 3, quantidade: 100000}});
assert.deepEqual(entradaCapturada, primeiraEntrada);
ambiente.self.algoritmosWeb[3] = ordenarOriginal;

console.log("Nove algoritmos validados; teste de 100.000 valores únicos e fixos aprovado.");
