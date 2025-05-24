export const InventoryManagement = ({ pharmacy }) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-green-700 mb-4">
        Inventario de {pharmacy.name}
      </h2>
      {pharmacy.inventory.length === 0 ? (
        <p>No hay productos en inventario.</p>
      ) : (
        <ul className="space-y-2">
          {pharmacy.inventory.map((item) => (
            <li
              key={item.id}
              className="flex justify-between items-center border p-2 rounded"
            >
              <span>
                <strong>{item.name}</strong> - Stock: {item.stock} - Precio: S/ {item.price}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
