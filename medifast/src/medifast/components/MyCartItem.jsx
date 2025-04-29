import React, { useState } from 'react'
import { DropdownPresentation } from './DropdownPresentation'
export const MyCartItem = () => {
  const [quantity, setQuantity] = useState(1)

  const increaseQuantity = () => setQuantity(prev => prev + 1)
  const decreaseQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1))

  return (
    <tr className="text-center">
      <td className="px-4 py-2">
        <img 
          src='https://res.cloudinary.com/dgxakgsuo/image/upload/v1745927069/a4483dc3ae132b2ed181456f7232f5b6926cf91e_xq4jie.png' 
          alt="Medicamento A" 
          className="w-20 h-20 rounded-full bg-green-100" 
        />
      </td>
      <td className="px-4 py-2">
        <p>Panadol Antigripal NF Tableta</p>
        <p className="text-gray-500">SOBRE X2 TABS 1 UN</p>
      </td>
      <td className="px-4 py-2">
        <DropdownPresentation value={"Tubo"} />
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
