import { TrashIcon } from "@heroicons/react/20/solid";
import { PlusIcon } from "@heroicons/react/24/solid";
import { useContext, useState, useEffect } from "react";
import { CartContext } from "../../contexts/CartProvider";

export const AddToCartButton = ({ producto }) => {
  const { cartItems, addToCart, removeFromCart } = useContext(CartContext);
  const [count, setCount] = useState(0);

  useEffect(() => {
  console.log("🛒 Carrito actualizado:", cartItems);
  }, [cartItems]);


  // Sincronizar con contexto si se recarga o ya hay productos agregados
  useEffect(() => {
    const itemInCart = cartItems.find((item) => item.id === producto.id);
    setCount(itemInCart ? itemInCart.quantity : 0);
  }, [cartItems, producto.id]);

  const handleAdd = (e) => {
    e.stopPropagation();
    addToCart({
      id: producto.id,
      nombre: producto.nombre
    });
  };

  const handleSubtract = (e) => {
    e.stopPropagation();
    const itemInCart = cartItems.find((item) => item.id === producto.id);
    if (!itemInCart) return;

    if (itemInCart.quantity <= 1) {
      removeFromCart(producto.id);
    } else {
      // Reagrega con cantidad reducida (usa addToCart + lógica de incremento)
      // o implementa un `updateQuantity` en el context
      // Pero como no está definido, lo manejaremos solo eliminando si queda 0
      removeFromCart(producto.id);
      for (let i = 0; i < itemInCart.quantity - 1; i++) {
        addToCart({
          id: producto.id,
          nombre: producto.nombre
        });
      }
    }
  };

  const preventPropagation = (e) => {
    e.stopPropagation();
  };

  return count === 0 ? (
    <button
      className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg font-semibold transition-transform hover:scale-[1.02] cursor-pointer"
      onClick={handleAdd}
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
