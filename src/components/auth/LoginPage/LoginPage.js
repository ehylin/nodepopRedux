import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { authLogin } from '../../../store/action'; // Asegúrate de importar la acción de inicio de sesión adecuada
import LoginForm from './LoginForm';

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const isLoading = useSelector(state => state.auth.isLoading);
  const error = useSelector(state => state.auth.error);

  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const handleSubmit = () => {
    // Realizar la llamada a la acción de inicio de sesión en Redux
    dispatch(authLogin(credentials))
      .then(() => {
        if (isAuthenticated) {
          const from = location.state?.from?.pathname || '/';
          navigate(from);
        }
      });
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setCredentials(prevCredentials => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  return (
    <div>
      <LoginForm
        onSubmit={handleSubmit}
        isLoading={isLoading}
        credentials={credentials}
        onInputChange={handleInputChange}
      />
      {isLoading && <p>...login in nodepop</p>}
      {error && (
        <div style={{ color: 'red' }}>
          {error.message}
        </div>
      )}
    </div>
  );
}

export default LoginPage;
