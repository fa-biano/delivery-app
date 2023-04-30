import PropTypes from 'prop-types';
import React, { useState, useMemo } from 'react';
import AppContext from './AppContext';

function Provider({ children }) {
  const [user, setUser] = useState({
    email: '',
    password: '',
    role: '',
    token: '',
  });

  const [products, setProducts] = useState([]);

  const context = useMemo(() => ({
    user,
    setUser,
    products,
    setProducts,
  }), [user, products]);

  return (
    <AppContext.Provider value={ context }>
      {children}
    </AppContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
