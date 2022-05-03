import React, { Component } from 'react';
import { getFavoriteProduto } from '../services/localStorage';

class ShoppingCart extends Component {
  constructor() {
    super();
    this.state = {
      produtosLocalStorage: [],
      quantidadeProdutos: 0,
      recebeFiltro: [],

    };
  }

  componentDidMount() {
    this.puxaLocalStorage();
  }

  puxaLocalStorage = async () => {
    const produtos = await getFavoriteProduto();
    const palavra = [];
    /* const filtro = produtos.reduce((acc, elemento) => {
      if (acc === elemento) {
        palavra.push([elemento]);
      }
      return 'aqui';
    }); */
    /* produtosEletronico = produtos.filter(retornaEletronico);
produtosEletronico.forEach(produtoEletro => {
    console.log(produtoEletro); */
    const { recebeFiltro } = this.state;
    // console.log(produtos.filter((elem, index, self) => index === self.indexOf(elem)));
  const meuSet = new Set();
    const objectMap = produtos.reduce((map, object) => {
      map.set(object.id, object);
      return map;
    }, new Map());
    console.log(objectMap);
    this.setState({
      produtosLocalStorage: produtos,
      quantidadeProdutos: produtos.length,

    });
  }

  render() {
    const { produtosLocalStorage, quantidadeProdutos } = this.state;
    const quantidadeCarrinho = (
      <div data-testid="shopping-cart-product-quantity">
        {' '}
        Seu carrinho contém
        {' '}
        {quantidadeProdutos}
      </div>
    );
    return (
      <div>
        {
          produtosLocalStorage.length === 0
            ? <h4 data-testid="shopping-cart-empty-message">Seu carrinho está vazio</h4>
            : quantidadeCarrinho
        }
        {
          produtosLocalStorage.map((element, index) => (
            <div key={ index }>
              <h4 data-testid="shopping-cart-product-name">
                {element.title}
              </h4>
              <img
                src={ element.thumbnail }
                alt="Imagem-do-Produto"
              />
              <div>
                R$
                {element.price}
              </div>
              <input
                type="number"
                defaultValue="1"
              />
            </div>
          ))
        }

      </div>
    );
  }
}

export default ShoppingCart;
