import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const ForgotPass = () => {
  // Estado para manejar el email
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(''); // Estado para mostrar el mensaje

  // Funcion que se ejecuta al presionar el botón de recuperar contraseña
  const handleSubmit = () => {
    // aqui es donde se busca el email en la base de datos y enviara la contraseña 

    // Simulamos que la contraseña se ha enviado al correo
    setMessage('La contraseña ha sido enviada a tu correo.');
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
            onChange={(e) => setEmail(e.target.value)} // Guardar el email
          />
        </div>

        <button
          onClick={handleSubmit} // aqui llamamos a la funcion para enviar el correo
          className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition mt-5"
        >
          Recuperar Contraseña
        </button>

        
        {message && ( //Mostrar mensaje despues de hacer clic en el boton
          <p className="mt-4 text-green-500">{message}</p>
        )}

        <div className="mt-5">
          <Link
            type="button"
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