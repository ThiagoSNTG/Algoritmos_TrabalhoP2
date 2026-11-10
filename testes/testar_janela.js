const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

class Elemento {
  constructor(tag = "div") {
    this.tagName = tag;
    this.children = [];
    this.listeners = {};
    this.value = "0";
    this.open = false;
    this.options = [];
    this.selectedIndex = 0;
  }

  addEventListener(tipo, funcao) { this.listeners[tipo] = funcao; }
  appendChild(filho) { this.children.push(filho); return filho; }
  append(...filhos) { this.children.push(...filhos); }
  replaceChildren(...filhos) { this.children = [...filhos]; }
  querySelector(tag) { return this.children.find(filho => filho.tagName === tag) || null; }
  insertBefore(filho, referencia) {
    const indice = this.children.indexOf(referencia);
    if (indice < 0) this.children.push(filho);
    else this.children.splice(indice, 0, filho);
  }
  showModal() { this.open = true; }
  close() { this.open = false; }
}

const identificadores = [
  "algoritmo", "quantidade", "executar", "parar", "situacao", "descricao",
  "alerta", "arquivo", "janela-informacoes", "conteudo-informacoes",
  "titulo-informacoes", "abrir-informacoes", "fechar-informacoes"
];
const elementos = Object.fromEntries(identificadores.map(id => [id, new Elemento()]));
elementos.algoritmo.value = "0";
elementos.quantidade.value = "100000";

const documento = {
  getElementById: id => elementos[id] || null,
  createElement: tag => new Elemento(tag)
};
const contexto = vm.createContext({document: documento, console});
const app = fs.readFileSync(path.join(__dirname, "..", "app.js"), "utf8");
vm.runInContext(app, contexto);

const nomes = ["Bubble Sort", "Insertion Sort", "Selection Sort", "Merge Sort",
  "Quick Sort", "Heap Sort", "Counting Sort", "Radix Sort", "Bucket Sort"];

for (let indice = 0; indice < 9; indice++) {
  elementos.algoritmo.value = String(indice);
  elementos["abrir-informacoes"].listeners.click();
  assert.equal(elementos["janela-informacoes"].open, true);
  assert.equal(elementos["titulo-informacoes"].textContent, nomes[indice]);
  assert.equal(elementos["conteudo-informacoes"].children.length, 7);
  elementos["fechar-informacoes"].listeners.click();
  assert.equal(elementos["janela-informacoes"].open, false);
}

console.log("Janela abriu e fechou corretamente para os nove algoritmos.");
