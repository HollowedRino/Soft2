import { ChevronDownIcon, MagnifyingGlassIcon, UserIcon } from '@heroicons/react/16/solid';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';

export const Navbar = ({ cartCount = 0 }) =>{

  let { user } = useContext(UserContext);



  return (
    <div>
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="mx-auto px-4 sm:px-6 lg:px-20 py-3 flex flex-col lg:flex-row items-center justify-between gap-4 flex-wrap">
          
          {/* Logo y Buscador */}
          <div className="flex flex-col lg:flex-row items-center flex-grow gap-4">
            <Link to="/" className="flex items-center space-x-3 transition-all duration-300">
              <img src="https://res.cloudinary.com/dgxakgsuo/image/upload/v1745558934/b70d2277bb620e474ae830f58c44ad6b8583dfc6_fvmncj.png" alt="Medifast Logo" className="h-10 w-10" />
              <span className="text-xl font-bold text-black-600">Medifast</span>
            </Link>

            <div className="flex w-full lg:w-auto flex-grow items-center space-x-2 mx-4">
              <input
                type="text"
                placeholder="Buscar una marca o un producto"
                className="w-full border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
              <button className="bg-green-600 text-white p-2 rounded-full hover:bg-gray-700 transition-all duration-300">
                <MagnifyingGlassIcon className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Usuario y Carrito */}
          <div className="flex items-center space-x-4">
            {
              (user.authStatus) ? (
                <Link to="/login" className="flex items-center text-white bg-green-600 hover:bg-gray-700 px-4 py-2 rounded-md text-sm">
                  <UserIcon className="h-6 w-6 mr-2" />
                  {user.name}
                  <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-white-500" />
                </Link>
              ) : (
                <Link to="/login" className="text-white bg-green-600 hover:bg-gray-700 px-4 py-2 rounded-md text-sm transition-all duration-300">
                  Iniciar sesión
                </Link>
              )
            }

            <div className="flex flex-col items-center">
              <Link to="/contacto" className="text-sm text-black-500 hover:underline">
                Contáctenos
              </Link>
              <div className="relative">
                <Link to="/mycart" className="text-sm text-black-500 hover:underline">
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
    </div>
  );
}
