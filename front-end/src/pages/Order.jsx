import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';

export default function Order() {
  const [order, setOrder] = useState([]);

  const datatests = {
    orderId: 'customer_orders__element-order-id',
    orderStatus: 'customer_orders__element-delivery-status',
    orderDate: 'customer_orders__element-order-date',
    orderTotalPrice: 'customer_orders__element-card-price',
  };

  useEffect(() => {
    const fetchOrder = async () => {
      const result = await fetch('http://localhost:3001/customer/orders', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: JSON.parse(localStorage.getItem('user')).token,
        },
      });
      const data = await result.json();
      setOrder(data);
    };
    fetchOrder();
  }, []);

  const formatDate = (date) => moment(date).format('DD/MM/YYYY');

  return (
    <div>
      <NavBar />
      {order.map((item, index) => (
        <div key={ index }>
          <Link to={ `orders/${item.id}` }>
            <p
              data-testid={ `${datatests.orderId}-${item.id}` }
            >
              {`Pedido ${item.id}`}

            </p>
            <p
              data-testid={ `${datatests.orderStatus}-${item.id}` }
            >
              {`${item.status}`}

            </p>
            <p data-testid={ `${datatests.orderDate}-${item.id}` }>
              {`${formatDate(
                item.saleDate,
              )}`}

            </p>
            <p data-testid={ `${datatests.orderTotalPrice}-${item.id}` }>
              {`${Number(item.totalPrice).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}`}
            </p>
          </Link>
        </div>
      ))}
    </div>
  );
}
