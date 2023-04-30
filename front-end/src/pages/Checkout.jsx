import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import NavBar from '../components/NavBar';

export default function Checkout({ history }) {
  const products = JSON.parse(localStorage.getItem('cartItems'));
  const [cartItems, setCartItems] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [totalValue, setTotalValue] = useState(0);
  const [address, setAddress] = useState('');
  const [addressNumber, setAddressNumber] = useState('');

  const datatests = {
    itemNumber: 'customer_checkout__element-order-table-item-number-',
    itemName: 'customer_checkout__element-order-table-name-',
    itemQuantity: 'customer_checkout__element-order-table-quantity-',
    itemPrice: 'customer_checkout__element-order-table-unit-price-',
    itemSubTotal: 'customer_checkout__element-order-table-sub-total-',
    itemRemove: 'customer_checkout__element-order-table-remove-',
    itemTotalPrice: 'customer_checkout__element-order-total-price',
    sellerSelect: 'customer_checkout__select-seller',
    addressInput: 'customer_checkout__input-address',
    addressNumber: 'customer_checkout__input-address-number',
    submitOrder: 'customer_checkout__button-submit-order',
  };

  useEffect(() => {
    const fetchCartItems = () => {
      setCartItems(products);
    };
    const fetchTotalValue = async () => {
      const result = products.reduce((acc, curr) => acc + curr.subTotal, 0);
      setTotalValue(result);
    };
    fetchCartItems();
    fetchTotalValue();
  }, []);

  useEffect(() => {
    const fetchSellers = async () => {
      const result = await fetch('http://localhost:3001/customer/checkout', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: JSON.parse(localStorage.getItem('user')).token,
        },
      });
      const data = await result.json();
      setSellers(data);
    };
    fetchSellers();
  }, []);

  const removeItem = (index) => {
    const newProducts = products.filter((product, i) => i !== index);
    localStorage.setItem('cartItems', JSON.stringify(newProducts));
    setCartItems(newProducts);
    setTotalValue(newProducts.reduce((acc, curr) => acc + curr.subTotal, 0));
  };

  const handleCheckout = async () => {
    const payload = cartItems.map((product) => ({
      productId: product.id,
      quantity: product.quantity,
    }));

    const result = await fetch('http://localhost:3001/customer/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: JSON.parse(localStorage.getItem('user')).token,
      },
      body: JSON.stringify({
        sellerId: sellers[0].id,
        totalPrice: totalValue,
        deliveryAddress: `${address}`,
        deliveryNumber: addressNumber,
        products: payload,
      }),
    });

    const data = await result.json();
    if (data.orderId) {
      localStorage.removeItem('cartItems');
      history.push(`/customer/orders/${data.orderId}`);
    }
  };

  return (
    <div>
      <NavBar />
      <h2>Finalizar Pedido</h2>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Sub-total</th>
            <th>Remover Item</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((product, index) => (
            <tr key={ product.id }>
              <td data-testid={ `${datatests.itemNumber}-${index}` }>
                {index + 1}
              </td>
              <td data-testid={ `${datatests.itemName}-${index}` }>
                {product.name}
              </td>
              <td data-testid={ `${datatests.itemQuantity}-${index}` }>
                {product.quantity}
              </td>
              <td data-testid={ `${datatests.itemPrice}-${index}` }>
                {Number(product.price).toLocaleString('pt-BR', {
                  maximumFractionDigits: 2,
                  minimumFractionDigits: 2,
                })}
              </td>
              <td data-testid={ `${datatests.itemSubTotal}-${index}` }>
                {product.subTotal.toLocaleString('pt-BR', {
                  maximumFractionDigits: 2,
                  minimumFractionDigits: 2,
                })}
              </td>
              <td>
                <button
                  type="button"
                  data-testid={ `${datatests.itemRemove}-${index}` }
                  onClick={ () => removeItem(index) }
                >
                  Remover
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <p data-testid={ datatests.itemTotalPrice }>
          {`Total: ${totalValue.toLocaleString('pt-BR', {
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
          })}`}
        </p>
      </table>
      <h2>Detalhes da pessoa vendedora</h2>
      <table>
        <thead>
          <tr>
            <th>P. Vendedora Responsável</th>
            <th>Endereço</th>
            <th>Número</th>
          </tr>
        </thead>
        <tbody>
          {sellers.map((seller) => (
            <tr key={ seller.id }>
              <td>
                <select
                  name="seller"
                  id="seller"
                  data-testid={ datatests.sellerSelect }
                >
                  <option value={ seller.id }>{seller.name}</option>
                </select>
              </td>
              <td>
                <input
                  type="text"
                  data-testid={ datatests.addressInput }
                  onChange={ (event) => setAddress(event.target.value) }
                />
              </td>
              <td>
                <input
                  type="text"
                  data-testid={ datatests.addressNumber }
                  onChange={ (event) => setAddressNumber(event.target.value) }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        type="button"
        data-testid={ datatests.submitOrder }
        onClick={ handleCheckout }
      >
        Finalizar Pedido
      </button>
    </div>
  );
}

Checkout.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
