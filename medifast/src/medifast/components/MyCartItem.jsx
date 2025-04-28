import React, { useState } from 'react'
import { DropdownPresentacion } from './DropdownPresentacion'

export const MyCartItem = () => {
  const [quantity, setQuantity] = useState(1)

  const increaseQuantity = () => setQuantity(prev => prev + 1)
  const decreaseQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1))

  return (
    <tr className="text-center">
      <td className="px-4 py-2">
        <img alt="Medicamento A" className="w-12 h-12 rounded-full" />
      </td>
      <td className="px-4 py-2">
        <p>Panadol Antigripal NF Tableta</p>
        <p className="text-gray-500">SOBRE X2 TABS 1 UN</p>
      </td>
      <td className="px-4 py-2">
        <DropdownPresentacion />
      </td>
      <td className="px-4 py-2">
        <button
          onClick={decreaseQuantity}
          className="px-2 py-1 bg-gray-200 rounded-lg"
        >
          -
        </button>
        <span className="mx-2">{quantity}</span>
        <button
          onClick={increaseQuantity}
          className="px-2 py-1 bg-gray-200 rounded-lg"
        >
          +
        </button>
      </td>
      <td className="px-4 py-2">${(19.99 * quantity).toFixed(2)}</td>
      <td className="px-4 py-2">
        <button className="text-red-500 hover:text-red-700">Eliminar</button>
      </td>
    </tr>
  )
}
