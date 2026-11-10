# Algoritmos de ordenação

Projeto com nove algoritmos em Python e um menu web para testes no GitHub Pages.

## Arquivos Python

Cada algoritmo está em um arquivo separado, somente com as funções necessárias:

1. `bubble_sort.py`
2. `insertion_sort.py`
3. `selection_sort.py`
4. `merge_sort.py`
5. `quick_sort.py`
6. `heap_sort.py`
7. `counting_sort.py`
8. `radix_sort.py`
9. `bucket.py`

Para executar no computador ou no terminal do GitHub Codespaces, abra a pasta e use:

```bash
python menu.py
```

Selecione um número de 1 a 9. Pressione Enter quando for perguntada a quantidade para usar os **100.000 elementos** da atividade. O programa gera números de 0 a 100.000 com semente aleatória fixa, mede o tempo e confere o resultado.

## Versão para GitHub Pages

O GitHub Pages não executa Python diretamente. Por isso, `index.html` traz o menu visual e `algoritmos.js` contém versões equivalentes em JavaScript. O teste roda no navegador sem servidor, com 100.000 elementos por padrão. Os tempos no site e no Python podem ser diferentes porque são ambientes e linguagens distintos.

Para publicar:

1. Crie um repositório no GitHub.
2. Envie **todos os arquivos desta pasta para a raiz do repositório** (não envie somente o ZIP).
3. Acesse **Settings → Pages**.
4. Em **Build and deployment**, selecione **Deploy from a branch**.
5. Escolha a branch `main` e a pasta `/ (root)` e salve.
6. Aguarde a publicação e abra o endereço exibido em Pages.

O botão **Abrir código Python selecionado** permite consultar o arquivo de cada algoritmo.

O botão **Informações do algoritmo** abre uma janela de consulta para o método selecionado. O conteúdo segue os tópicos do roteiro acadêmico (execução passo a passo, complexidade, código, teste, vantagens, desvantagens e conclusão), sem nomes de participantes nem frases de passagem de fala. As referências a valores e tempos foram ajustadas ao projeto atual: 100.000 elementos no intervalo de 0 a 100.000, com tempo medido durante a execução em vez de valores antigos.

O arquivo `informacoes.js` contém os textos dessa janela e deve ser enviado junto com os demais arquivos para o GitHub Pages.

### Identidade visual

A página usa os dois arquivos de logo oficiais fornecidos, sem alterar suas proporções:

- `logo_univassouras_branca.png`: cabeçalho sobre bordô.
- `logo_univassouras_colorida.png`: rodapé sobre fundo claro.

A paleta segue o manual reduzido da Univassouras: bordô `#6D1D20` e cinza quente `#A59C97`. O CSS indica **Museo Sans**, fonte institucional, como primeira opção. Como os arquivos da fonte não foram fornecidos, o navegador usa uma alternativa sans-serif caso a família não esteja instalada.

**Envie as duas imagens junto com os arquivos HTML, CSS e JavaScript para o mesmo diretório no GitHub.** Não renomeie os arquivos sem ajustar os caminhos no `index.html`.

Se quiser executar o Python dentro do GitHub, use **Code → Codespaces → Create codespace on main**, abra o terminal e rode `python menu.py`.

## Observações

- O tamanho padrão de 100.000 elementos foi preservado nos dois menus.
- Bubble, Insertion e Selection podem demorar muito com esse tamanho por realizarem aproximadamente uma quantidade quadrática de comparações. No menu web, você pode clicar em **Interromper**.
- O navegador utiliza uma sequência fixa para comparar os nove algoritmos entre si; o Python também usa uma sequência fixa, mas o gerador de números das duas linguagens não é idêntico. Portanto, compare tempos de execução dentro do **mesmo ambiente**.
- Foram retirados textos extensos e blocos de teste repetidos de cada arquivo. Os arquivos `.py` podem ser importados sem executar testes automaticamente.
- Counting, Radix e Bucket agora também funcionam com números negativos.

Para rodar os testes dos nove algoritmos em Python:

```bash
python -m unittest discover -s testes -p "testar_*.py"
```

Os testes utilizam listas pequenas. Eles conferem o resultado sem substituir o teste principal com 100.000 elementos.

Se tiver Node.js instalado, a versão web também pode ser conferida com:

```bash
node testes/testar_web.js
```
