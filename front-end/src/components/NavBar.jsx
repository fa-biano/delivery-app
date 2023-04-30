import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AppContext from '../context/AppContext';

export default function NavBar() {
  const { user, setUser } = useContext(AppContext);

  useEffect(() => {
    const fetchUser = async () => {
      const loginUser = JSON.parse(localStorage.getItem('user'));
      setUser(loginUser);
    };
    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
  };

  return (
    <div>
      <div>
        <Link to="/customer/products">
          <p data-testid="customer_products__element-navbar-link-products">
            Produtos
          </p>

        </Link>
        <Link to="/customer/orders">
          <p data-testid="customer_products__element-navbar-link-orders">
            Meus Pedidos
          </p>

        </Link>
        <p data-testid="customer_products__element-navbar-user-full-name">
          { user.name }
        </p>
        <Link to="/" onClick={ handleLogout }>
          <p data-testid="customer_products__element-navbar-link-logout">
            Sair
          </p>
        </Link>
      </div>
    </div>
  );
}

NavBar.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
