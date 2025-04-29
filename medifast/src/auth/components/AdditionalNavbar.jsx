import { Link, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

export const AdditionalNavbar = () => {
  const [showNavbar, setShowNavbar] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== '/') {
      setShowNavbar(true);
    } else {
      setShowNavbar(false);
    }
  }, [location]);

  if (!showNavbar) return null;

  return (
    <div className="bg-green-600 p-2 shadow-md">
      <div className="flex flex-wrap items-center justify-around gap-4 px-4 sm:px-10 md:px-20 lg:px-40">
        <Link to="/category/medications" className="text-white hover:underline font-bold text-base sm:text-lg">Medicamentos</Link>
        <Link to="/category/natural-medicines" className="text-white hover:underline font-bold text-base sm:text-lg">Medicamentos Naturales</Link>
        <Link to="/category/older-adult" className="text-white hover:underline font-bold text-base sm:text-lg">Adulto Mayor</Link>
        <Link to="/category/childish" className="text-white hover:underline font-bold text-base sm:text-lg">Infantil</Link>
        <Link to="/category/beauty" className="text-white hover:underline font-bold text-base sm:text-lg">Belleza</Link>
        <Link to="/category/vitamins" className="text-white hover:underline font-bold text-base sm:text-lg">Vitaminas y Suplementos</Link>
      </div>
    </div>
  );
};
