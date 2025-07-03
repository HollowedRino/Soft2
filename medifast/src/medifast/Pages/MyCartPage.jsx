import { useContext, useState } from 'react';
import { CartContext } from '../../contexts/CartProvider';
import { MyCartItem } from '../components/MyCartItem';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export const MyCartPage = () => {
  const { cartItems } = useContext(CartContext);

  // Estado para el cupón
  const [coupon, setCoupon] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [couponError, setCouponError] = useState('');

  const total = cartItems.reduce(
    (sum, item) => sum + item.medicamento.precio * item.cantidad,
    0
  );

  // Ejemplo simple de validación de cupón
  const handleApplyCoupon = () => {
    if (coupon.trim().toLowerCase() === 'descuento10') {
      setDiscount(total * 0.1);
      setCouponApplied(true);
      setCouponError('');
    } else {
      setDiscount(0);
      setCouponApplied(false);
      setCouponError('Cupón inválido');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="flex flex-col py-5 px-5 sm:px-10"
    >
      <h1 className="text-2xl font-semibold mb-3 text-left">
        Mi carrito ({cartItems.length})
      </h1>

      {cartItems.length === 0 ? (
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex flex-col items-center justify-center bg-white p-6 sm:p-10 rounded-lg shadow-md h-60 text-center"
        >
          <p className="text-gray-600 text-lg">No hay items en el carrito.</p>
          <Link to="/" className="mt-4 text-green-600 hover:underline">
            Volver al inicio
          </Link>
        </motion.div>
      ) : (
        <div className="flex flex-col md:flex-row justify-between gap-6 w-full bg-green-100 rounded-3xl p-4 sm:p-8">
          <motion.div
            layout
            className="flex flex-col gap-4 w-full md:w-2/3 bg-white p-4 sm:p-6 rounded-lg shadow-md"
          >
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="text-xs text-gray-500 uppercase">
                  <tr className="text-center">
                    <th className="px-2 py-2"></th>
                    <th className="px-2 py-2">Productos</th>
                    <th className="px-2 py-2">Categoría</th>
                    <th className="px-2 py-2">Cantidad</th>
                    <th className="px-2 py-2">Subtotal</th>
                    <th className="px-2 py-2"></th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {cartItems.map((item, index) => (
                      <MyCartItem key={item.medicamento.id} item={item} />
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col justify-center w-full md:w-1/3 bg-white p-4 sm:p-6 rounded-lg shadow-md"
          >
            <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">
              Resumen de compra
            </h2>

            {/* Campo para aplicar cupón */}
            <div className="mb-4">
              <div className="flex">
                <input
                  type="text"
                  value={coupon}
                  onChange={e => setCoupon(e.target.value)}
                  placeholder="Código de cupón"
                  className="border border-gray-300 rounded-l px-3 py-2 w-full focus:outline-none"
                  disabled={couponApplied}
                />
                <button
                  onClick={handleApplyCoupon}
                  className={`bg-green-600 text-white px-4 py-2 rounded-r transition-all duration-300 hover:bg-green-700 ${couponApplied ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={couponApplied}
                >
                  Aplicar
                </button>
              </div>
              {couponError && (
                <p className="text-red-500 text-sm mt-1">{couponError}</p>
              )}
              {couponApplied && (
                <p className="text-green-600 text-sm mt-1">Cupón aplicado correctamente</p>
              )}
            </div>

            <div className="flex justify-between text-gray-600 mb-1">
              <span>Subtotal:</span>
              <span>
                {new Intl.NumberFormat('es-PE', {
                  style: 'currency',
                  currency: 'PEN',
                }).format(total)}
              </span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-green-600 mb-1">
                <span>Descuento:</span>
                <span>
                  -{new Intl.NumberFormat('es-PE', {
                    style: 'currency',
                    currency: 'PEN',
                  }).format(discount)}
                </span>
              </div>
            )}
            <div className="flex justify-between text-gray-800 font-semibold mb-3">
              <span>Total:</span>
              <span>
                {new Intl.NumberFormat('es-PE', {
                  style: 'currency',
                  currency: 'PEN',
                }).format(total - discount)}
              </span>
            </div>
            <div className="flex justify-center mt-4">
              <Link
                to="/checkout"
                className="bg-green-600 text-white px-5 py-2 sm:px-6 sm:py-3 rounded-2xl w-full sm:w-1/2 text-center transition-all duration-300 hover:bg-green-700"
              >
                Proceder al pago
              </Link>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};