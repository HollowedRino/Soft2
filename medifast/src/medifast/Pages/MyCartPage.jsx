import { useContext } from 'react';
import { CartContext } from '../../contexts/CartProvider';
import { MyCartItem } from '../components/MyCartItem';
import { Link } from 'react-router-dom';

export const MyCartPage = () => {
  const { cartItems } = useContext(CartContext);

  const total = cartItems.reduce(
    (sum, item) => sum + item.medicamento.precio * item.cantidad,
    0
  );

  return (
    <div className="flex flex-col py-5 px-15">
      <h1 className="text-2xl font-semibold mb-3 text-left">
        Mi carrito ({cartItems.length})
      </h1>

      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center bg-white p-10 rounded-lg shadow-md h-60">
          <p className="text-gray-600 text-lg">No hay items en el carrito.</p>
          <Link
            to="/"
            className="mt-4 text-green-600 hover:underline"
          >
            Volver al inicio
          </Link>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row justify-between gap-8 w-full px-10 bg-green-100 rounded-3xl p-10">
          <div className="flex flex-col gap-4 w-full md:w-2/3 bg-white p-6 rounded-lg shadow-md h-full">
            <div className="overflow-x-auto md:overflow-x-visible">
              <div className="min-w-[600px]">
                <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md">
                  <table className="w-full">
                    <thead className="text-font-extralight">
                      <tr className="text-center text-gray-400">
                        <th className="px-4 py-2"></th>
                        <th className="px-4 py-2">Productos</th>
                        <th className="px-4 py-2">Categoría</th>
                        <th className="px-4 py-2">Cantidad</th>
                        <th className="px-4 py-2">Subtotal</th>
                        <th className="px-4 py-2"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems.map((item, index) => (
                        <MyCartItem key={index} item={item} />
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center w-full md:w-1/3 bg-white p-6 rounded-lg shadow-md h-60">
            <h2 className="text-xl font-semibold mb-6">Resumen de compra</h2>
            <div className="flex justify-between text-gray-600 mb-2">
              <p>Total:</p>
              <p>
                {new Intl.NumberFormat('es-PE', {
                  style: 'currency',
                  currency: 'PEN',
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                }).format(total)}
              </p>
            </div>
            <div className="flex justify-center">
              <Link
                to="/checkout"
                className="bg-green-600 text-white px-6 py-3 rounded-2xl w-1/2 text-center transition-all duration-300 hover:bg-green-700"
              >
                Proceder al pago
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
