import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const  LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleForgotPassword = () => {
        // Redirigir a la página de recuperación de contraseña
        window.location.href = '/restorePassword';
    };

    const handleRegister = () => {
        // Redirigir a la página de registro
        window.location.href = '/register';
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-20 rounded-xl shadow-md w-140 mb-50 ">
                <p className="text-center text-xl font-normal mb-6">Ingreso para clientes registrados</p>
                
                <div className="mb-4">
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full p-3 border border-gray-300 rounded-md mb-4"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full p-3 border border-gray-300 rounded-md"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button
                    className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 focus:outline-none mb-4"   
                >
                    Ingresar
                </button>



                
                



                <div className="text-center">
                    <Link
                        className="text-gray-800 text-sm hover:underline"
                        to = "/forgotpass"
                    >
                        Olvidé mi password
                    </Link>
                    <br />
                    <Link
                        className="text-gray-800 text-sm hover:underline"
                        to = "/registro"
                    >
                        No tengo cuenta, deseo registrarme
                    </Link>
                </div>
            </div>
        </div>
    );
}
