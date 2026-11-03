// Wavelengths Remastered · os álbuns vêm do albums.json

// async permite usar await: a função espera cada resposta sem travar a página
const loadAlbums = async () => {
  // fetch pede o arquivo; a resposta chega depois, por isso o await
  const response = await fetch('albums.json');
  // json() lê o texto da resposta e transforma em lista de objetos do JavaScript
  const albums = await response.json();
  console.log(albums);
};

loadAlbums();
