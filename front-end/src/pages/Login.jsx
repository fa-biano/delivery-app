import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

export default function Login({ history }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const validEmailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const minLengthPassword = 6;

  const isButtonDisabled = validEmailRegex
    .test(email) && password.length >= minLengthPassword;

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      const errorNumber = 404;
      const successNumber = 200;

      if (result.status === errorNumber) {
        setErrorMsg('Usuário não cadastrado');
      }

      if (result.status === successNumber) {
        setErrorMsg('');

        const user = {
          name: result.user.name,
          email: result.user.email,
          role: result.user.role,
          token: result.token,
        };

        localStorage.setItem('user', JSON.stringify(user));

        if (result.user.role === 'seller') {
          return history.push('/seller/orders');
        }

        if (result.user.role === 'administrator') {
          return history.push('/admin/manage');
        }

        history.push('/customer/products');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (history.location.pathname === '/' || history.location.pathname === '/login') {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user?.role === 'customer') {
        return history.push('/customer/products');
      }

      if (user?.role === 'seller') {
        return history.push('/seller/orders');
      }

      if (user?.role === 'administrator') {
        return history.push('/admin/manage');
      }
      history.push('/login');
    }
  }, [history]);

  return (
    <div>
      <p>Delivery</p>
      <div>
        <input
          type="text"
          placeholder="Email"
          value={ email }
          onChange={ handleEmail }
          data-testid="common_login__input-email"
        />
        <input
          type="password"
          placeholder="Senha"
          value={ password }
          onChange={ handlePassword }
          data-testid="common_login__input-password"
        />
      </div>
      <button
        type="button"
        data-testid="common_login__button-login"
        disabled={ !isButtonDisabled }
        onClick={ handleLogin }
      >
        Login
      </button>
      {errorMsg && (
        <p data-testid="common_login__element-invalid-email">{errorMsg}</p>
      )}
      <button
        type="button"
        data-testid="common_login__button-register"
        onClick={ () => history.push('/register') }
      >
        Ainda não tenho conta
      </button>
    </div>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
    push: PropTypes.func.isRequired,
  }).isRequired,
};
