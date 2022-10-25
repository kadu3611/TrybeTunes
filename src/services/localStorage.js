const PRODUTOS = 'Produtos';
const AVALIACAO = 'Avaliacao';

if (!JSON.parse(localStorage.getItem(PRODUTOS))) { // Verificando se existe a key Produtos
  localStorage.setItem(PRODUTOS, JSON.stringify([])); // Cria a key Produtos com o array vazio
}
const readFavoriteProduto = () => JSON.parse(localStorage.getItem(PRODUTOS));

const saveFavoriteProduto = (favoriteProduto) => localStorage
  .setItem(PRODUTOS, JSON.stringify(favoriteProduto));

/* -------------------------------------------------------------------------------------- */

if (!JSON.parse(localStorage.getItem(AVALIACAO))) { // Verificando se existe a key Produtos
  localStorage.setItem(AVALIACAO, JSON.stringify([])); // Cria a key Produtos com o array vazio
}
const readAvaliacaoProduto = () => JSON.parse(localStorage.getItem(AVALIACAO));

const saveAvaliacaoProduto = (avaliacaoProduto) => localStorage
  .setItem(AVALIACAO, JSON.stringify(avaliacaoProduto));

// --------------------------------------------------------------------
// A função simulateRequest simula uma requisição para uma API externa
// Esse tipo de função que "chama outra função" é chamada de
// "currying function" https://javascript.info/currying-partials
// não se preocupe, estudaremos isso futuramente.
// --------------------------------------------------------------------

/* const simulateRequest = (response) => (callback) => {
  setTimeout(() => {
    callback(response);
  }, TIMEOUT);
}; */

export const getFavoriteProduto = () /* => new Promise((resolve) */ => {
  const favoriteProduto = readFavoriteProduto();
  return favoriteProduto;
};

export const addProduto = (produto) /* => new Promise((resolve) */ => {
  if (produto) {
    const favoriteProduto = readFavoriteProduto();
    saveFavoriteProduto([...favoriteProduto, produto]); // faz o spread e adicionna o 'produto'
  }
};

export const removeProduto = (produto) /* => new Promise((resolve) */ => {
  saveFavoriteProduto(produto);
};

/* __ API AVALIAÇÃO __ */

// leitura
export const getAvaliacaoProduto = () /* => new Promise((resolve) */ => {
  const avaliacaoProduto = readAvaliacaoProduto();
  return avaliacaoProduto;
};

// escrita
export const addAvaliacao = (avaliacao) /* => new Promise((resolve) */ => {
  if (avaliacao) {
    const avaliacaoProduto = readAvaliacaoProduto();
    saveAvaliacaoProduto([...avaliacaoProduto, avaliacao]);
  }
};
