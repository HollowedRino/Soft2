import { TrashIcon } from "@heroicons/react/20/solid";
import { PlusIcon } from "@heroicons/react/24/solid";
import { useContext, useState, useEffect } from "react";
import { CartContext } from "../../contexts/CartProvider";
import { addItemCarrito } from "../services/itemCarritoService";

export const AddToCartButton = ({ producto }) => {
  const { cart, cartItems, addToCart, removeFromCart } = useContext(CartContext);
  const [count, setCount] = useState(0);


  // Actualiza el contador cuando cambia el carrito
  useEffect(() => {
    const itemInCart = cartItems.find(item => item.id === producto.id);
    setCount(itemInCart ? itemInCart.quantity : 0);
  }, [cartItems, producto.id]);

  const handleAdd = (e) => {
    // addItemCarrito({
    //   "carrito_id": cart.id,
    //   "medicamento_id": producto.id,
    //   "cantidad": count,
    // });
    e.stopPropagation();
    addToCart({
      id: producto.id,
      nombre: producto.nombre,
    });
  };

  const handleSubtract = (e) => {
    e.stopPropagation();
    removeFromCart(producto.id);
  };

  const isDisabled = producto.boticas.length === 0 ||
    producto.boticas.every(botica => botica.inventario.cantidad_disponible === 0);

  const preventPropagation = (e) => e.stopPropagation();

  return count === 0 ? (
    <button
      className={`${
        isDisabled
          ? "bg-gray-400 text-gray-200 cursor-not-allowed"
          : "bg-green-600 hover:bg-green-700 text-white hover:scale-[1.02] cursor-pointer"
      } px-5 py-2 rounded-lg font-semibold transition-transform`}
      onClick={handleAdd}
      disabled={isDisabled}
    >
      Agregar al carrito
    </button>
  ) : (
    <div className="flex justify-center items-center">
      <div
        className="flex items-center bg-gray-100 px-3 py-2 rounded-lg w-fit gap-3"
        onClick={preventPropagation}
      >
        <button
          onClick={handleSubtract}
          className="text-black-500 hover:text-red-700 px-2 py-1 transition-transform hover:scale-[1.05]"
        >
          <TrashIcon className="h-5 w-5" />
        </button>
        <span className="text-lg font-medium">{count}</span>
        <button
          onClick={handleAdd}
          className="text-black font-bold rounded-md px-2 py-1 transition-transform hover:scale-[1.02] cursor-pointer"
        >
          <PlusIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};
