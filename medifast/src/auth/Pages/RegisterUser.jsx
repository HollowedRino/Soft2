import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUserWithEmailPassword } from '../../firebase/providers';
import { registerUserInBackend } from '../../medifast/services/UserService';
export const RegisterUser = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = async () => {
    setErrorMessage('');

    const nombre = document.querySelector('input[name="nombre"]').value.trim();
    const apellido = document.querySelector('input[name="apellido"]').value.trim();
    const email = document.querySelector('input[name="correo"]').value.trim();
    const telefono = document.querySelector('input[name="telefono"]').value.trim();
    const password = document.querySelector('input[name="password"]').value;
    const confirmPassword = document.querySelector('input[name="confirmPassword"]').value;

    if (!nombre || !apellido || !email || !telefono || !password || !confirmPassword) {
      setErrorMessage('Por favor completa todos los campos.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrorMessage('El correo no tiene un formato válido.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Las contraseñas no coinciden.');
      return;
    }

    try {
      const result = await registerUserWithEmailPassword({
        email,
        password,
        displayName: `${nombre} ${apellido}`
      });

      if (!result.ok) {
        const customMessage = getFirebaseErrorMessage(result.errorCode);
        setErrorMessage(customMessage);
        return;
      }

      const backendResult = await registerUserInBackend({
        nombre,
        apellido,
        email,
        contrasena: password,
        telefono_usuario: telefono,
        estado: true
      });

      if (!backendResult.ok) {
        setErrorMessage(`Error en backend: ${backendResult.errorMessage}`);
        return;
      }

      navigate('/login');
    } catch (err) {
      setErrorMessage('Ocurrió un error inesperado. Intenta nuevamente.');
      console.error(err);
    }
  };

  const Campotext = ({ placeholder, type, name }) => (
    <input
      type={type}
      placeholder={placeholder}
      className="block w-[400px] p-4 my-2 mx-auto text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
      name={name}
    />
  );

  const getFirebaseErrorMessage = (code) => {
    switch (code) {
      case 'auth/email-already-in-use':
        return 'El correo ya está registrado.';
      case 'auth/invalid-email':
        return 'El correo no es válido.';
      case 'auth/weak-password':
        return 'La contraseña debe tener al menos 6 caracteres.';
      case 'auth/missing-password':
        return 'Por favor, escribe una contraseña.';
      default:
        return 'Ocurrió un error inesperado. Intenta de nuevo.';
    }
  };

  return (
    <div className="flex justify-center items-center mb-5 mt-5">
      <div className="text-center bg-white p-6 rounded-lg shadow-md relative w-[500px]">
        <p className="font-sans font-normal text-[20px] leading-[28px] mb-5 absolute top-5 w-full left-0">
          Registra una nueva cuenta
        </p>

        <div className="mt-10 mb-4">
          <Campotext placeholder="Nombre" type="text" name="nombre" />
          <Campotext placeholder="Apellido" type="text" name="apellido" />
          <Campotext placeholder="Correo" type="email" name="correo" />
          <Campotext placeholder="Teléfono" type="text" name="telefono" />
          <Campotext placeholder="Contraseña" type="password" name="password" />
          <Campotext placeholder="Confirmar Contraseña" type="password" name="confirmPassword" />
        </div>

        {errorMessage && (
          <p className="text-red-600 font-medium text-sm mt-2">{errorMessage}</p>
        )}

        <button
          onClick={handleRegister}
          className="w-[280px] h-[50px] bg-black text-white font-semibold rounded-md hover:bg-gray-800 transition mx-auto block mt-5"
        >
          Crear nueva cuenta
        </button>

        <Link
          to="/login"
          className="text-black underline hover:text-gray-600 transition mt-6 block"
        >
          Regresar a login
        </Link>
      </div>
    </div>
  );
};
