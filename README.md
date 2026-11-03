# Wavelengths Remastered · Álbuns que me formaram

Projeto de aula da Fase 2 do portfólio (JavaScript puro). É o Wavelengths da Fase 1 de volta: os dados dos álbuns saem do HTML e passam a vir de um `albums.json`, e as animações ganham GSAP. Cada etapa é um commit, para ser usado em aula.

## Como abrir

Não precisa instalar nada: abra o arquivo `index.html` no navegador.

Para ver o projeto como ele estava em uma etapa, use `git log --oneline` e depois `git checkout <hash>`. Para voltar ao fim do projeto, `git switch main`.

## Etapas

- `00-ponto-de-partida`: README, .gitignore, LICENSE e o esqueleto do `index.html`.
- `01-pagina-da-fase-1`: a página do Wavelengths em HTML e CSS, com os 8 álbuns ainda escritos no HTML e a barra de filtro, sem JavaScript.
- `02-dados-em-json`: os dados dos 8 álbuns no `albums.json`, que a página ainda não usa.

## Créditos das capas

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

O `style.css` usa CSS nesting nativo, suportado no Chrome 120+, Firefox 117+ e Safari 17.2+. Em navegadores mais antigos, as regras aninhadas são ignoradas e a página perde parte do estilo.

## Licença

Código sob a licença MIT. Veja o arquivo [LICENSE](LICENSE).
