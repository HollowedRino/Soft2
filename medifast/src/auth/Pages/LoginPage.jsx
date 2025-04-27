import React, { useState } from 'react';

export function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleForgotPassword = () => {
        // Redirigir a la página de recuperación de contraseña
 
    };

    const handleRegister = () => {
        // Redirigir a la página de registro
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-20 rounded-xl shadow-md w-140 mb-50 ">
                <p className="text-center text-xl font-light mb-6">Ingreso para clientes registrados</p>
                
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
                    className="w-full bg-gray-800 text-white py-3 rounded-md hover:bg-gray-500 focus:outline-none mb-4"   
                >
                    Ingresar
                </button>

                <div className="text-center">
                    <button
                        className="text-gray-800 text-sm hover:underline"
                        onClick={handleForgotPassword}
                    >
                        Olvidé mi password
                    </button>
                    <br />
                    <button
                        className="text-gray-800 text-sm hover:underline"
                        onClick={handleRegister}
                    >
                        No tengo cuenta, deseo registrarme
                    </button>
                </div>
            </div>
        </div>
    );
}
