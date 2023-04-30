import React, { useEffect, useState } from 'react';
import AdminNavBar from '../components/AdminNavBar';

export default function Admin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [role, setRole] = useState('seller');
  const [users, setUsers] = useState([]);

  const validEmailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const minLengthPassword = 6;
  const minLengthName = 12;

  const url = 'http://localhost:3001/admin/manage';
  const contentType = 'application/json';

  const isButtonDisabled = validEmailRegex.test(email)
    && password.length >= minLengthPassword
    && name.length >= minLengthName;

  const datatests = {
    inputName: 'admin_manage__input-name',
    inputEmail: 'admin_manage__input-email',
    inputPassword: 'admin_manage__input-password',
    registerButton: 'admin_manage__button-register',
    selectRole: 'admin_manage__select-role',
    elementItemNumber: 'admin_manage__element-user-table-item-number',
    elementUserName: 'admin_manage__element-user-table-name',
    elementUserEmail: 'admin_manage__element-user-table-email',
    elementUserRole: 'admin_manage__element-user-table-role',
    elementUserRemove: 'admin_manage__element-user-table-remove',
    elementError: 'admin_manage__element-invalid-register',
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': contentType,
          authorization: JSON.parse(localStorage.getItem('user')).token,
        },
      });
      const result = await response.json();
      setUsers(result);
    };
    fetchUsers();
  }, []);
  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleName = (event) => {
    setName(event.target.value);
  };

  const handleRole = (event) => {
    setRole(event.target.value);
  };

  const handleRegister = async () => {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': contentType,
          authorization: JSON.parse(localStorage.getItem('user')).token,
        },
        body: JSON.stringify({ email, password, name, role }),
      });

      const result = await response.json();

      const errorNumber = 409;
      const successNumber = 201;

      if (result.status === errorNumber) {
        setErrorMsg('Usuário já cadastrado');
      }

      if (result.status === successNumber) {
        setErrorMsg('');
      }

      setUsers([...users, result]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': contentType,
          authorization: JSON.parse(localStorage.getItem('user')).token,
        },
        body: JSON.stringify({ userId: id }),
      });
      const newUsers = users.filter((user) => user.id !== id);
      setUsers(newUsers);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <AdminNavBar />
      <h2>Cadastrar novo usuário</h2>
      <div>
        Nome
        <input
          type="text"
          data-testid={ datatests.inputName }
          placeholder="Seu nome"
          onChange={ handleName }
          value={ name }
        />
        Email
        <input
          type="text"
          data-testid={ datatests.inputEmail }
          placeholder="seu-email@site.com.br"
          onChange={ handleEmail }
          value={ email }
        />
        Senha
        <input
          type="password"
          data-testid={ datatests.inputPassword }
          placeholder="********"
          onChange={ handlePassword }
          value={ password }
        />
        Tipo
        <select
          data-testid={ datatests.selectRole }
          defaultValue={ role }
          onChange={ handleRole }
        >
          <option value="seller">seller</option>
          <option value="customer">customer</option>
          <option value="administrator">administrator</option>
        </select>
        {errorMsg && <p data-testid={ datatests.elementError }>{errorMsg}</p>}
        <button
          type="button"
          data-testid={ datatests.registerButton }
          disabled={ !isButtonDisabled }
          onClick={ handleRegister }
        >
          Cadastrar
        </button>
      </div>

      <h2>Lista de usuários</h2>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Tipo</th>
            <th>Excluir</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={ index }>
              <td data-testid={ `${datatests.elementItemNumber}-${index}` }>
                {index + 1}
              </td>
              <td data-testid={ `${datatests.elementUserName}-${index}` }>
                {user.name}
              </td>
              <td data-testid={ `${datatests.elementUserEmail}-${index}` }>
                {user.email}
              </td>
              <td data-testid={ `${datatests.elementUserRole}-${index}` }>
                {user.role}
              </td>
              <td>
                <button
                  type="button"
                  data-testid={ `${datatests.elementUserRemove}-${index}` }
                  onClick={ () => handleDelete(user.id) }
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
