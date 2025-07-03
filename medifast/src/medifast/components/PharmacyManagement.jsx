import { useState } from "react";
import { updateBotica } from "../services/boticaService";
import { getAllDistritos } from "../services/boticaService";

export const PharmacyManagement = ({ pharmacies, setPharmacies, reloadPharmacies }) => {
  const [name, setName] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [horarioApertura, setHorarioApertura] = useState("");
  const [horarioCierre, setHorarioCierre] = useState("");
  const [distrito, setDistrito] = useState("");
  const [distritos, setDistritos] = useState([]);

  // Edicion
  const [editId, setEditId] = useState(null);
  const [editFields, setEditFields] = useState({
    name: "",
    direccion: "",
    telefono: "",
    horarioApertura: "",
    horarioCierre: "",
    distrito: "",
  });

  const addPharmacy = () => {
    if (
      name.trim() &&
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
    if (editId === id) setEditId(null);
  };

  // Iniciar edición
  const startEdit = (pharmacy) => {
    setEditId(pharmacy.id);
    setEditFields({
      name: pharmacy.name,
      direccion: pharmacy.direccion,
      telefono: pharmacy.telefono,
      horarioApertura: pharmacy.horarioApertura,
      horarioCierre: pharmacy.horarioCierre,
      distrito: pharmacy.distrito,
    });
  };

  const handleEditChange = (e) => {
    setEditFields({ ...editFields, [e.target.name]: e.target.value });
  };

    const saveEdit = async (id) => {
  const { name, direccion, telefono, horarioApertura, horarioCierre, distrito } = editFields;
  if (
    name.trim() &&
    direccion.trim() &&
    telefono.trim() &&
    horarioApertura.trim() &&
    horarioCierre.trim() &&
    distrito.trim()
  ) {
    // Buscar el ID del distrito por nombre
    let distritoId = distrito;
    if (isNaN(Number(distrito))) {
      // Si el usuario escribió el nombre, busca el ID
      const distritosList = await getAllDistritos();
      const distritoObj = distritosList.find(
        (d) => d.nombre_distrito.toLowerCase() === distrito.trim().toLowerCase()
      );
      if (!distritoObj) {
        alert("El distrito ingresado no existe.");
        return;
      }
      distritoId = distritoObj.id;
    }
    try {
      await updateBotica(id, {
        nombre: name,
        direccion,
        telefono_botica: telefono,
        horario_apertura: horarioApertura,
        horario_cierre: horarioCierre,
        distrito_id: distritoId,
      });
      setEditId(null);
      if (typeof reloadPharmacies === "function") {
        reloadPharmacies();
      }
    } catch (error) {
      alert("Error al guardar los cambios");
    }
  } else {
    alert("Por favor, completa todos los campos antes de guardar.");
  }
};

  const cancelEdit = () => {
    setEditId(null);
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
        <input
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
            {Number(editId) === Number(pharmacy.id) ? (
              <div className="flex flex-wrap gap-2 w-full">
                <input
                  type="text"
                  name="name"
                  value={editFields.name}
                  onChange={handleEditChange}
                  placeholder="Nombre"
                  className="border border-green-400 rounded px-2 py-1"
                />
                <input
                  type="text"
                  name="direccion"
                  value={editFields.direccion}
                  onChange={handleEditChange}
                  placeholder="Dirección"
                  className="border border-green-400 rounded px-2 py-1"
                />
                <input
                  type="text"
                  name="telefono"
                  value={editFields.telefono}
                  onChange={handleEditChange}
                  placeholder="Teléfono"
                  className="border border-green-400 rounded px-2 py-1"
                />
                <input
                  type="text"
                  name="horarioApertura"
                  value={editFields.horarioApertura}
                  onChange={handleEditChange}
                  placeholder="Horario Apertura"
                  className="border border-green-400 rounded px-2 py-1"
                />
                <input
                  type="text"
                  name="horarioCierre"
                  value={editFields.horarioCierre}
                  onChange={handleEditChange}
                  placeholder="Horario Cierre"
                  className="border border-green-400 rounded px-2 py-1"
                />
                <input
                  type="text"
                  name="distrito"
                  value={editFields.distrito}
                  onChange={handleEditChange}
                  placeholder="Distrito"
                  className="border border-green-400 rounded px-2 py-1"
                />
                <button
                  onClick={() => saveEdit(pharmacy.id)}
                  className="bg-blue-600 text-white px-3 py-1 rounded"
                >
                  Guardar
                </button>
                <button
                  onClick={cancelEdit}
                  className="bg-gray-400 text-white px-3 py-1 rounded"
                >
                  Cancelar
                </button>
              </div>
            ) : (
              <>
                <span>
                  <strong>{pharmacy.name}</strong> - Dirección: {pharmacy.direccion} - Telefono: {pharmacy.telefono} - Horario: {pharmacy.horarioApertura} - {pharmacy.horarioCierre} - Distrito: {pharmacy.distrito}
                </span>
                <div className="flex gap-2 ml-12">
                  <button
                    onClick={() => startEdit(pharmacy)}
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
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};