import React, { Component } from 'react';
import { getFavoriteProduto, addProduto, removeProduto } from '../services/localStorage';

class ShoppingCart extends Component {
  constructor() {
    super();
    this.state = {
      strgProdutcs: [],
      // quantidadeProdutos: 0,
      // productsIds: [],
    };
  }

  componentDidMount() {
    this.puxaLocalStorage();
  }

  puxaLocalStorage = async () => {
    const produtos = await getFavoriteProduto();
    /* const palavra = []; */
    /* const filtro = produtos.reduce((acc, elemento) => {
      if (acc === elemento) {
        palavra.push([elemento]);
      }
      return 'aqui';
    }); */
    /* produtosEletronico = produtos.filter(retornaEletronico);
produtosEletronico.forEach(produtoEletro => {
    console.log(produtoEletro); */
    /* const { recebeFiltro } = this.state; */
    // console.log(produtos.filter((elem, index, self) => index === self.indexOf(elem)));
    /* const meuSet = new Set();
    const objectMap = produtos.reduce((map, object) => {
      map.set(object.id, object);
      return map;
    }, new Map()); */
    this.setState({
      strgProdutcs: produtos,
      // quantidadeProdutos: produtos.length,
    });
  }

  qntItens = (product) => {
    const { strgProdutcs } = this.state;
    // console.log(produtos);
    return strgProdutcs.filter((itemID) => itemID.id === product.id).length;
  }

  increaseItem = (product) => {
    addProduto(product); // adiciona no storage
    this.setState((prevState) => ({
      strgProdutcs: [...prevState.strgProdutcs, product],
    })); // adiciona no state
  }

  decreaseItem = (product) => {
    const { strgProdutcs } = this.state;
    console.log(product);
    console.log(strgProdutcs);

    // procura o index do produto clicado
    const itemPosition = strgProdutcs.indexOf(strgProdutcs.find((element) => (
      element.id === product.id
    )));
    console.log(itemPosition);

    const filterItem = strgProdutcs.filter((items, index) => {
      if (index !== itemPosition) {
        return items;
      }
      return null;
    });
    console.log(filterItem);

    this.setState({ strgProdutcs: filterItem }); // remove no State
    removeProduto(filterItem); // remove no localStorage
  }

  render() {
    const { strgProdutcs } = this.state;

    const quantidadeCarrinho = (
      <div style={ { display: 'flex', flexDirection: 'row' } }>
        <h4>Seu carrinho contém</h4>
        <h3
          data-testid="shopping-cart-product-quantity"
          style={ { marginLeft: '0.5%', marginRight: '0.5%' } }
        >
          {strgProdutcs.length}
        </h3>
        <h4>itens</h4>
      </div>
    );

    /* // recebe ids dos produtos
    const newArr = [];
    strgProdutcs.forEach((element) => {
      newArr.push(element.id);
    });

    console.log('newArr', newArr);

    // filtra repetidos
    const filteredArray = newArr.filter((ele, pos) => newArr.indexOf(ele) === pos);
    console.log('filteredArray', filteredArray);

    const test3 = [];
    const test2 = strgProdutcs.filter((e) => {
      filteredArray.forEach((element) => {
        if (element === e.id) {
          console.log('element', e);
          test3.push(e);
        }
      });
    });
    console.log('Test', test2);
    console.log('test3', test3); */

    return (
      <div>
        {
          strgProdutcs.length === 0
            ? <h4 data-testid="shopping-cart-empty-message">Seu carrinho está vazio</h4>
            : quantidadeCarrinho
        }
        {
          strgProdutcs.map((product, index) => (
            <div
              key={ index }
              style={ { display: 'block' } }
            >
              <button type="button">X</button>
              <img
                src={ product.thumbnail }
                alt="Imagem-do-Produto"
              />
              <h4 data-testid="shopping-cart-product-name">
                {product.title}
              </h4>

              <div>
                R$
                {product.price}
              </div>
              <button
                style={ { background: 'red', color: 'white' } }
                data-testid="product-decrease-quantity"
                onClick={ () => this.decreaseItem(product) }
                type="button"
              >
                Sub
              </button>

              <p>{this.qntItens(product)}</p>

              {/* <input
                type="number"
                defaultValue="1"
              /> */}
              <button
                style={ { background: 'green', color: 'white' } }
                data-testid="product-increase-quantity"
                type="button"
                onClick={ () => this.increaseItem(product) }
              >
                Add
              </button>
            </div>
          ))
        }

        <button type="button">Finalizar Compra</button>
      </div>
    );
  }
}

export default ShoppingCart;
