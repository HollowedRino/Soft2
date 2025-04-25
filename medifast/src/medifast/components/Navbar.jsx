import { MagnifyingGlassIcon } from '@heroicons/react/16/solid';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { Link } from 'react-router-dom';

export const Navbar = ({ cartCount = 0 }) =>{
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-1 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-5">
          <Link to="/" >
            <div className="flex items-center space-x-3">
              <img src="https://res.cloudinary.com/dgxakgsuo/image/upload/v1745558934/b70d2277bb620e474ae830f58c44ad6b8583dfc6_fvmncj.png" alt="Medifast Logo" className="h-10 w-10" />
              <span className="text-xl font-bold text-black-600">Medifast</span>
            </div>
          </Link>

          <div className="flex flex-grow space-x-4 mx-6 max-w-xl">
            <input
              type="text"
              placeholder="Buscar una marca o un producto"
              className="w-full border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
            <button className="bg-green-600 text-white p-2 rounded-full hover:bg-gray-700">
              <MagnifyingGlassIcon className='h-5 w-5'/>
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-6 relative">
          <Link to="/login" className="text-white bg-green-600 hover:bg-gray-700 px-4 py-2 rounded-md text-sm">
            Iniciar sesión
          </Link>
          
          <div className="flex flex-col items-center">
            <Link to="/contacto" className="text-sm text-black-500 hover:underline">
              Contáctenos
            </Link>
            <div className="relative">
              <Link to="/carrito" className="text-sm text-black-500 hover:underline">
                <ShoppingCartIcon className="h-6 w-6 text-gray-700 cursor-pointer" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>

        </div>
      </div>
    </nav>
  );
}
