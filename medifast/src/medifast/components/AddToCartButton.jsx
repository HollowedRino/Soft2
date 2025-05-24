import { TrashIcon } from "@heroicons/react/20/solid";
import { PlusIcon } from "@heroicons/react/24/solid";
import { useContext, useState, useEffect } from "react";
import { CartContext } from "../../contexts/CartProvider";
import { createItemCarrito, updateItemCarrito, getItemCarritoByCarritoIdMedicamentoId, deleteItemCarrito } from "../services/itemCarritoService";
import { UserContext } from "../../contexts/UserProvider";

export const AddToCartButton = ({ producto }) => {
  const { cart, cartItems, addToCart, removeFromCart } = useContext(CartContext);
  const [count, setCount] = useState(0);
  const { user } = useContext(UserContext);


  useEffect(() => {
      const itemInCart = cartItems.find(item => item.medicamento.id === producto.id);
      // console.log("itemEncontrado", itemInCart)
      // console.log(cartItems)
      setCount(itemInCart ? itemInCart.cantidad : 0);
    }, [cartItems, producto.id]);

  const handleAdd = async (e) => {
    e.stopPropagation();
    
    const { boticas, ...productoSinBoticas } = producto;
    const itemInCart = cartItems.find(item => item.medicamento.id === producto.id);
    const cantidadActual = itemInCart ? itemInCart.cantidad : 0;
    const nuevaCantidad = cantidadActual + 1;

    if (user.authStatus) {
      if (cantidadActual === 0) {
        await createItemCarrito({
          carrito_id: cart.id,
          medicamento_id: producto.id,
          cantidad: 1,
        });
      } else {
        await updateItemCarrito({
          carrito_id: cart.id,
          medicamento_id: producto.id,
          nuevaCantidad: nuevaCantidad,
        });
      }
    }
    addToCart(productoSinBoticas);
  };

  const handleSubtract = async (e) => {
    e.stopPropagation();

    const itemInCart = cartItems.find(item => item.medicamento.id === producto.id);
    if (!itemInCart) return; // Seguridad por si se intenta quitar algo que no está

    const cantidadActual = itemInCart.cantidad;
    const nuevaCantidad = cantidadActual - 1;

    if (user.authStatus) {
      if (nuevaCantidad === 0) {
        const resp = await getItemCarritoByCarritoIdMedicamentoId(cart.id, producto.id);
        const itemCarritoId = resp.resp.id;
        await deleteItemCarrito(itemCarritoId);
      } else {
        await updateItemCarrito({
          carrito_id: cart.id,
          medicamento_id: producto.id,
          nuevaCantidad: nuevaCantidad,
        });
      }
    }

      // Actualizar el contexto (quitar o reducir cantidad)
      removeFromCart(producto);
    };


  const isDisabled =
    producto.boticas.length === 0 ||
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
