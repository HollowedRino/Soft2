import React, { useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { ChatRoom } from './ChatRoom';
import { ReciboPedido } from './ReciboPedido';

export default function Orders() {
  const [currentPage, setCurrentPage] = useState(1);
  const [orders, setOrders] = useState([]);
  const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null);
  //  const ordersPerPage = 2;
  const currentUserId = 1;

  useEffect(() => {
    // Aquí cargarías los pedidos del usuario desde tu API o contexto
    const mockOrders = [
      {
        "id": 12345,
        "fecha_pedido": "2024-01-15",
        "estado": "Entregado",
        "usuario_id": 1,
        "botica": {
          "id": 3,
          "nombre": "Botica Central Sur"
        },
        "metodopago": {
          "id": 1,
          "nombre": "Tarjeta de crédito"
        },
        "direccion_usuario": {
          "id": 1,
          "direccion": "Av. Siempre Viva 123"
        },
        "repartidor": {
          "id": 4,
          "nombre": "Carlos Torres"
        },
        "detallepedido": [
          {
            "id": 1,
            "cantidad": 2,
            "precio_unitario": 15.00,
            "subtotal": 30.00,
            "pedido_id": 12345,
            "medicamento_id": 101,
            "medicamento": {
              "nombre": "Paracetamol 500mg"
            }
          },
          {
            "id": 2,
            "cantidad": 1,
            "precio_unitario": 25.00,
            "subtotal": 25.00,
            "pedido_id": 12345,
            "medicamento_id": 102,
            "medicamento": {
              "nombre": "Ibuprofeno 400mg"
            }
          },
          {
            "id": 3,
            "cantidad": 3,
            "precio_unitario": 8.50,
            "subtotal": 25.50,
            "pedido_id": 12345,
            "medicamento_id": 103,
            "medicamento": {
              "nombre": "Aspirina 100mg"
            }
          }
        ]
      },
      {
        "id": 12346,
        "fecha_pedido": "2024-01-10",
        "estado": "En camino",
        "usuario_id": 1,
        "botica": {
          "id": 2,
          "nombre": "Botica Salud Norte"
        },
        "metodopago": {
          "id": 2,
          "nombre": "Efectivo"
        },
        "direccion_usuario": {
          "id": 2,
          "direccion": "Jr. Los Andes 450"
        },
        "repartidor": {
          "id": 5,
          "nombre": "María López"
        },
        "detallepedido": [
          {
            "id": 4,
            "cantidad": 1,
            "precio_unitario": 45.00,
            "subtotal": 45.00,
            "pedido_id": 12346,
            "medicamento_id": 104,
            "medicamento": {
              "nombre": "Amoxicilina 500mg"
            }
          },
          {
            "id": 5,
            "cantidad": 2,
            "precio_unitario": 35.50,
            "subtotal": 71.00,
            "pedido_id": 12346,
            "medicamento_id": 105,
            "medicamento": {
              "nombre": "Loratadina 10mg"
            }
          },
          {
            "id": 6,
            "cantidad": 1,
            "precio_unitario": 40.75,
            "subtotal": 40.75,
            "pedido_id": 12346,
            "medicamento_id": 106,
            "medicamento": {
              "nombre": "Omeprazol 20mg"
            }
          }
        ]
      },
      {
        "id": 12347,
        "fecha_pedido": "2024-01-05",
        "estado": "Cancelado",
        "usuario_id": 1,
        "botica": {
          "id": 1,
          "nombre": "Botica Vida Natural"
        },
        "metodopago": {
          "id": 3,
          "nombre": "Yape"
        },
        "direccion_usuario": {
          "id": 3,
          "direccion": "Mz J Lote 7 Urb. Las Flores"
        },
        "repartidor": {
          "id": 6,
          "nombre": "Luis Fernández"
        },
        "detallepedido": [
          {
            "id": 7,
            "cantidad": 1,
            "precio_unitario": 18.75,
            "subtotal": 18.75,
            "pedido_id": 12347,
            "medicamento_id": 107,
            "medicamento": {
              "nombre": "Acetaminofén 750mg"
            }
          },
          {
            "id": 8,
            "cantidad": 2,
            "precio_unitario": 24.25,
            "subtotal": 48.50,
            "pedido_id": 12347,
            "medicamento_id": 108,
            "medicamento": {
              "nombre": "Vitamina C 1000mg"
            }
          }
        ]
      },
      {
        "id": 12348,
        "fecha_pedido": "2023-12-28",
        "estado": "Entregado",
        "usuario_id": 1,
        "botica": {
          "id": 1,
          "nombre": "Botica Vida Natural"
        },
        "metodopago": {
          "id": 4,
          "nombre": "Transferencia"
        },
        "direccion_usuario": {
          "id": 4,
          "direccion": "Calle 12 #45-67"
        },
        "repartidor": {
          "id": 2,
          "nombre": "Ana Ruiz"
        },
        "detallepedido": [
          {
            "id": 9,
            "cantidad": 2,
            "precio_unitario": 55.20,
            "subtotal": 110.40,
            "pedido_id": 12348,
            "medicamento_id": 109,
            "medicamento": {
              "nombre": "Metformina 850mg"
            }
          },
          {
            "id": 10,
            "cantidad": 1,
            "precio_unitario": 93.00,
            "subtotal": 93.00,
            "pedido_id": 12348,
            "medicamento_id": 110,
            "medicamento": {
              "nombre": "Atorvastatina 20mg"
            }
          }
        ]
      },
      {
        "id": 12349,
        "fecha_pedido": "2023-12-20",
        "estado": "Entregado",
        "usuario_id": 1,
        "botica": {
          "id": 2,
          "nombre": "Botica Salud Norte"
        },
        "metodopago": {
          "id": 5,
          "nombre": "Tarjeta débito"
        },
        "direccion_usuario": {
          "id": 5,
          "direccion": "Pasaje Los Olivos 678"
        },
        "repartidor": {
          "id": 3,
          "nombre": "Pedro Gamarra"
        },
        "detallepedido": [
          {
            "id": 11,
            "cantidad": 3,
            "precio_unitario": 28.20,
            "subtotal": 84.60,
            "pedido_id": 12349,
            "medicamento_id": 111,
            "medicamento": {
              "nombre": "Losartán 50mg"
            }
          },
          {
            "id": 12,
            "cantidad": 1,
            "precio_unitario": 50.00,
            "subtotal": 50.00,
            "pedido_id": 12349,
            "medicamento_id": 112,
            "medicamento": {
              "nombre": "Simvastatina 20mg"
            }
          }
        ]
      }
    ];

  setOrders(mockOrders);
  }, []);
  /*
  const totalPages = Math.ceil(orders.length / ordersPerPage);
  const startIndex = (currentPage - 1) * ordersPerPage;
  const currentOrders = orders.slice(startIndex, startIndex + ordersPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
  */
  const getStatusColor = (estado) => {
    switch (estado) {
      case 'Entregado': return 'text-green-600';
      case 'En camino': return 'text-blue-600';
      case 'Cancelado': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

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
              const total = order.detallepedido.reduce((sum, item) => sum + item.subtotal, 0);
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
                      <p className={`text-sm font-medium ${getStatusColor(order.estado)}`}>
                        {order.estado}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-green-600">S/ {total.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="border-t border-green-200 pt-3">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Productos:</h4>
                    <ul className="space-y-1">
                      {order.detallepedido.map((item) => (
                        <li key={item.id} className="flex justify-between text-sm">
                          <span>
                            <strong>{item.medicamento?.nombre || `Medicamento ID ${item.medicamento_id}`}</strong>
                            <span className="text-gray-600 ml-2">(x{item.cantidad})</span>
                          </span>
                          <span className="font-medium">S/ {item.subtotal.toFixed(2)}</span>
                        </li>
                      ))}
                    </ul>
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
          pedidoSeleccionado.estado === "En camino" ? (
            <ChatRoom
              pedidoId={pedidoSeleccionado.id}
              currentUserId={currentUserId} 
              repartidorNombre={pedidoSeleccionado.repartidor.nombre} // pasa el nombre aquí
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