import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const AdditionalNavbar = () => {
  const [showNavbar, setShowNavbar] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setShowNavbar(location.pathname !== '/');
  }, [location]);

  if (!showNavbar) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="bg-green-600 p-2 shadow-md"
    >
      <div className="flex flex-wrap items-center justify-around gap-4 px-4 sm:px-10 md:px-20 lg:px-40">
        <Link to="/category/medications" className="text-white hover:underline font-bold text-base sm:text-lg">Medicamentos</Link>
        <Link to="/category/natural-medicines" className="text-white hover:underline font-bold text-base sm:text-lg">Medicamentos Naturales</Link>
        <Link to="/category/older-adult" className="text-white hover:underline font-bold text-base sm:text-lg">Adulto Mayor</Link>
        <Link to="/category/childish" className="text-white hover:underline font-bold text-base sm:text-lg">Infantil</Link>
        <Link to="/category/beauty" className="text-white hover:underline font-bold text-base sm:text-lg">Belleza</Link>
        <Link to="/category/vitamins" className="text-white hover:underline font-bold text-base sm:text-lg">Vitaminas y Suplementos</Link>
      </div>
    </motion.div>
  );
};
