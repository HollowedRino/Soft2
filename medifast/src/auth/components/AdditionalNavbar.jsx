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
        <Link to="/medicamentos" className="text-white hover:underline font-bold text-base sm:text-lg">Medicamentos</Link>
        <Link to="/medicamentos-naturales" className="text-white hover:underline font-bold text-base sm:text-lg">Medicamentos Naturales</Link>
        <Link to="/adulto-mayor" className="text-white hover:underline font-bold text-base sm:text-lg">Adulto Mayor</Link>
        <Link to="/infantil" className="text-white hover:underline font-bold text-base sm:text-lg">Infantil</Link>
        <Link to="/belleza" className="text-white hover:underline font-bold text-base sm:text-lg">Belleza</Link>
        <Link to="/vitaminas" className="text-white hover:underline font-bold text-base sm:text-lg">Vitaminas y Suplementos</Link>
      </div>
    </div>
  );
};
