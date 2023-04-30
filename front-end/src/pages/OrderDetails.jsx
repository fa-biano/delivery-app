import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import NavBar from '../components/NavBar';

export default function OrderDetails({ match }) {
  const [order, setOrder] = useState([]);
  const [products, setProducts] = useState([]);
  const [orderStatus, setOrderStatus] = useState('');

  const datatests = {
    orderId: 'customer_order_details__element-order-details-label-order-id',
    sellerName:
      'customer_order_details__element-order-details-label-seller-name',
    orderDate: 'customer_order_details__element-order-details-label-order-date',
    orderStatus:
      'customer_order_details__element-order-details-label-delivery-status',
    orderTotalPrice: 'customer_order_details__element-order-total-price',
    orderItemNumber: 'customer_order_details__element-order-table-item-number',
    orderItemName: 'customer_order_details__element-order-table-name',
    orderItemQuantity: 'customer_order_details__element-order-table-quantity',
    orderItemPrice: 'customer_order_details__element-order-table-unit-price',
    orderItemSubtotal: 'customer_order_details__element-order-table-sub-total',
    buttonDeliveryCheck: 'customer_order_details__button-delivery-check',
  };

  useEffect(() => {
    const fetchOrder = async () => {
      const { id } = match.params;
      const result = await fetch(
        `http://localhost:3001/customer/orders/${id}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            authorization: JSON.parse(localStorage.getItem('user')).token,
          },
        },
      );
      const data = await result.json();

      setOrder(data);
      setOrderStatus(data[0].status);

      const ordersWithProducts = data.map((orderItem) => {
        const productsWithQuantity = orderItem.products.map((product) => {
          const salesProduct = orderItem.salesProducts.find(
            (sp) => sp.productId === product.id,
          );
          return {
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: salesProduct.quantity,
            subTotal: salesProduct.quantity * product.price,
          };
        });
        return {
          ...orderItem,
          productsWithQuantity,
        };
      });

      const productsWithQuantity = ordersWithProducts.flatMap(
        (orderItem) => orderItem.productsWithQuantity,
      );

      setProducts(productsWithQuantity);
    };
    fetchOrder();
  }, []);

  const handleOrder = async (status) => {
    const { id } = match.params;
    const result = await fetch(`http://localhost:3001/customer/orders/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        authorization: JSON.parse(localStorage.getItem('user')).token,
      },
      body: JSON.stringify({ status }),
    });
    const data = await result.json();
    setOrderStatus(data.status);
  };

  const formatDate = (date) => moment(date).format('DD/MM/YYYY');

  return (
    <div>
      <NavBar />
      <h1>Detalhe do Pedido</h1>
      {order.map((item, index) => (
        <div key={ index }>
          <p data-testid={ datatests.orderId }>{`Pedido ${item.id}`}</p>
          <p data-testid={ datatests.sellerName }>
            {`P.Vend: ${item.seller.name}`}
          </p>
          <p data-testid={ datatests.orderDate }>
            {`${formatDate(item.saleDate)}`}
          </p>
          <p data-testid={ datatests.orderStatus }>{`${orderStatus}`}</p>
          <button
            type="button"
            data-testid={ datatests.buttonDeliveryCheck }
            disabled={ orderStatus !== 'Em Trânsito' }
            onClick={ () => handleOrder('Entregue') }
          >
            Marcar como entregue
          </button>
        </div>
      ))}
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Preço Unitário</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={ index }>
              <td data-testid={ datatests.orderItemNumber }>{index + 1}</td>
              <td data-testid={ datatests.orderItemName }>{product.name}</td>
              <td data-testid={ datatests.orderItemQuantity }>
                {product.quantity}
              </td>
              <td data-testid={ datatests.orderItemPrice }>
                {Number(product.price).toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </td>
              <td data-testid={ datatests.orderItemSubtotal }>
                {Number(product.subTotal).toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h1 data-testid={ datatests.orderTotalPrice }>
        {`Total: ${Number(order[0]?.totalPrice).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })}`}
      </h1>
    </div>
  );
}

OrderDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
