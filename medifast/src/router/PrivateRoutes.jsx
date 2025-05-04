// src/routes/PrivateRoute.jsx
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

export const PrivateRoutes = ({ children }) => {

  const { user } = useContext(UserContext);

  return user.authStatus ? children : <Navigate to="/login" replace />;
};

