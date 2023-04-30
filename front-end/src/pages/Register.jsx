import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function Register({ history }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const validEmailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const minLengthPassword = 6;
  const minLengthName = 12;

  const isButtonDisabled = validEmailRegex.test(email)
    && password.length >= minLengthPassword
    && name.length >= minLengthName;

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleName = (event) => {
    setName(event.target.value);
  };

  const handleRegister = async () => {
    try {
      const response = await fetch('http://localhost:3001/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name }),
      });

      const result = await response.json();

      const errorNumber = 409;
      const successNumber = 201;

      if (result.status === errorNumber) {
        setErrorMsg('Usuário já cadastrado');
      }

      if (result.status === successNumber) {
        setErrorMsg('');
        history.push('/customer/products');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      Cadastro
      <div>
        Nome
        <input
          type="text"
          data-testid="common_register__input-name"
          placeholder="Seu nome"
          onChange={ handleName }
          value={ name }
        />
        Email
        <input
          type="text"
          data-testid="common_register__input-email"
          placeholder="seu-email@site.com.br"
          onChange={ handleEmail }
          value={ email }
        />
        Senha
        <input
          type="password"
          data-testid="common_register__input-password"
          placeholder="********"
          onChange={ handlePassword }
          value={ password }
        />
        {errorMsg && (
          <p data-testid="common_register__element-invalid_register">{errorMsg}</p>
        )}
        <button
          type="button"
          data-testid="common_register__button-register"
          disabled={ !isButtonDisabled }
          onClick={ handleRegister }
        >
          Cadastrar
        </button>
      </div>
    </div>
  );
}

Register.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
    push: PropTypes.func.isRequired,
  }).isRequired,
};
