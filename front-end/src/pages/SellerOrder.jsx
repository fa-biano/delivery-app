import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import SellerNavBar from '../components/SellerNavBar';

export default function SellerOrder() {
  const [order, setOrder] = useState([]);

  const datatests = {
    orderId: 'seller_orders__element-order-id',
    orderStatus: 'seller_orders__element-delivery-status',
    orderDate: 'seller_orders__element-order-date',
    orderTotalPrice: 'seller_orders__element-card-price',
    orderAddress: 'seller_orders__element-card-address',
  };

  useEffect(() => {
    const fetchOrder = async () => {
      const result = await fetch('http://localhost:3001/seller/orders', {
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
      <SellerNavBar />
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
            <p data-testid={ `${datatests.orderAddress}-${item.id}` }>
              {`${item.deliveryAddress}, ${item.deliveryNumber}`}
            </p>
          </Link>
        </div>
      ))}
    </div>
  );
}
