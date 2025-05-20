import { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: 'AlesW',
    lastName: '',
    email: '',
    password: '',
    addres: '',
    phoneNumber: '',
    state: '',
    authStatus: false,
  });

  const login = (userData) => setUser(userData);
  const logout = () => setUser({
    name: '',
    lastName: '',
    email: '',
    password: '',
    addres: '',
    phoneNumber: '',
    state: '',
    authStatus: false,
  });

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

