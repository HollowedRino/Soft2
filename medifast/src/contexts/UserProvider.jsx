import { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: 'AlesW', //Esto
    lastName: '', //Esto
    email: '', //Esto
    address: '',
    phoneNumber: '',
    state: '', //Cliente o Admin
    authStatus: true, //Cambiar cuando se loguea
  });

  const login = (userData) => {
    // Adaptar y transformar solo los campos necesarios
    const adaptedUser = {
      name: userData.nombre || '',             // <- Transformación
      lastName: userData.apellido || '',
      email: userData.email || '',
      address: '',
      phoneNumber: userData.telefono_usuario || '',
      state: userData.estado || 'Cliente',        // <- valor por defecto
      authStatus: true,                        // <- marcado como logueado
    };

    setUser(adaptedUser);
  };

  const updateAddress = (direccion) => {
    setUser((prevUser) => ({
      ...prevUser,
      addres: direccion,
    }));
  };
  
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
    <UserContext.Provider value={{ user, login, logout, updateAddress }}>
      {children}
    </UserContext.Provider>
  );
};

