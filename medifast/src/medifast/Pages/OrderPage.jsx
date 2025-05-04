import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckoutSteps } from '../components/CheckoutSteps';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

export const OrderPage = () => {
    const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState({
    orderId: '123456',
    items: [
      { name: 'Producto 1', quantity: 2, price: 20 },
      { name: 'Producto 2', quantity: 1, price: 15 },
    ],
    total: 55,
  });

    const handleBackToHome = () => {
        navigate('/');
    }

  return (
    <motion.section
      className="max-w-4xl mx-auto px-4 py-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <CheckoutSteps activeStep={2} /> 

      <div className="space-y-6">
        <h2 className="text-2xl font-semibold mb-4">Pedido realizado correctamente!</h2>

        <motion.div
          className="flex items-center justify-center text-green-500"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <ShoppingCartIcon className="h-12 w-12 mr-3" />
          <p className="text-lg font-medium">Tu pedido ha sido realizado con éxito.</p>
        </motion.div>

        <div className="mt-8 space-y-4">
          <h3 className="text-xl font-semibold">Detalles del pedido</h3>
          <div className="space-y-2">
            <p><strong>Fecha del pedido: </strong> FECHAAAAA</p>
            <p><strong>ID del pedido:</strong> {orderDetails.orderId}</p>
            <ul className="space-y-1">
              {orderDetails.items.map((item, index) => (
                <li key={index} className="flex justify-between">
                  <span>{item.name} (x{item.quantity})</span>
                  <span>${item.price * item.quantity}</span>
                </li>
              ))}
            </ul>
            <p className="font-semibold text-xl mt-2">
              <strong>Total:</strong> ${orderDetails.total}
            </p>
          </div>
        </div>

        <motion.button
          className="mt-10 w-full bg-green-600 text-white py-3 rounded-md font-semibold hover:bg-green-700 transition"
          onClick={handleBackToHome}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Volver a la página de inicio
        </motion.button>
      </div>
    </motion.section>
  );
};
