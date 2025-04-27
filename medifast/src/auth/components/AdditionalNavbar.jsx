import { Link, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

export const AdditionalNavbar = () => {
  const [showNavbar, setShowNavbar] = useState(false);
  const location = useLocation(); // Hook para obtener la ruta actual

  useEffect(() => {
    // Muestra el navbar adicional solo en rutas específicas
    if (location.pathname !== '/') {
      setShowNavbar(true); // Muestra el navbar adicional en estas rutas
    } else {
      setShowNavbar(false); // Oculta el navbar adicional en otras rutas
    }
  }, [location]); // Se ejecuta cada vez que cambia la ruta

  if (!showNavbar) return null; // Si no se debe mostrar, no renderiza nada

  return (
    <div className="bg-green-600 p-2 shadow-md">
      <div className="flex space-x-4 items-center justify-between px-40">
        <Link to="/medicamentos" className="text-white hover:underline font-bold text-xl">Medicamentos</Link>
        <Link to="/medicamentos-naturales" className="text-white hover:underline font-bold text-xl">Medicamentos Naturales</Link>
        <Link to="/adulto-mayor" className="text-white hover:underline font-bold text-xl">Adulto Mayor</Link>
        <Link to="/infantil" className="text-white hover:underline font-bold text-xl">Infantil</Link>
        <Link to="/belleza" className="text-white hover:underline font-bold text-xl">Belleza</Link>
        <Link to="/vitaminas" className="text-white hover:underline font-bold text-xl">Vitaminas y Suplementos</Link>
      </div>
    </div>
  );
};
