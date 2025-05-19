import { useState } from "react";

export const InventoryManagement = ({ pharmacy, updatePharmacyInventory }) => {
  const [name, setName] = useState("");
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");

  const addItem = () => {
    if (name.trim() && stock && price) {
      const newItem = {
        id: Date.now(),
        name,
        stock: parseInt(stock),
        price: parseFloat(price),
      };
      updatePharmacyInventory([...pharmacy.inventory, newItem]);
      setName("");
      setStock("");
      setPrice("");
    }
  };

  const removeItem = (itemId) => {
    const updatedInventory = pharmacy.inventory.filter((item) => item.id !== itemId);
    updatePharmacyInventory(updatedInventory);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-green-700 mb-4">
        Inventario de {pharmacy.name}
      </h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Nombre del producto"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-green-400 rounded px-3 py-2 mr-2"
        />
        <input
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          className="border border-green-400 rounded px-3 py-2 mr-2"
        />
        <input
          type="number"
          placeholder="Precio"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border border-green-400 rounded px-3 py-2 mr-2"
        />
        <button onClick={addItem} className="bg-green-600 text-white px-4 py-2 rounded">
          Añadir
        </button>
      </div>
      <ul className="space-y-2">
        {pharmacy.inventory.map((item) => (
          <li key={item.id} className="flex justify-between items-center border p-2 rounded">
            <span>
              <strong>{item.name}</strong> - Stock: {item.stock} - Precio: S/ {item.price}
            </span>
            <button
              onClick={() => removeItem(item.id)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}; 