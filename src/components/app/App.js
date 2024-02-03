import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';

import { AdvertPage, AdvertsPage, NewAdvertPage } from '../adverts';
import { LoginPage, RequireAuth } from '../auth';
import NotFoundPage from './NotFoundPage';
import Layout from '../layout';


import { authLoginSuccess } from '../../store/action';

function App() {
  const dispatch = useDispatch();

  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  React.useEffect(() => {
    // Leer el token del LocalStorage al iniciar la aplicación
    const token = localStorage.getItem('token');

    if (token) {
      // Si el token existe, marcar al usuario como autenticado
      dispatch(authLoginSuccess());
    }
  }, [dispatch]);


  return (
    <Routes>
      <Route
        path="/adverts"
        element={
          isAuthenticated ? (
          <RequireAuth>
            <Layout />
          </RequireAuth>
          ) : (
            <Navigate to="/login" /> // Redirige al inicio de sesión si no está autenticado
          )
        }
      >
        <Route index element={<AdvertsPage />} />
        <Route path="new" element={<NewAdvertPage />} />
        <Route path=":advertId" element={<AdvertPage />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/404" element={<Layout />}>
        <Route index element={<NotFoundPage />} />
      </Route>
      <Route path="/" element={<Navigate to="/adverts" />} />
      <Route path="*" element={<Navigate to="/404" />} />
    </Routes>
  );
}

export default App;
