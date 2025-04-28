import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { BuildingStorefrontIcon } from '@heroicons/react/24/outline';
import { UserIcon } from '@heroicons/react/24/solid';
import React from 'react';
import { Link } from 'react-router-dom';

export const MedifastPage = () => {
  return (
    <div className="flex flex-col py-10 px-4 sm:px-10 md:px-20 lg:px-40">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-10 text-left">
        ¿En qué le podemos ayudar?
      </h1>

      <div className="flex flex-wrap justify-center gap-20 w-full">
        <Link
          to="/medicinas"
          className="w-72 h-72 rounded-3xl flex flex-col items-center justify-center bg-green-600 hover:bg-green-700 transition-all duration-300"
        >
          <MagnifyingGlassIcon className="h-20 w-20 mb-4 text-white" />
          <span className="text-white text-xl font-semibold">Buscar</span>
          <span className="text-white text-xl font-semibold">medicinas</span>
        </Link>

        <Link
          to="/boticas"
          className="w-72 h-72 rounded-3xl flex flex-col items-center justify-center bg-green-600 hover:bg-green-700 transition-all duration-300"
        >
          <BuildingStorefrontIcon className="h-20 w-20 mb-4 text-white" />
          <span className="text-white text-xl font-semibold">Boticas</span>
          <span className="text-white text-xl font-semibold">cercanas</span>
        </Link>

        <Link
          to="/asistencia-medica"
          className="w-72 h-72 rounded-3xl flex flex-col items-center justify-center bg-green-600 hover:bg-green-700 transition-all duration-300"
        >
          <UserIcon className="h-20 w-20 mb-4 text-white" />
          <span className="text-white text-xl font-semibold">Asistencia</span>
          <span className="text-white text-xl font-semibold">médica</span>
        </Link>
      </div>
    </div>
  );
}
