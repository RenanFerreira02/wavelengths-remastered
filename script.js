// Wavelengths Remastered · os álbuns vêm do albums.json e as animações são do GSAP

// Plugin do GSAP precisa ser registrado antes de usar
gsap.registerPlugin(ScrollTrigger);

const albumList = document.querySelector('.album-list');
const albumTemplate = document.querySelector('#album-template');
const carousel = document.querySelector('.carousel');
const loadError = document.querySelector('.load-error');
const filterStatus = document.querySelector('.filter-status');
const filterButtons = document.querySelectorAll('.filter-button');

// true quando a pessoa pediu menos movimento nas configurações do sistema
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// A lista fica fora da loadAlbums porque o filtro também precisa dela
let albums = [];

// Cria um <li> para cada texto da lista e coloca dentro da <ul>
const fillList = (list, items) => {
  items.forEach((item) => {
    const listItem = document.createElement('li');
    listItem.textContent = item;
    list.append(listItem);
  });
};

// O álbum sobe e aparece quando o topo dele chega a 75% da altura da tela
const revealOnScroll = (section) => {
  gsap.from(section, {
    y: 80,
    opacity: 0,
    duration: 0.8,
    ease: 'power2.out',
    scrollTrigger: { trigger: section, start: 'top 75%' },
  });
};

// Copia o molde do template e preenche com os dados de um álbum.
// index é a posição do álbum na lista: 0 para o primeiro, 1 para o segundo...
const createAlbum = (album, index) => {
  // cloneNode(true) copia a section com tudo que tem dentro
  const section = albumTemplate.content.firstElementChild.cloneNode(true);

  const cover = section.querySelector('.album-cover');
  cover.src = album.cover;
  cover.alt = album.coverAlt;

  // O número vem da posição: index + 1, com zero à esquerda (1 vira "01").
  // Ele aparece duas vezes: no texto e gigante, atrás do palco.
  const number = String(index + 1).padStart(2, '0');
  section.querySelector('.album-number').textContent = number;
  section.querySelector('.album-big-number').textContent = number;
  // textContent põe o texto como texto, nunca como HTML
  section.querySelector('.album-title').textContent = album.title;
  section.querySelector('.album-artist').textContent = `${album.artist} · ${album.year}`;
  fillList(section.querySelector('.album-genres'), album.genres);
  section.querySelector('.album-summary').textContent = album.summary;
  section.querySelector('.album-description').textContent = album.description;
  fillList(section.querySelector('.album-mood'), album.mood);
  section.querySelector('.album-favorite strong').textContent = album.favoriteTrack;

  // A cor do álbum vai para a variável CSS --color-accent, que o style.css já usa
  section.style.setProperty('--color-accent', album.accentColor);

  // Guarda a section no próprio álbum, para o filtro achar depois
  album.element = section;
  albumList.append(section);

  if (!prefersReducedMotion) {
    revealOnScroll(section);
  }
};

// Mostra só os álbuns que têm o gênero escolhido ("Todos" mostra tudo)
const showGenre = (genre) => {
  // filter devolve uma lista nova, só com os álbuns que passam no teste
  const visibleAlbums = albums.filter((album) => genre === 'Todos' || album.genres.includes(genre));

  // hidden esconde a section; includes diz se o álbum está entre os visíveis
  albums.forEach((album) => {
    album.element.hidden = !visibleAlbums.includes(album);
  });

  // O lado da capa alterna entre os visíveis: index ímpar (o 2º, o 4º...) fica à direita.
  // toggle com true adiciona a classe; com false, tira.
  visibleAlbums.forEach((album, index) => {
    album.element.classList.toggle('album-reverse', index % 2 === 1);
  });

  filterStatus.textContent = `Mostrando ${visibleAlbums.length} de ${albums.length} álbuns`;

  // Os álbuns mudaram de lugar: o ScrollTrigger mede de novo onde cada um começa
  ScrollTrigger.refresh();
};

// Cria a capa pequena do carrossel. Ela repete a capa do álbum e é só
// decoração, então o alt fica vazio
const createHeroCover = (album) => {
  const image = document.createElement('img');
  image.src = album.cover;
  image.alt = '';
  image.width = 120;
  image.height = 120;
  carousel.append(image);
};

// async permite usar await: a função espera cada resposta sem travar a página
const loadAlbums = async () => {
  // try: tenta fazer tudo; se alguma linha der erro, o JavaScript pula para o catch
  try {
    // fetch pede o arquivo; a resposta chega depois, por isso o await
    const response = await fetch('albums.json');

    // response.ok é false quando o servidor responde com erro (404 se o arquivo não existe)
    if (!response.ok) {
      throw new Error(`O albums.json respondeu com o status ${response.status}`);
    }

    // json() lê o texto da resposta e transforma em lista de objetos do JavaScript
    albums = await response.json();
    // forEach chama a função uma vez para cada álbum, passando o álbum e a posição
    albums.forEach((album, index) => {
      createAlbum(album, index);
      createHeroCover(album);
    });
    // Com todos os álbuns visíveis, showGenre alterna os lados e escreve a contagem
    showGenre('Todos');
  } catch (error) {
    // O erro continua no console para quem programa; na tela, a mensagem do design
    console.error(error);
    loadError.hidden = false;
    filterStatus.textContent = 'Nenhum álbum carregado';
  }
};

// O carrossel dá uma volta (360°) no eixo Y a cada 24 segundos, para sempre (repeat: -1).
// ease: 'none' mantém a velocidade constante, sem acelerar nem frear.
const startCarousel = () => {
  gsap.to(carousel, { rotationY: 360, duration: 24, ease: 'none', repeat: -1 });
};

// A entrada da página: uma timeline toca as animações uma depois da outra.
// from anima a partir do valor pedido até o valor do CSS (de invisível para visível).
const playIntro = () => {
  const intro = gsap.timeline({ defaults: { duration: 0.8, ease: 'power2.out' } });
  intro
    // stagger: o subtítulo começa 0,15 s depois do título
    .from('#hero h1, .hero-subtitle', { y: 40, opacity: 0, stagger: 0.15 })
    .from('.hero-covers', { scale: 0.8, opacity: 0 })
    .from('.hero-hint', { opacity: 0 });
};

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    // Só o botão clicado fica com aria-pressed="true"
    filterButtons.forEach((otherButton) => {
      otherButton.setAttribute('aria-pressed', String(otherButton === button));
    });
    showGenre(button.dataset.genre);
  });
});

// Quem pediu menos movimento vê a página pronta e o carrossel parado
if (!prefersReducedMotion) {
  playIntro();
  startCarousel();
}

loadAlbums();
