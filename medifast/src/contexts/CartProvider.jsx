import { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  // Añadir producto al carrito (en formato deseado)
  const addToCart = (medicamento) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.medicamento.id === medicamento.id);

      if (existingItem) {
        return prevItems.map(item =>
          item.medicamento.id === medicamento.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      } else {
        const newItem = {
          cantidad: 1,
          medicamento_id: medicamento.id,
          medicamento: medicamento
        };
        return [...prevItems, newItem];
      }
    });
  };

  // Remover una unidad de producto del carrito
  const removeFromCart = (producto) => {
    setCartItems(prevItems =>
      prevItems.flatMap(item => {
        if (item.medicamento_id === producto.id) {
          if (item.cantidad > 1) {
            return { ...item, cantidad: item.cantidad - 1 };
          } else {
            return [];
          }
        }
        return item;
      })
    );
  };


  const clearCart = () => {
    setCartItems([]);
    setCart(null);
  };

  const loadCartFromServer = (dataFromApi) => {
    const { id, fecha_actualizacion, items } = dataFromApi;
    setCart({ id, fecha_actualizacion });

    setCartItems(items.map((item) => ({
      id: item.id,
      cantidad: item.cantidad,
      medicamento_id: item.medicamento.id,
      medicamento: item.medicamento
    })));
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
