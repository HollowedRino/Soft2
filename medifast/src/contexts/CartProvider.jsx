import { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Estado para carrito completo
  const [cart, setCart] = useState(null);
  // Estado solo para items (lista de productos con cantidad)
  const [cartItems, setCartItems] = useState([]);

  // Añadir producto al carrito (incrementa cantidad si existe)
  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  // Remover producto completo del carrito
  const removeFromCart = (productId) => {
    setCartItems(prevItems =>
      prevItems.filter(item => item.id !== productId)
    );
  };

  // Vaciar carrito
  const clearCart = () => {
    setCartItems([]);
    setCart(null);
  };

  // Cargar carrito completo desde backend al loguear
  const loadCartFromServer = (dataFromApi) => {
    const { id, fecha_actualizacion, items } = dataFromApi;

    // Guardamos solo los datos necesarios del carrito
    setCart({ id, fecha_actualizacion });

    // Transformamos los items para el estado cartItems
    setCartItems(
      items.map((item) => ({
        item_carrito_id: item.id,
        id: item.medicamento.id,
        nombre: item.medicamento.nombre,
        descripcion: item.medicamento.descripcion,
        fabricante: item.medicamento.fabricante,
        categoria: item.medicamento.categoria,
        precio: item.medicamento.precio,
        requiere_receta: item.medicamento.requiere_receta,
        estado_medicamento: item.medicamento.estado_medicamento,
        imagen_url: item.medicamento.imagen_url,
        quantity: item.cantidad,
      }))
    );
  };

  return (
    <CartContext.Provider value={{
      cart,
      cartItems,
      addToCart,
      removeFromCart,
      clearCart,
      loadCartFromServer
    }}>
      {children}
    </CartContext.Provider>
  );
};
