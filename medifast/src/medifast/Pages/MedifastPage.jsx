import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { BuildingStorefrontIcon } from '@heroicons/react/24/outline'
import { UserIcon } from '@heroicons/react/24/solid'
import { MagnifyingGlassCircleIcon } from '@heroicons/react/24/solid'
import React from 'react'
import { Link } from 'react-router-dom'

export const MedifastPage = () => {
  return (
    <>
      <div className="flex flex-col py-10 px-4">
        <h1 className="text-5xl font-semibold mb-15 text-left px-50">
          ¿En qué le podemos ayudar?
        </h1>

        <div className="flex flex-wrap justify-between gap-8 w-full px-50">
          <Link
            to='/medicinas' 
            className="w-100 h-100 rounded-3xl" 
            style={{ backgroundColor: '#4CAF50' }}
          >
            <div className="flex flex-col items-center justify-center h-full text-black text-5xl font-semibold">
              <MagnifyingGlassIcon className="h-20 w-20 mb-4" />
              <span>Buscar</span>
              <span>medicinas</span>
            </div>
          </Link>
          <Link
            to='/boticas' 
            className="w-100 h-100 rounded-3xl" 
            style={{ backgroundColor: '#4CAF50' }}
          >
            <div className="flex flex-col items-center justify-center h-full text-black text-5xl font-semibold">
              <BuildingStorefrontIcon className="h-20 w-20 mb-4" />
              <span>Boticas</span>
              <span>cercanas</span>
            </div>
          </Link>
          <Link
            to='/asistencia-medica' 
            className="w-100 h-100 rounded-3xl" 
            style={{ backgroundColor: '#4CAF50' }}
          >
            <div className="flex flex-col items-center justify-center h-full text-black text-5xl font-semibold">
              <UserIcon className="h-20 w-20 mb-4" />
              <span>Asistencia</span>
              <span>medica</span>
            </div>
          </Link>
        </div>
      </div>
    </>
  )
}
