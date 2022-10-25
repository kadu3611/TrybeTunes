import React, { Component } from 'react';
import { getFavoriteProduto, addProduto, removeProduto } from '../services/localStorage';
import { getProductsByProduct } from '../services/api';

class ShoppingCart extends Component {
  constructor() {
    super();
    this.state = {
      strgProdutcs: [],
      recebendoFiltro: [],
      recebeQuantidadeStrg: 0,
    };
  }

  componentDidMount() {
    this.puxaLocalStorage();
  }

  dadosFiltrados = async (recebe) => { // recebe id
    const { recebendoFiltro } = this.state;
    recebendoFiltro.push(await getProductsByProduct(recebe));
    this.setState({
      recebendoFiltro,
    });
  }

  puxaLocalStorage = async () => {
    const produtos = await getFavoriteProduto();
    // const novaArr = produtos.filter((este, i) => produtos.indexOf(este) === i);
    // console.log('novo', novaArr);
    const objectMap = produtos.map((object) => object.id);
    const idProdutosFiltrados = [...new Set(objectMap)];
    const produtosUnicos = idProdutosFiltrados.forEach(async (elemento) => this.dadosFiltrados(elemento));
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
    // console.log(product);
    // console.log(strgProdutcs);

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
    const { strgProdutcs, recebendoFiltro, recebeQuantidadeStrg } = this.state;
    let contador = 0;

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

    return (
      <div>
        {
          strgProdutcs.length === 0
            ? <h4 data-testid="shopping-cart-empty-message">Seu carrinho está vazio</h4>
            : quantidadeCarrinho
        }
        {
          recebendoFiltro.map((product, index) => (
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
              {
                strgProdutcs.forEach((elemento) => {
                  if (elemento.id === product.id) {

                    contador = elemento;
                  }
                })
              }
              <p>{this.qntItens(contador)}</p>
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
