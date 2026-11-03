// Wavelengths Remastered · os álbuns vêm do albums.json

const albumList = document.querySelector('.album-list');
const albumTemplate = document.querySelector('#album-template');

// Cria um <li> para cada texto da lista e coloca dentro da <ul>
const fillList = (list, items) => {
  items.forEach((item) => {
    const listItem = document.createElement('li');
    listItem.textContent = item;
    list.append(listItem);
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

  // O número vem da posição: index + 1, com zero à esquerda (1 vira "01")
  section.querySelector('.album-number').textContent = String(index + 1).padStart(2, '0');
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

  // index ímpar (o 2º, o 4º, o 6º...) deixa a capa à direita
  if (index % 2 === 1) {
    section.classList.add('album-reverse');
  }

  albumList.append(section);
};

// async permite usar await: a função espera cada resposta sem travar a página
const loadAlbums = async () => {
  // fetch pede o arquivo; a resposta chega depois, por isso o await
  const response = await fetch('albums.json');
  // json() lê o texto da resposta e transforma em lista de objetos do JavaScript
  const albums = await response.json();
  // forEach chama a função uma vez para cada álbum, passando o álbum e a posição
  albums.forEach((album, index) => {
    createAlbum(album, index);
  });
};

loadAlbums();
