export default function Orders() {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-green-700 mb-6">Pedidos Recientes</h2>
      <ul className="list-disc list-inside text-lg space-y-1">
        <li>Pedido #12345 - Entregado</li>
        <li>Pedido #12346 - En camino</li>
        <li>Pedido #12347 - Cancelado</li>
      </ul>
    </div>
  );
}
