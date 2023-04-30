import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AppContext from '../context/AppContext';

export default function AdminNavBar() {
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
        <Link to="/admin/manage">
          <p data-testid="customer_products__element-navbar-link-orders">
            Gerenciar Usuários
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

AdminNavBar.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
