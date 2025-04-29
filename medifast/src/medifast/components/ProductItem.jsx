import { BuildingStorefrontIcon, TruckIcon } from '@heroicons/react/16/solid'
import React from 'react'

export const ProductItem = () => {
  return (
    <article className="bg-white rounded-3xl shadow-md p-4 w-full sm:max-w-xs transition-transform hover:scale-[1.02]">
        <img
            src="https://res.cloudinary.com/dgxakgsuo/image/upload/v1745927069/a4483dc3ae132b2ed181456f7232f5b6926cf91e_xq4jie.png"
            alt="Imagen de producto"
            className="w-full h-40 object-contain rounded-t-lg mb-2"
        />
        <p className="text-gray-500 break-words">SOBRE X2 TABS 1 UN</p>
        <p className="text-lg font-semibold mb-2 break-words">
            Panadol Antigripal NF Tableta
        </p>
        <div className="flex flex-col gap-2">
            <div className="flex justify-left items-center rounded-lg px-2 gap-2">
            <div className="flex items-center gap-2 bg-green-100 rounded-lg px-1">
                <BuildingStorefrontIcon className="h-5 w-5 text-gray-500 bg-gray-300 rounded-lg p-1" />
                <span className="font-semibold text-gray-600">BTL</span>
            </div>
            <div className="flex items-center gap-2 bg-green-100 rounded-lg px-1">
                <BuildingStorefrontIcon className="h-5 w-5 text-gray-500 bg-gray-300 rounded-lg p-1" />
                <span className="flex font-semibold text-gray-600">
                Hogar y Salud
                </span>
            </div>
            </div>
            <div className="flex justify-between items-center">
            <span className="font-bold">S/. 2.88</span>
            <div className="flex items-center">
                <BuildingStorefrontIcon className="h-8 w-8 text-gray-500 rounded-lg p-1" />
                <TruckIcon className="h-8 w-8 text-gray-500 rounded-lg p-1" />
            </div>
            </div>
            <button
            className="bg-green-600 text-white rounded-lg py-2 hover:bg-green-700 transition-all duration-300 font-semibold"
            onClick={() => console.log("Agregar al carrito")}
            >
            Agregar al carrito
            </button>
        </div>
    </article>
  )
}
