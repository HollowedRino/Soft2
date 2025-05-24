import {
  ChevronDownIcon,
  UserIcon,
} from '@heroicons/react/16/solid';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { useContext, useEffect, useState, useRef } from 'react';
import { UserContext } from '../../contexts/UserProvider';
import { motion, AnimatePresence } from 'framer-motion';
import { SearchBar } from './SearchBar';
import { CartContext } from '../../contexts/CartProvider';

const fadeDown = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

export const Navbar = () => {
  const { user } = useContext(UserContext);
  const { cartItems } = useContext(CartContext);
  const [total, setTotal] = useState(0);
  const [animateBadge, setAnimateBadge] = useState(false);
  const prevTotal = useRef(0);

  const getTotalCantidad = (items) =>
    items.reduce((total, item) => total + item.cantidad, 0);

  useEffect(() => {
    const newTotal = getTotalCantidad(cartItems);

    // Animar si cambia (suba o baje)
    if (newTotal !== prevTotal.current) {
      setAnimateBadge(true);
      setTimeout(() => setAnimateBadge(false), 300); // duración animación
    }

    prevTotal.current = newTotal;
    setTotal(newTotal);
  }, [cartItems]);

  const badgeVariants = {
    initial: { scale: 1 },
    animate: {
      scale: [1, 1.4, 1],
      transition: { duration: 0.4, ease: 'easeInOut' },
    },
  };

  return (
    <motion.nav
      variants={fadeDown}
      initial="hidden"
      animate="visible"
      className="bg-white shadow-md"
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-20 py-3 flex flex-col lg:flex-row items-center justify-between gap-4 flex-wrap">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex flex-col lg:flex-row items-center flex-grow gap-4"
        >
          <Link
            to="/"
            className="flex items-center space-x-3 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
          >
            <img
              src="https://res.cloudinary.com/dgxakgsuo/image/upload/v1745558934/b70d2277bb620e474ae830f58c44ad6b8583dfc6_fvmncj.png"
              alt="Medifast Logo"
              className="h-10 w-10 hover:img-[#41b541]"
            />
            <span className="text-xl font-bold text-black-600">Medifast</span>
          </Link>

          <SearchBar />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex items-center space-x-4"
        >
          {user.authStatus ? (
            <Link
              to="/userProfile"
              className="flex items-center text-white bg-[#41b541] hover:bg-gray-700 px-4 py-2 rounded-md text-sm transition-all duration-300 hover:scale-[1.02] cursor-pointer"
            >
              <UserIcon className="h-6 w-6 mr-2" />
              {user.name}
              <ChevronDownIcon
                aria-hidden="true"
                className="-mr-1 size-5 text-white-500"
              />
            </Link>
          ) : (
            <Link
              to="/login"
              className="text-white bg-green-600 hover:bg-gray-700 px-4 py-2 rounded-md text-sm transition-all duration-300"
            >
              Iniciar sesión
            </Link>
          )}

          <div className="flex flex-col items-center">
            <div className="relative">
              <Link
                to="/mycart"
                className="text-sm text-black-500 hover:underline"
              >
                <ShoppingCartIcon className="h-6 w-6 text-gray-700 cursor-pointer hover:text-[#41b541] transition-all duration-300 hover:scale-[1.02]" />
                <AnimatePresence>
                  {total > 0 && (
                    <motion.span
                      key={total}
                      className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5"
                      initial="initial"
                      animate={animateBadge ? 'animate' : 'initial'}
                      variants={badgeVariants}
                    >
                      {total}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
};
