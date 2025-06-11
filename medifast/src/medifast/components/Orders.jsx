import React, { useState, useEffect, useContext } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { ChatRoom } from './ChatRoom';
import { ReciboPedido } from './ReciboPedido';
import { Link } from 'react-router-dom';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { getPedidosByUsuario } from '../services/pedidoService';
import { UserContext } from '../../contexts/UserProvider';

export default function Orders() {
  const [currentPage, setCurrentPage] = useState(1);
  const [orders, setOrders] = useState([]);
  const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchPedidos = async () => {
      if (!user?.id) return;
      
      console.log('ID del usuario:', user.id);
      setLoading(true);
      const { ok, resp, errorMessage } = await getPedidosByUsuario(user.id);
      
      if (ok) {
        console.log('Estructura de pedidos:', JSON.stringify(resp, null, 2));
        console.log('Estados de los pedidos:', resp.map(p => ({ id: p.id, estado: p.estado_pedido })));
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
                      <p className="text-sm text-gray-600">Botica: {order.botica?.nombre}</p>
                      <p className="text-sm text-gray-600">Método de pago: {order.metodo_pago?.nombre}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Link
                      to="/mycart"
                      className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ShoppingCartIcon className="h-5 w-5" />
                      <span>Volver a comprar</span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* DERECHA: Chat o Recibo */}
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