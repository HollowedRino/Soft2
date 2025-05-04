import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export const RegisterUser = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [userData, setUserData] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    password: '',
    confirmPassword: '',
  });

  useEffect(() => {
    const usuariosGuardados = JSON.parse(localStorage.getItem('usuarios'));
    if (usuariosGuardados) {
      setUsuarios(usuariosGuardados);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRegister = () => {
    setUsuarios((prevUsuarios) => [...prevUsuarios, userData]);
    localStorage.setItem('usuarios', JSON.stringify([...usuarios, userData]));
    console.log('Usuario registrado:', userData);
    window.location.href = '/userOrderesMenu';
  };

  const Campotext = ({ placeholder, id, type, required, value, onChange, name }) => (
    <input
      type={type}
      id={id}
      placeholder={placeholder}
      className="block w-[400px] p-4 my-2 mx-auto text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
      required={required}
      value={value}
      onChange={onChange}
      name={name}
    />
  );

  return (
    <div className="flex justify-center items-center h-[90vh] bg-gray-200">
      <div className="text-center bg-white p-6 rounded-lg shadow-md relative w-[500px]">
        <p className="font-sans font-normal text-[20px] leading-[28px] mb-5 absolute top-5 w-full left-0">
          Registra una nueva cuenta
        </p>

        <div className="mt-10 mb-9">
          <Campotext
            placeholder="Nombre"
            type="text"
            name="nombre"
            value={userData.nombre}
            onChange={handleInputChange}
          />
          <Campotext
            placeholder="Apellido"
            type="text"
            name="apellido"
            value={userData.apellido}
            onChange={handleInputChange}
          />
          <Campotext
            placeholder="Correo"
            type="email"
            name="correo"
            value={userData.correo}
            onChange={handleInputChange}
          />
          <Campotext
            placeholder="Password"
            type="password"
            name="password"
            value={userData.password}
            onChange={handleInputChange}
          />
          <Campotext
            placeholder="Confirm Password"
            type="password"
            name="confirmPassword"
            value={userData.confirmPassword}
            onChange={handleInputChange}
          />
        </div>

        <button
          onClick={handleRegister}
          className="w-[280px] h-[50px] bg-black text-white font-semibold rounded-md hover:bg-gray-800 transition mx-auto block mt-5"
        >
          Crear nueva cuenta
        </button>

        <Link
          type="button"
          to="/login"
          className="text-black underline hover:text-gray-600 transition mt-6 block"
        >
          Regresar a login
        </Link>
      </div>
    </div>
  );
};

