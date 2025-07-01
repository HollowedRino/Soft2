import { useState } from "react";

export const PharmacyManagement = ({ pharmacies, setPharmacies }) => {
  const [name, setName] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [horarioApertura, setHorarioApertura] = useState("");
  const [horarioCierre, setHorarioCierre] = useState("");
  const [distrito, setDistrito] = useState("");

  const addPharmacy = () => {
    if (name.trim() &&
      direccion.trim() &&
      telefono.trim() &&
      horarioApertura.trim() &&
      horarioCierre.trim() &&
      distrito.trim() 
    ) {
      setPharmacies([
        ...pharmacies,
        { id: Date.now(), name, direccion, telefono, horarioApertura, horarioCierre, distrito, inventory: [] },
      ]);
      setName("");
      setDireccion("");
      setTelefono("");
      setHorarioApertura("");
      setHorarioCierre("");
      setDistrito("");
    }
  };

  const removePharmacy = (id) => {
    setPharmacies(pharmacies.filter((p) => p.id !== id));
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-green-700 mb-4">Boticas Asociadas</h2>
      <div className="mb-4 flex flex-wrap gap-x-2 gap-y-4">
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
        < input
          type="text"
          placeholder="Teléfono de la botica"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          className="border border-green-400 rounded px-3 py-2 mr-2"
        />
        <input
          type="text"
          placeholder="Horario de apertura"
          value={horarioApertura}
          onChange={(e) => setHorarioApertura(e.target.value)}
          className="border border-green-400 rounded px-3 py-2 mr-2"
        />
        <input
          type="text"   
          placeholder="Horario de cierre"
          value={horarioCierre}
          onChange={(e) => setHorarioCierre(e.target.value)}
          className="border border-green-400 rounded px-3 py-2 mr-2"
        />
        <input
          type="text"
          placeholder="Distrito"
          value={distrito}
          onChange={(e) => setDistrito(e.target.value)}
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
              <strong>{pharmacy.name}</strong> - Dirección: {pharmacy.direccion} - Telefono: {pharmacy.telefono} - Horario: {pharmacy.horarioApertura} - {pharmacy.horarioCierre}
            </span>
            <div className="flex gap-2 ml-6">
        <button
          onClick={() => {}}
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          Editar
        </button>
            <button
              onClick={() => removePharmacy(pharmacy.id)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Eliminar
            </button>
          </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
