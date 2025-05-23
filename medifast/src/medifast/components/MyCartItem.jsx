import { useContext, useState } from "react";
import { CartContext } from "../../contexts/CartProvider";
import { UserContext } from "../../contexts/UserProvider";
import {
  updateItemCarrito,
  deleteItemCarrito,
  getItemCarritoByCarritoIdMedicamentoId,
} from "../services/itemCarritoService";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

const traducciones = {
  medications: "Medicamentos",
  "natural-medicines": "Medicamentos Naturales",
  "older-adult": "Adulto Mayor",
  childish: "Infantil",
  beauty: "Belleza",
  vitamins: "Vitaminas y Suplementos",
};

export const MyCartItem = ({ item }) => {
  const { addToCart, removeFromCart, deleteFromCart, cart } = useContext(CartContext);
  const { user } = useContext(UserContext);
  const [quantity, setQuantity] = useState(item.cantidad || 1);

  const categoriaTraducida = traducciones[item.medicamento.categoria] || "Categoría desconocida";

  const handleIncrease = async () => {
    const nuevaCantidad = quantity + 1;

    if (user.authStatus) {
      await updateItemCarrito({
        carrito_id: cart.id,
        medicamento_id: item.medicamento.id,
        nuevaCantidad: nuevaCantidad,
      });
    }

    setQuantity(nuevaCantidad);
    addToCart(item.medicamento);
  };

  const handleDecrease = async () => {
    if (quantity === 1) return; // No permitimos bajar de 1 aquí (el botón de Eliminar se encarga de 0)

    const nuevaCantidad = quantity - 1;

    if (user.authStatus) {
      await updateItemCarrito({
        carrito_id: cart.id,
        medicamento_id: item.medicamento.id,
        nuevaCantidad: nuevaCantidad,
      });
    }

    setQuantity(nuevaCantidad);
    removeFromCart(item.medicamento);
  };

  const handleDelete = async () => {
    if (user.authStatus) {
      const resp = await getItemCarritoByCarritoIdMedicamentoId(cart.id, item.medicamento.id);
      const itemCarritoId = resp.resp.id;
      await deleteItemCarrito(itemCarritoId);
    }

    deleteFromCart(item.medicamento);
  };

  return (
    <motion.tr
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      layout
      className="text-center"
    >
      <td className="px-4 py-2">
        <img
          src={item.medicamento.imagen_url}
          alt={`Imagen de ${item.medicamento.nombre}`}
          className="w-20 h-20 rounded-full bg-green-100 object-cover"
        />
      </td>
      <td className="px-4 py-2">
        <div className="text-lg font-semibold mb-2 break-words">
          {item.medicamento.nombre}
        </div>
        <div className="text-gray-500">{item.medicamento.descripcion}</div>
      </td>
      <td className="px-4 py-2">{categoriaTraducida}</td>
      <td className="px-4 py-2">
        <button onClick={handleDecrease} className="px-2 py-1 bg-gray-200 hover:bg-gray-400 rounded-lg transition-all duration-200">
          <MinusIcon className="h-4 w-4" />
        </button>
        <span className="mx-2 font-semibold">{quantity}</span>
        <button onClick={handleIncrease} className="px-2 py-1 bg-gray-200 rounded-lg hover:bg-gray-400 transition-all duration-200">
          <PlusIcon className="h-4 w-4" />
        </button>
      </td>
      <td className="px-4 py-2 font-semibold">
        S/. {(item.medicamento.precio * quantity).toFixed(2)}
      </td>
      <td className="px-4 py-2">
        <button
          onClick={handleDelete}
          className="flex items-center gap-2 px-3 py-1.5 text-white bg-red-500 hover:bg-red-600 rounded-lg shadow-sm transition-all duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
          Eliminar
        </button>
      </td>
    </motion.tr>
  );
};
