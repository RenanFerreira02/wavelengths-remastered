# Wavelengths Remastered · Álbuns que me formaram

Projeto de aula da Fase 2 do portfólio (JavaScript puro). É o Wavelengths da Fase 1 de volta: os dados dos álbuns saem do HTML e passam a vir de um `albums.json`, e as animações ganham GSAP. Cada etapa é um commit, para ser usado em aula.

## Como rodar

A página lê o `albums.json` com `fetch`, e o navegador não deixa o `fetch` ler arquivos abertos direto do disco (endereço começando com `file://`). Por isso ela precisa de um servidor local. Duas formas:

- No VS Code, instale a extensão Live Server, clique com o botão direito no `index.html` e escolha "Open with Live Server".
- No terminal, dentro da pasta do projeto, rode `python -m http.server` e abra `http://localhost:8000`.

Para ver o projeto como ele estava em uma etapa, use `git log --oneline` e depois `git checkout <hash>`. Para voltar ao fim do projeto, `git switch main`.

## Etapas

- `00-ponto-de-partida`: README, .gitignore, LICENSE e o esqueleto do `index.html`.
- `01-pagina-da-fase-1`: a página do Wavelengths em HTML e CSS, com os 8 álbuns ainda escritos no HTML e a barra de filtro, sem JavaScript.
- `02-dados-em-json`: os dados dos 8 álbuns no `albums.json`, que a página ainda não usa.
- `03-lendo-com-fetch`: `script.js` com `defer`, `fetch`, `async`/`await` e `response.json()`, e o servidor local.
- `04-template-do-album`: `<template>`, `cloneNode` e `textContent` montam o primeiro álbum a partir do JSON.
- `05-um-album-por-item`: `forEach` monta os 8 álbuns; número com `padStart` e lado da capa com `index % 2`.
- `06-listas-dentro-do-album`: gêneros e clima com `createElement('li')`, um `forEach` dentro do outro.
- `07-cor-de-cada-album`: `style.setProperty` põe o `accentColor` do JSON na variável `--color-accent`.
- `08-capas-do-hero`: as capas do carrossel também vêm do JSON.
- `09-erro-ao-carregar`: `try`/`catch` e `response.ok` mostram uma mensagem quando o `albums.json` não abre.
- `10-filtrando-por-genero`: os botões do filtro com `filter`, `includes`, `hidden` e `aria-pressed`.
- `11-alternando-os-lados`: `classList.toggle` alterna o lado da capa só entre os álbuns visíveis.
- `12-palco-do-remaster`: o visual novo dos álbuns em HTML e CSS: palco preso com `position: sticky`, vinil feito só de CSS e número gigante.
- `13-gsap-por-cdn`: o GSAP entra pelo CDN e o giro do carrossel passa do `@keyframes` para `gsap.to`, com `prefers-reduced-motion` no JavaScript.
- `14-entrada-com-timeline`: `gsap.timeline`, `from` e `stagger` na abertura da página.

## Créditos

### GSAP

As animações usam o [GSAP](https://gsap.com/) 3.13, carregado pelo CDN jsDelivr. O GSAP é gratuito, inclusive os plugins, sob a [licença padrão da GreenSock](https://gsap.com/standard-license).

### Capas

As capas ficam na pasta `covers/`, em baixa resolução (500 × 500 px), só para fins educacionais. Os direitos pertencem aos artistas e às gravadoras. As imagens vêm do [Cover Art Archive](https://coverartarchive.org/), via MusicBrainz.

- `hybrid-theory.jpg`: *Hybrid Theory* (2000), Linkin Park. Gravadora: Warner Bros. Records.
- `meteora.jpg`: *Meteora* (2003), Linkin Park. Gravadora: Warner Bros. Records.
- `blink-182.jpg`: *blink-182* (2003), blink-182. Gravadora: Geffen Records.
- `a-fever-you-cant-sweat-out.jpg`: *A Fever You Can’t Sweat Out* (2005), Panic! at the Disco. Gravadoras: Decaydance e Fueled by Ramen.
- `riot.jpg`: *Riot!* (2007), Paramore. Gravadora: Fueled by Ramen.
- `brand-new-eyes.jpg`: *Brand New Eyes* (2009), Paramore. Gravadora: Fueled by Ramen.
- `paramore.jpg`: *Paramore* (2013), Paramore. Gravadora: Fueled by Ramen.
- `thats-the-spirit.jpg`: *That’s the Spirit* (2015), Bring Me the Horizon. Gravadora: RCA Records (Sony Music).

## Navegadores

O vinil e o palco dos álbuns usam `overflow: clip` e `-webkit-text-stroke`, suportados nos navegadores atuais (Safari a partir do 16).

O GSAP 3.13 funciona em todos os navegadores atuais.

O `style.css` usa CSS nesting nativo, suportado no Chrome 120+, Firefox 117+ e Safari 17.2+. Em navegadores mais antigos, as regras aninhadas são ignoradas e a página perde parte do estilo.

## Licença

Código sob a licença MIT. Veja o arquivo [LICENSE](LICENSE).
