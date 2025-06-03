import React, { useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

export default function Orders() {
  const [currentPage, setCurrentPage] = useState(1);
  const [orders, setOrders] = useState([]);
  const ordersPerPage = 2;

  useEffect(() => {
    // Aquí cargarías los pedidos del usuario desde tu API o contexto
    const mockOrders = [
      {
        id: 12345,
        fecha_pedido: '2024-01-15',
        total: 89.50,
        estado: 'Entregado',
        detalles: [
          { medicamento: { nombre: 'Paracetamol 500mg' }, cantidad: 2, precio_unitario: 15.00 },
          { medicamento: { nombre: 'Ibuprofeno 400mg' }, cantidad: 1, precio_unitario: 25.00 },
          { medicamento: { nombre: 'Aspirina 100mg' }, cantidad: 3, precio_unitario: 8.50 }
        ]
      },
      {
        id: 12346,
        fecha_pedido: '2024-01-10',
        total: 156.75,
        estado: 'En camino',
        detalles: [
          { medicamento: { nombre: 'Amoxicilina 500mg' }, cantidad: 1, precio_unitario: 45.00 },
          { medicamento: { nombre: 'Loratadina 10mg' }, cantidad: 2, precio_unitario: 35.50 },
          { medicamento: { nombre: 'Omeprazol 20mg' }, cantidad: 1, precio_unitario: 40.75 }
        ]
      },
      {
        id: 12347,
        fecha_pedido: '2024-01-05',
        total: 67.25,
        estado: 'Cancelado',
        detalles: [
          { medicamento: { nombre: 'Acetaminofén 750mg' }, cantidad: 1, precio_unitario: 18.75 },
          { medicamento: { nombre: 'Vitamina C 1000mg' }, cantidad: 2, precio_unitario: 24.25 }
        ]
      },
      {
        id: 12348,
        fecha_pedido: '2023-12-28',
        total: 203.40,
        estado: 'Entregado',
        detalles: [
          { medicamento: { nombre: 'Metformina 850mg' }, cantidad: 2, precio_unitario: 55.20 },
          { medicamento: { nombre: 'Atorvastatina 20mg' }, cantidad: 1, precio_unitario: 93.00 }
        ]
      },
      {
        id: 12349,
        fecha_pedido: '2023-12-20',
        total: 134.60,
        estado: 'Entregado',
        detalles: [
          { medicamento: { nombre: 'Losartán 50mg' }, cantidad: 3, precio_unitario: 28.20 },
          { medicamento: { nombre: 'Simvastatina 20mg' }, cantidad: 1, precio_unitario: 50.00 }
        ]
      }
    ];

    setOrders(mockOrders);
  }, []);

  // Cálculos de paginación
  const totalPages = Math.ceil(orders.length / ordersPerPage);
  const startIndex = (currentPage - 1) * ordersPerPage;
  const endIndex = startIndex + ordersPerPage;
  const currentOrders = orders.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const getStatusColor = (estado) => {
    switch (estado) {
      case 'Entregado':
        return 'text-green-600';
      case 'En camino':
        return 'text-blue-600';
      case 'Cancelado':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-green-700 mb-6">Pedidos Recientes</h2>
      
      {orders.length === 0 ? (
        <p className="text-lg">No tienes pedidos realizados en este momento.</p>
      ) : (
        <div className="space-y-4">
          {currentOrders.map((order) => (
            <div key={order.id} className="border border-green-300 rounded-lg p-4 bg-green-50">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-lg font-semibold text-green-700">
                    Pedido #{order.id}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {new Date(order.fecha_pedido).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                  <p className={`text-sm font-medium ${getStatusColor(order.estado)}`}>
                    {order.estado}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-green-600">
                    S/ {order.total.toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="border-t border-green-200 pt-3">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Productos:</h4>
                <ul className="space-y-1">
                  {order.detalles.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex justify-between items-center text-sm">
                      <span>
                        <strong>{item.medicamento?.nombre || `Medicamento ID ${item.medicamento_id}`}</strong>
                        <span className="text-gray-600 ml-2">(x{item.cantidad})</span>
                      </span>
                      <span className="font-medium">
                        S/ {(item.precio_unitario * item.cantidad).toFixed(2)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}

          {/* Paginación */}
          {totalPages > 1 && (
            <div className="flex justify-end items-center space-x-2 mt-6">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`p-2 rounded ${
                  currentPage === 1
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-green-100 text-green-600 hover:bg-green-200'
                }`}
              >
                <ChevronLeftIcon className="h-4 w-4" />
              </button>

              <div className="flex space-x-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                  <button
                    key={pageNumber}
                    onClick={() => handlePageChange(pageNumber)}
                    className={`px-3 py-1 rounded text-sm font-medium ${
                      currentPage === pageNumber
                        ? 'bg-green-600 text-white'
                        : 'bg-green-100 text-green-600 hover:bg-green-200'
                    }`}
                  >
                    {pageNumber}
                  </button>
                ))}
              </div>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`p-2 rounded ${
                  currentPage === totalPages
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-green-100 text-green-600 hover:bg-green-200'
                }`}
              >
                <ChevronRightIcon className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}