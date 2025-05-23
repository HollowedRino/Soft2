import { createContext, useEffect, useState } from 'react';

export const UserContext = createContext();

const initialUser = {
  id: null,
  name: '',
  lastName: '',
  email: '',
  address: '',
  phoneNumber: '',
  state: '',
  authStatus: false,
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : initialUser;
  });

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  const login = (userData) => {
    const adaptedUser = {
      id: userData.id,
      name: userData.nombre || '',
      lastName: userData.apellido || '',
      email: userData.email || '',
      address: '',
      phoneNumber: userData.telefono_usuario || '',
      state: userData.estado || 'Cliente',
      authStatus: true,
    };
    setUser(adaptedUser);
  };

  const updateAddress = (direccion) => {
    setUser((prevUser) => ({
      ...prevUser,
      address: direccion,
    }));
  };

  const logout = () => setUser(initialUser);

  return (
    <UserContext.Provider value={{ user, login, logout, updateAddress }}>
      {children}
    </UserContext.Provider>
  );
};
