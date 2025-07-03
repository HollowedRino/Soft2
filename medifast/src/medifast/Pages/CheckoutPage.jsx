import React, { useContext } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CheckoutSteps } from "../components/CheckoutSteps";
import { CartContext } from '../../contexts/CartProvider';

export const CheckoutPage = () => {
  const { cartItems, getDiscount } = useContext(CartContext);

  const total = cartItems && cartItems.length > 0
    ? cartItems.reduce((sum, item) => sum + item.medicamento.precio * item.cantidad, 0)
    : 0;

  const discount = getDiscount(total);
  const totalFinal = Math.max(0, total - discount);

  return (
    <motion.div
      className="flex flex-col py-10 px-5 sm:px-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Encabezado */}
      <CheckoutSteps activeStep={0} />

      {/* Formulario de direccion */}
      <motion.div
        className="w-full bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto rounded-3xl"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-lg font-semibold mb-4 text-green-600">
          Dirección de Envío
        </h2>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Nombre"
            className="p-3 border rounded-lg"
          />
          <input
            type="text"
            placeholder="Apellido"
            className="p-3 border rounded-lg"
          />
          <input
            type="text"
            placeholder="Dirección"
            className="p-3 border rounded-lg col-span-1 md:col-span-2"
          />
          <input
            type="text"
            placeholder="Ciudad"
            className="p-3 border rounded-lg"
          />
          <input
            type="text"
            placeholder="Código Postal"
            className="p-3 border rounded-lg"
          />
          <input
            type="text"
            placeholder="Distrito"
            className="p-3 border rounded-lg"
          />
          <input
            type="text"
            placeholder="Teléfono"
            className="p-3 border rounded-lg"
          />
        </form>
        <div className="flex justify-end mt-6">
          <Link
            className="bg-green-600 text-white px-6 py-3 rounded-2xl hover:bg-green-700 transition duration-300"
            to="/checkout/payment"
          >
            Continuar
          </Link>
        </div>
        {/* Resumen de compra */}
        <div className="mt-8 p-4 bg-gray-50 rounded shadow">
          <div className="flex justify-between mb-2">
            <span>Subtotal:</span>
            <span>
              {new Intl.NumberFormat('es-PE', {
                style: 'currency',
                currency: 'PEN',
              }).format(isNaN(total) ? 0 : total)}
            </span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between mb-2 text-green-600">
              <span>Descuento:</span>
              <span>
                -{new Intl.NumberFormat('es-PE', {
                  style: 'currency',
                  currency: 'PEN',
                }).format(isNaN(discount) ? 0 : discount)}
              </span>
            </div>
          )}
          <div className="flex justify-between font-bold text-lg">
            <span>Total a pagar:</span>
            <span>
              {new Intl.NumberFormat('es-PE', {
                style: 'currency',
                currency: 'PEN',
              }).format(isNaN(totalFinal) ? 0 : totalFinal)}
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};