import React from 'react'
import { MyCartItem } from '../components/MyCartItem'

export const MyCartPage = () => {
  return (
    <div className="flex flex-col py-5 px-15">
      <h1 className="text-2xl font-semibold mb-3 text-left">
        Mi carrito (1)
      </h1>

      <div className="flex flex-col md:flex-row justify-between gap-8 w-full px-10 bg-green-100 p-10 min-h-screen">
        {/* Productos */}
        <div className="flex flex-col gap-4 w-full md:w-2/3 bg-white p-6 rounded-lg shadow-md h-full">
          {/* Contenedor con overflow condicional */}
          <div className="overflow-x-auto md:overflow-x-visible"> {/* Overflow solo en móvil */}
            <div className="min-w-[600px]"> {/* Fuerza overflow en móviles */}
              <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md">
                <table className="w-full">
                  <thead className="text-font-extralight">
                    <tr className="text-center text-gray-400">
                      <th className="px-4 py-2"></th>
                      <th className="px-4 py-2">Productos</th>
                      <th className="px-4 py-2">Presentación</th>
                      <th className="px-4 py-2">Cantidad</th>
                      <th className="px-4 py-2">Subtotal</th>
                      <th className="px-4 py-2"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <MyCartItem />
                    <MyCartItem />
                  
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Resumen de compra */}
        <div className="flex flex-col justify-center w-full md:w-1/3 bg-white p-6 rounded-lg shadow-md h-60">
          <h2 className="text-xl font-semibold mb-6">Resumen de compra</h2>
          <div className="flex justify-between text-gray-600 mb-2">
            <p>Subtotal:</p>
            <p>$59.97</p>
          </div>
          <div className="flex justify-between text-gray-600 mb-2">
            <p>Total:</p>
            <p>$64.97</p>
          </div>
          <div className="flex justify-center">
            <button className="bg-green-600 text-white px-6 py-3 rounded-2xl w-1/2 transition-all duration-300 hover:bg-green-700">
              Proceder al pago
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
