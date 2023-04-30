import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import AppContext from '../context/AppContext';

export default function Customer({ history }) {
  const { products, setProducts } = useContext(AppContext);
  const [totalValue, setTotalValue] = useState(0);
  useEffect(() => {
    const fetchProducts = async () => {
      const result = await fetch('http://localhost:3001/customer/products', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: JSON.parse(localStorage.getItem('user')).token,
        },
      });
      const data = await result.json();
      const newProduct = data.map((product) => ({
        ...product,
        quantity: 0,
        subTotal: 0,
      }));
      setProducts(newProduct);
    };
    fetchProducts();
  }, []);

  const handleStorage = () => {
    const newCartItems = products.filter((product) => product.quantity > 0);
    setTotalValue(newCartItems.reduce((acc, curr) => acc + curr.subTotal, 0));
    localStorage.setItem('cartItems', JSON.stringify(newCartItems));
  };
  useEffect(() => {
    handleStorage();
  }, [products]);

  const handleAddItem = (product) => {
    const { id } = product;
    setProducts(
      products.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            quantity: Number(item.quantity) + 1,
            subTotal: Number(item.price) * Number(item.quantity + 1),
          };
        }
        return item;
      }),
    );
  };

  const handleRemoveItem = (product) => {
    const { id } = product;
    setProducts(
      products.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            quantity:
              Number(item.quantity) - 1 <= 0 ? 0 : Number(item.quantity) - 1,
            subTotal: Number(item.price) * Number(item.quantity - 1),
          };
        }
        return item;
      }),
    );
  };

  const handleInputQuantity = (event, product) => {
    const { id } = product;
    setProducts(
      products.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            quantity: Number(event.target.value),
            subTotal: Number(item.price) * Number(event.target.value),
          };
        }
        return item;
      }),
    );
  };

  const handleCart = () => {
    history.push('/customer/checkout');
  };

  return (
    <div>
      <NavBar />
      <div>
        {products.map((product, index) => (
          <div key={ index }>
            <p
              data-testid={ `customer_products__element-card-title-${product.id}` }
            >
              {product.name}
            </p>
            <p
              data-testid={ `customer_products__element-card-price-${product.id}` }
            >
              {Number(product.price).toLocaleString('pt-br', {
                style: 'currency',
                currency: 'BRL',
              })}
            </p>
            <button
              type="button"
              data-testid={ `customer_products__button-card-add-item-${product.id}` }
              onClick={ () => handleAddItem(product) }
            >
              +
            </button>
            <input
              type="number"
              data-testid={ `customer_products__input-card-quantity-${product.id}` }
              value={ product.quantity }
              onChange={ (event) => handleInputQuantity(event, product) }
            />
            <button
              type="button"
              data-testid={ `customer_products__button-card-rm-item-${product.id}` }
              onClick={ () => handleRemoveItem(product) }
            >
              -
            </button>
            <img
              src={ product.urlImage }
              alt="product"
              data-testid={ `customer_products__img-card-bg-image-${product.id}` }
            />
          </div>
        ))}
        <button
          type="button"
          data-testid="customer_products__button-cart"
          onClick={ handleCart }
          disabled={ totalValue === 0 }
        >
          Ver Carrinho:
          <span data-testid="customer_products__checkout-bottom-value">
            {totalValue.toLocaleString('pt-br', {
              maximumFractionDigits: 2,
              minimumFractionDigits: 2,
            })}
          </span>
        </button>
      </div>
    </div>
  );
}

Customer.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
