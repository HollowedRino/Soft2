// src/routes/PrivateRoute.jsx
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../contexts/UserProvider';

export const AdminRoutes = ({ children }) => {

  const { user } = useContext(UserContext);

  return (user.state === "admin" && user.authStatus === true) ? children : <Navigate to="/login" replace />;
};
