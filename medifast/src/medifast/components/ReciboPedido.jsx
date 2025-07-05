import React, { useContext } from "react";
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserProvider';
import { CartContext } from '../../contexts/CartProvider';
import { createItemCarrito } from '../services/itemCarritoService';

export const ReciboPedido = ({ pedido }) => {
  const { user } = useContext(UserContext);
  const { cart, addToCart, deleteOnlyItemsCart } = useContext(CartContext);
  const navigate = useNavigate();
  
  // Debug log to check the values
  console.log("=== DEBUG: ReciboPedido ===");
  console.log("user.state:", user?.state);
  console.log("pedido.estado_pedido:", pedido?.estado_pedido);
  console.log("user.state === 'cliente':", user?.state?.toLowerCase() === 'cliente');
  console.log("pedido.estado_pedido === 'completado':", pedido?.estado_pedido?.toLowerCase() === 'completado');
  console.log("pedido.estado_pedido === 'cancelado':", pedido?.estado_pedido?.toLowerCase() === 'cancelado');
  console.log("Should show button:", user?.state?.toLowerCase() === 'cliente' && (pedido?.estado_pedido?.toLowerCase() === 'completado' || pedido?.estado_pedido?.toLowerCase() === 'cancelado'));
  
  if (!pedido) return null;

  const total = pedido.DetallePedidos?.reduce(
    (acc, item) => acc + item.subtotal,
    0
  ) || 0;

  const handleVolverAComprar = async (e) => {
    e.stopPropagation();
    
    // Solo permitir "volver a comprar" si el usuario es cliente
    if (user.state?.toLowerCase() !== 'cliente') {
      alert('Solo los clientes pueden volver a comprar productos.');
      return;
    }
    
    try {
      // Primero limpiamos el carrito actual
      deleteOnlyItemsCart();

      for (const detalle of pedido.DetallePedidos) {
        const { boticas, ...medicamento } = detalle.Medicamento;
        
        // Agregar al carrito local (para UI inmediata)
        for (let i = 0; i < detalle.cantidad; i++) {
          addToCart(medicamento);
        }

        // Si está logueado, también sincronizar con el servidor
        if (user.authStatus && cart?.id) {
          const itemData = {
            carrito_id: cart.id,
            medicamento_id: medicamento.id,
            cantidad: detalle.cantidad
          };
          
          const { ok, errorMessage, resp } = await createItemCarrito(itemData);
          if (!ok) {
            console.error('Error al agregar item al carrito:', errorMessage);
          }
        }
      }
      
      navigate('/mycart');
    } catch (error) {
      console.error('Error al procesar el pedido:', error);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md w-full">
      <h2 className="text-xl font-bold mb-4">Recibo del Pedido #{pedido.id}</h2>

      <div className="mb-2">
        <p className="text-sm text-gray-600">Fecha del pedido:</p>
        <p className="font-medium">
          {new Date(pedido.fecha_pedido).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </p>
      </div>

      <div className="mb-2">
        <p className="text-sm text-gray-600">Estado:</p>
        <p className="font-medium">{pedido.estado_pedido}</p>
      </div>

      <div className="mb-2">
        <p className="text-sm text-gray-600">Repartidor:</p>
        <p className="font-medium">{pedido.repartidor?.nombre || "Desconocido"} {pedido.repartidor?.apellido || ""}</p>
      </div>

      <div className="mb-2">
        <p className="text-sm text-gray-600">Botica:</p>
        <p className="font-medium">{pedido.Botica?.nombre || "Desconocida"}</p>
      </div>

      <div className="mb-2">
        <p className="text-sm text-gray-600">Método de pago:</p>
        <p className="font-medium">{pedido.MetodoPago?.nombre_metodo_pago || "Desconocido"}</p>
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-600">Dirección:</p>
        <p className="font-medium">{pedido.DireccionUsuario?.direccion || "No especificada"}</p>
      </div>

      {pedido.DetallePedidos && pedido.DetallePedidos.length > 0 && (
        <>
          <h3 className="text-lg font-semibold mb-2">Detalle del pedido:</h3>
          <div className="space-y-2 mb-4">
            {pedido.DetallePedidos.map((item) => (
              <div key={item.id} className="flex justify-between">
                <span className="text-gray-700">
                  {item.Medicamento?.nombre || 'Medicamento no disponible'} (x{item.cantidad})
                </span>
                <span className="text-gray-800 font-medium">
                  S/ {item.subtotal.toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="flex justify-between border-t pt-2 mt-2 font-semibold text-lg">
            <span>Total:</span>
            <span>S/ {total.toFixed(2)}</span>
          </div>
        </>
      )}

      {/* Botón "Volver a comprar" solo para clientes cuando el pedido está completado o cancelado */}
      {user.state?.toLowerCase() === 'cliente' && (pedido.estado_pedido?.toLowerCase() === 'completado' || pedido.estado_pedido?.toLowerCase() === 'cancelado') && (
        <div className="mt-6 flex justify-center">
          <button
            onClick={handleVolverAComprar}
            className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
          >
            <ShoppingCartIcon className="h-5 w-5" />
            <span>Volver a comprar</span>
          </button>
        </div>
      )}
    </div>
  );
};

