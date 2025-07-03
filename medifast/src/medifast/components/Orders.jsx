import React, { useState, useEffect, useContext } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { ChatRoom } from './ChatRoom';
import { ReciboPedido } from './ReciboPedido';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { getPedidosByUsuario } from '../services/pedidoService';
import { createItemCarrito } from '../services/itemCarritoService';
import { UserContext } from '../../contexts/UserProvider';
import { CartContext } from '../../contexts/CartProvider';

export default function Orders() {
  const [currentPage, setCurrentPage] = useState(1);
  const [orders, setOrders] = useState([]);
  const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(UserContext);
  const { cart, addToCart, deleteOnlyItemsCart } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPedidos = async () => {
      if (!user?.id) return;
      
      console.log('ID del usuario:', user.id);
      setLoading(true);
      const { ok, resp, errorMessage } = await getPedidosByUsuario(user.id);
      
      if (ok) {
        console.log('Estructura de pedidos:', JSON.stringify(resp, null, 2));
        console.log('Estados de los pedidos:', resp.map(p => ({ id: p.id, estado: p.estado_pedido })));
        // Debug: Ver qué relaciones llegan
        if (resp.length > 0) {
          console.log('Primer pedido completo:', resp[0]);
          console.log('Keys del primer pedido:', Object.keys(resp[0]));
          console.log('Botica:', resp[0].Botica);
          console.log('MetodoPago:', resp[0].MetodoPago);
          console.log('Repartidor:', resp[0].repartidor);
        }
        setOrders(resp);
        setError(null);
      } else {
        console.error('Error al obtener pedidos:', errorMessage);
        setError(errorMessage);
        setOrders([]);
      }
      setLoading(false);
    };

    fetchPedidos();
  }, [user?.id]);

  const getStatusColor = (estado) => {
    switch (estado) {
      case 'Entregado': return 'text-green-600';
      case 'En camino': return 'text-blue-600';
      case 'Cancelado': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const handleVolverAComprar = async (e, pedido) => {
    e.stopPropagation();
    
    try {
      console.log('Pedido seleccionado:', pedido);
      console.log('Detalles del pedido:', pedido.DetallePedidos);
      console.log('ID del carrito:', cart.id);

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
          
          console.log('Intentando crear item en carrito con datos:', itemData);
          
          const { ok, errorMessage, resp } = await createItemCarrito(itemData);
          if (!ok) {
            console.error('Error al agregar item al carrito:', errorMessage);
            console.error('Respuesta del servidor:', resp);
          } else {
            console.log('Item agregado exitosamente:', resp);
          }
        }
      }
      
      navigate('/mycart');
    } catch (error) {
      console.error('Error al procesar el pedido:', error);
      console.error('Detalles del error:', error.response?.data);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-lg">Cargando pedidos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-lg text-red-600">Error al cargar los pedidos: {error}</p>
      </div>
    );
  }

  return (
    <div className="flex w-full h-full gap-4">
      {/* IZQUIERDA: Lista de pedidos */}
      <div className="w-1/2 overflow-y-auto pr-4">
        <h2 className="text-2xl font-semibold text-green-700 mb-6">Pedidos Recientes</h2>

        {orders.length === 0 ? (
          <p className="text-lg">No tienes pedidos realizados en este momento.</p>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => {
              return (
                <div
                  key={order.id}
                  onClick={() => setPedidoSeleccionado(order)}
                  className="border border-green-300 rounded-lg p-4 bg-green-50 cursor-pointer hover:bg-green-100"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-green-700">Pedido #{order.id}</h3>
                      <p className="text-sm text-gray-600">
                        {new Date(order.fecha_pedido).toLocaleDateString('es-ES', {
                          year: 'numeric', month: 'long', day: 'numeric'
                        })}
                      </p>
                      <p className={`text-sm font-medium ${getStatusColor(order.estado_pedido)}`}>
                        {order.estado_pedido}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Botica: {order.Botica?.nombre || 'No especificada'}</p>
                      <p className="text-sm text-gray-600">Método de pago: {order.MetodoPago?.nombre_metodo_pago || 'No especificado'}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={(e) => handleVolverAComprar(e, order)}
                      className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <ShoppingCartIcon className="h-5 w-5" />
                      <span>Volver a comprar</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="w-1/2 overflow-y-auto order-l border-green-300 pl-4">
        {pedidoSeleccionado ? (
          pedidoSeleccionado.estado_pedido === "En camino" ? (
            <ChatRoom
              pedidoId={pedidoSeleccionado.id}
              currentUserId={user?.id} 
              repartidorNombre={pedidoSeleccionado.repartidor?.nombre}
            />
          ) : (
            <ReciboPedido pedido={pedidoSeleccionado} />
          )
        ) : (
          <p>Selecciona un pedido para ver detalles.</p>
        )}
      </div>
    </div>
  );
}