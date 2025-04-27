import React, { useState } from 'react';
import { Link } from 'react-router-dom';
export const ForgotPass= () => {
  const [email, setEmail] = useState('');

  const regresarLogin = () => {
 
  };

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = () => {
    console.log('Enviar email para recuperar contraseña:', email);
    // lógica real para enviar el correo
  };

  
  const CampoText = ({ placeholder, type, value, onChange }) => (
    <input
      type={type}
      placeholder={placeholder}
      className="block w-[360px] p-2.5 my-2 mx-auto text-base border border-gray-300 rounded-md text-center focus:outline-none focus:ring-2 focus:ring-black"
      required
      value={value}
      onChange={onChange}
    />
  );

  return (
    <div className="flex justify-center items-center h-[90vh] bg-gray-200">
      <div className="text-center bg-white p-6 rounded-lg shadow-md relative w-[600px] h-85">
        
        <p className="font-semibold text-[18px] mb-5">
          Ingrese su correo para enviar contraseña
        </p>

        <div className="my-8">
          <CampoText
            placeholder="Email"
            type="email"
            value={email}
            onChange={handleInputChange}
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-[360px] h-[50px] bg-black text-white font-semibold rounded-md hover:bg-gray-800 transition mx-auto block mt-5"
        >
          Ingresar
        </button>

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
}

export default ForgotPass;
