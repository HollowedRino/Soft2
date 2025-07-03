import { createContext, useEffect, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [coupon, setCoupon] = useState('');

  // Leer del localStorage al cargar
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    const savedCartItems = localStorage.getItem('cartItems');
    const savedCoupon = localStorage.getItem('coupon');

    if (savedCart && savedCartItems) {
      setCart(JSON.parse(savedCart));
      setCartItems(JSON.parse(savedCartItems));
    }
    if (savedCoupon) setCoupon(savedCoupon);
  }, []);

  // Sincronizar cupón en localStorage
  useEffect(() => {
    localStorage.setItem('coupon', coupon);
  }, [coupon]);

  // Limpiar cupón si el carrito queda vacío
  useEffect(() => {
    if (cartItems.length === 0 && coupon) {
      setCoupon('');
      localStorage.removeItem('coupon');
    }
  }, [cartItems, coupon]);

  const syncLocalStorage = (newCartItems, newCart = cart) => {
    localStorage.setItem('cartItems', JSON.stringify(newCartItems));
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const syncCartItemsLocalStorage = (newCartItems) => {
    localStorage.setItem('cartItems', JSON.stringify(newCartItems));
  };

  const addToCart = (medicamento) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.medicamento.id === medicamento.id);
      let updatedItems;

      if (existingItem) {
        updatedItems = prevItems.map(item =>
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
        updatedItems = [...prevItems, newItem];
      }

      syncLocalStorage(updatedItems);
      return updatedItems;
    });
  };

  const removeFromCart = (producto) => {
    setCartItems(prevItems => {
      const updatedItems = prevItems.flatMap(item => {
        if (item.medicamento_id === producto.id) {
          if (item.cantidad > 1) {
            return { ...item, cantidad: item.cantidad - 1 };
          } else {
            return [];
          }
        }
        return item;
      });

      syncLocalStorage(updatedItems);
      return updatedItems;
    });
  };

  const deleteFromCart = (producto) => {
    setCartItems(prevItems => {
      const updatedItems = prevItems.filter(item => item.medicamento_id !== producto.id);
      syncLocalStorage(updatedItems);
      return updatedItems;
    });
  };

  const deleteOnlyItemsCart = () => {
    setCartItems([]);
    syncCartItemsLocalStorage([]);
  }

  const clearCart = () => {
    setCartItems([]);
    setCart(null);
    setCoupon('');
    syncLocalStorage([], null);
    localStorage.removeItem('coupon');
  };

  const loadCartFromServer = (dataFromApi) => {
    const { id, fecha_actualizacion, items } = dataFromApi;
    const newCart = { id, fecha_actualizacion };

    const newCartItems = items.map((item) => ({
      id: item.id,
      cantidad: item.cantidad,
      medicamento_id: item.medicamento.id,
      medicamento: item.medicamento
    }));

    setCart(newCart);
    setCartItems(newCartItems);
    syncLocalStorage(newCartItems, newCart);
  };

  // Lógica para aplicar cupón
  const applyCoupon = (code) => {
    if (code.trim().toLowerCase() === 'descuento10') {
      setCoupon(code);
      return true;
    } else {
      setCoupon('');
      return false;
    }
  };

  // Calcula el descuento dinámicamente según el total y el cupón
  const getDiscount = (total) => {
    if (coupon.trim().toLowerCase() === 'descuento10') {
      return total * 0.1;
    }
    return 0;
  };

  return (
    <CartContext.Provider value={{
      cart,
      cartItems,
      addToCart,
      removeFromCart,
      clearCart,
      loadCartFromServer,
      deleteFromCart,
      deleteOnlyItemsCart,
      coupon,
      applyCoupon,
      getDiscount
    }}>
      {children}
    </CartContext.Provider>
  );
};