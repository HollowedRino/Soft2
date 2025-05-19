import { useState } from "react";

export const PharmacyManagement = ({ pharmacies, setPharmacies }) => {
  const [name, setName] = useState("");
  const [direccion, setDireccion] = useState("");

  const addPharmacy = () => {
    if (name.trim() && direccion.trim()) {
      setPharmacies([
        ...pharmacies,
        { id: Date.now(), name, direccion, inventory: [] },
      ]);
      setName("");
      setDireccion("");
    }
  };

  const removePharmacy = (id) => {
    setPharmacies(pharmacies.filter((p) => p.id !== id));
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-green-700 mb-4">Boticas Asociadas</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Nombre de la botica"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-green-400 rounded px-3 py-2 mr-2"
        />
        <input
          type="text"
          placeholder="Dirección de la botica"
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
          className="border border-green-400 rounded px-3 py-2 mr-2"
        />
        <button onClick={addPharmacy} className="bg-green-600 text-white px-4 py-2 rounded">
          Añadir
        </button>
      </div>
      <ul className="space-y-2">
        {pharmacies.map((pharmacy) => (
          <li key={pharmacy.id} className="flex justify-between items-center border p-2 rounded">
            <span>
              <strong>{pharmacy.name}</strong> - Dirección: {pharmacy.direccion}
            </span>
            <button
              onClick={() => removePharmacy(pharmacy.id)}
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