import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as api from '../services/api';
import { addProduto, addAvaliacao, getAvaliacaoProduto } from '../services/localStorage';

class Details extends React.Component {
  constructor() {
    super();
    this.state = {
      title: '',
      thumbnail: '',
      price: '',
      attributes: [],
      email: '',
      radio: '',
      textarea: '',
      recuperaDados: [],
    };
  }

  componentDidMount() {
    this.handleCategory();
    this.recuperaDoStorage();
  }

  handleCategory = async () => {
    const { match: { params: { id } } } = this.props; // desconstrucao para acessar o id
    const products = await api.getProductsByProduct(id);
    const { title, thumbnail, price, attributes } = products;
    this.setState({
      title,
      thumbnail,
      price,
      attributes,
      products,
    });
  }

  adicionarProduto = async () => {
    const { products } = this.state;
    addProduto(products); // addProduto adiciona no LocalStorage
  };

  formulario = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  avaliacao = (e) => {
    e.preventDefault();
    const { email, textarea, radio } = this.state;
    const avalia = { email, textarea, radio };
    addAvaliacao(avalia);
    // localStorage.setItem('chaveAvalicao', JSON.stringify(avalia)); // de obj para string
    this.recuperaDoStorage();
    this.setState({
      textarea: '',
      email: '',
      radio: '',
    });
  }

  recuperaDoStorage = () => {
    // const recuperaDados = JSON.parse(localStorage.getItem('chaveAvalicao')) || []; // de string para objeto
    const recuperaDados = getAvaliacaoProduto();
    this.setState({
      recuperaDados,
    });
  }

  render() {
    const {
      title,
      thumbnail,
      price,
      attributes,
      email,
      textarea,
      recuperaDados,
    } = this.state;
    // const dadosAvaliacao = [recuperaDados];
    return (
      <div data-testid="product-detail-name">
        <Link
          to="/shoppingcart"
          data-testid="shopping-cart-button"
        >
          <img
            className="shoppingcart"
            src="https://svgsilh.com/svg/155226.svg"
            alt="carrinho-de-compras"
          />
        </Link>
        <h4>
          {title}
        </h4>
        <img
          src={ thumbnail }
          alt="Imagem-do-Produto"
        />
        <div>
          {price}
        </div>
        <div>
          <ul>
            Especificações Técnicas
            {
              attributes.map((element, index) => (
                <li key={ index }>
                  {element.name}
                  :
                  {' '}
                  {element.value_name}
                </li>
              ))
            }
          </ul>
        </div>
        <div>
          <button
            data-testid="product-detail-add-to-cart"
            type="submit"
            onClick={ this.adicionarProduto }
          >
            Adicionar ao carrinho
          </button>
        </div>
        <form>
          <label htmlFor="email">
            Email
            <input
              data-testid="product-detail-email"
              type="email"
              value={ email }
              name="email"
              onChange={ this.formulario }
            />
          </label>
          <label htmlFor="rating">
            <input
              type="radio"
              value="1"
              name="radio"
              data-testid="1-rating"
              onChange={ this.formulario }
            />
            1
            <input
              type="radio"
              value="2"
              name="radio"
              data-testid="2-rating"
              onChange={ this.formulario }
            />
            2
            <input
              type="radio"
              value="3"
              name="radio"
              data-testid="3-rating"
              onChange={ this.formulario }
            />
            3
            <input
              type="radio"
              value="4"
              name="radio"
              data-testid="4-rating"
              onChange={ this.formulario }
            />
            4
            <input
              type="radio"
              value="5"
              name="radio"
              data-testid="5-rating"
              onChange={ this.formulario }
            />
            5
          </label>
          <div>
            <label htmlFor="product-detail-evaluation">
              <input
                id="product-detail-evaluation"
                data-testid="product-detail-evaluation"
                type="text"
                value={ textarea }
                name="textarea"
                onChange={ this.formulario }
              />
            </label>
          </div>
          <button
            data-testid="submit-review-btn"
            type="submit"
            onClick={ this.avaliacao }
          >
            Avaliar
          </button>
        </form>
        <div>
          {recuperaDados.map((element, index) => (
            <div key={ index }>
              <p>{ element.email }</p>
              <p>{ element.radio }</p>
              <p>{ element.textarea }</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
Details.propTypes = {
  title: PropTypes.string,
  thumbnail: PropTypes.string,
  price: PropTypes.string,
  keyNumber: PropTypes.number,
}.isRequired;
export default Details;
/* <ul>
                Especificações técnicas:
                <li>
                  { elemento.name }
                  ,
                  {' '}
                  {elemento.value_name}
                </li>
              </ul> */
