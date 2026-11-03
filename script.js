// Wavelengths Remastered · os álbuns vêm do albums.json

const albumList = document.querySelector('.album-list');
const albumTemplate = document.querySelector('#album-template');

// Copia o molde do template e preenche com os dados de um álbum
const createAlbum = (album) => {
  // cloneNode(true) copia a section com tudo que tem dentro
  const section = albumTemplate.content.firstElementChild.cloneNode(true);

  const cover = section.querySelector('.album-cover');
  cover.src = album.cover;
  cover.alt = album.coverAlt;

  // textContent põe o texto como texto, nunca como HTML
  section.querySelector('.album-title').textContent = album.title;
  section.querySelector('.album-artist').textContent = `${album.artist} · ${album.year}`;
  section.querySelector('.album-summary').textContent = album.summary;
  section.querySelector('.album-description').textContent = album.description;
  section.querySelector('.album-favorite strong').textContent = album.favoriteTrack;

  albumList.append(section);
};

// async permite usar await: a função espera cada resposta sem travar a página
const loadAlbums = async () => {
  // fetch pede o arquivo; a resposta chega depois, por isso o await
  const response = await fetch('albums.json');
  // json() lê o texto da resposta e transforma em lista de objetos do JavaScript
  const albums = await response.json();
  createAlbum(albums[0]);
};

loadAlbums();
