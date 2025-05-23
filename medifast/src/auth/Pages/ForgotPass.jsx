import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { sendResetPasswordEmail } from '../../firebase/providers';
export const ForgotPass = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    if (!email) {
      setMessage('Por favor ingresa un correo válido.');
      return;
    }

    const result = await sendResetPasswordEmail(email);

    if (result.ok) {
      setMessage('Se ha enviado un correo para restablecer tu contraseña.');
    } else {
      if (result.errorCode === 'auth/user-not-found') {
        setMessage('El correo no está registrado.');
      } else {
        setMessage(`Error: ${result.errorMessage}`);
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-full">
      <div className="text-center bg-white p-6 rounded-lg shadow-md relative w-[600px] h-85 mb-15 mt-15">
        <p className="font-semibold text-[18px] mb-5">
          Ingrese su correo para recuperar la contraseña
        </p>

        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded-md mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition mt-5"
        >
          Recuperar Contraseña
        </button>

        {message && (
          <p className={`mt-4 ${message.includes('Error') ? 'text-red-500' : 'text-green-500'}`}>
            {message}
          </p>
        )}

        <div className="mt-5">
          <Link
            to="/login"
            className="text-black underline hover:text-gray-600 transition"
          >
            Regresar a login
          </Link>
        </div>
      </div>
    </div>
  );
};