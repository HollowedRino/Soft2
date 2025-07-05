import React from 'react';
import { motion } from 'framer-motion';
import { CheckoutSteps } from '../components/CheckoutSteps';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { useNavigate, useLocation } from 'react-router-dom';

export const OrderPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { pedido, pedidoDetalles } = location.state || {};

  if (!pedido || !pedidoDetalles) {
    // Si alguien entra directo sin pasar por la compra
    return (
      <div className="text-center py-10 text-red-500">
        No hay información del pedido disponible.
      </div>
    );
  }

  const handleBackToHome = () => {
    navigate('/');
  };

  const subtotal = pedidoDetalles.reduce(
    (sum, item) => sum + item.precio_unitario * item.cantidad,
    0
  );
  const descuento = pedido.descuento || 0;
  const totalFinal = pedido.total_final ?? (subtotal - descuento);

  return (
    <motion.section
      className="max-w-4xl mx-auto px-4 py-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <CheckoutSteps activeStep={2} />

      <div className="space-y-6">
        <h2 className="text-2xl font-semibold mb-4">¡Pedido realizado correctamente!</h2>

        <motion.div
          className="flex items-center justify-center text-green-500"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <ShoppingCartIcon className="h-12 w-12 mr-3" />
          <p className="text-lg font-medium">Tu pedido ha sido registrado con éxito.</p>
        </motion.div>

        <div className="mt-8 space-y-4">
          <h3 className="text-xl font-semibold">Detalles del pedido</h3>
          <div className="space-y-2">
            <p><strong>Fecha del pedido:</strong> {new Date(pedido.fecha_pedido).toLocaleDateString()}</p>
            <p><strong>ID del pedido:</strong> {pedido.id}</p>
            <ul className="space-y-1">
              {pedidoDetalles.map((item, index) => (
                <li key={index} className="flex justify-between">
                  <span>{item.medicamento?.nombre || `Medicamento ID ${item.medicamento_id}`} (x{item.cantidad})</span>
                  <span>S/. {(item.precio_unitario * item.cantidad).toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <p>
              <strong>Subtotal: </strong> S/. {subtotal.toFixed(2)}
            </p>
            {descuento > 0 && (
              <p>
                <strong>Descuento:</strong> -S/. {descuento.toFixed(2)}
              </p>
            )}
            <p className="font-semibold text-xl mt-2">
              <strong>Total: </strong>  S/. {totalFinal.toFixed(2)}
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
