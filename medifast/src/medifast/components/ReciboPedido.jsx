import React from "react";

export const ReciboPedido = ({ pedido }) => {
  if (!pedido) return null;

  const total = pedido.DetallePedidos?.reduce(
    (acc, item) => acc + item.subtotal,
    0
  ) || 0;

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
    </div>
  );
};

