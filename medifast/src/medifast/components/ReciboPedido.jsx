import React from "react";

export const ReciboPedido = ({ pedido }) => {
  if (!pedido) return null;

  const total = pedido.detallepedido.reduce(
    (acc, item) => acc + item.subtotal,
    0
  );

  return (
    <div className="bg-white p-4 rounded-lg shadow-md w-full">
      <h2 className="text-xl font-bold mb-4">Recibo del Pedido #{pedido.id}</h2>

      <div className="mb-2">
        <p className="text-sm text-gray-600">Fecha del pedido:</p>
        <p className="font-medium">{pedido.fecha_pedido}</p>
      </div>

      <div className="mb-2">
        <p className="text-sm text-gray-600">Estado:</p>
        <p className="font-medium">{pedido.estado}</p>
      </div>

      <div className="mb-2">
        <p className="text-sm text-gray-600">Repartidor:</p>
        <p className="font-medium">{pedido.repartidor?.nombre || "Desconocido"}</p>
      </div>

      <div className="mb-2">
        <p className="text-sm text-gray-600">Botica:</p>
        <p className="font-medium">{pedido.botica?.nombre || "Desconocida"}</p>
      </div>

      <div className="mb-2">
        <p className="text-sm text-gray-600">Método de pago:</p>
        <p className="font-medium">{pedido.metodopago?.metodo || "Desconocido"}</p>
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-600">Dirección:</p>
        <p className="font-medium">{pedido.direccion_usuario?.direccion || "Desconocida"}</p>
      </div>

      <h3 className="text-lg font-semibold mb-2">Detalle del pedido:</h3>
      <div className="space-y-2 mb-4">
        {pedido.detallepedido.map((item) => (
          <div key={item.id} className="flex justify-between">
            <span className="text-gray-700">
              {item.medicamento.nombre} (x{item.cantidad})
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
    </div>
  );
};

