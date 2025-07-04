import { useState, useEffect } from "react";
import { updateBotica, createBotica, getAllDistritos, deleteBotica, getInventarioByBoticaId, deleteInventarioBotica } from "../services/boticaService";

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

  useEffect(() => {
    getAllDistritos().then(setDistritos).catch(() => setDistritos([]));
  }, []);

  const addPharmacy = async () => {
    if (
      name.trim() &&
      direccion.trim() &&
      telefono.trim() &&
      horarioApertura.trim() &&
      horarioCierre.trim() &&
      distrito.trim()
    ) {
      if (!/^9[0-9]{8}$/.test(telefono)) {
        alert("El teléfono debe empezar con 9 y tener 9 dígitos.");
        return;
      }
      try {
        // Buscar el ID del distrito por nombre o usar el ID si ya es número
        let distritoId = distrito;
        if (isNaN(Number(distrito))) {
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

        await createBotica({
          nombre: name,
          direccion,
          telefono_botica: telefono,
          horario_apertura: horarioApertura,
          horario_cierre: horarioCierre,
          distrito_id: distritoId,
        });

        setName("");
        setDireccion("");
        setTelefono("");
        setHorarioApertura("");
        setHorarioCierre("");
        setDistrito("");
        if (typeof reloadPharmacies === "function") {
          reloadPharmacies();
        }
      } catch (error) {
        alert(error.message || "Error al crear la botica");
      }
    } else {
      alert("Por favor, completa todos los campos antes de guardar.");
    }
  };

  const removePharmacy = async (id) => {
    const confirm = window.confirm("¿Estás seguro de eliminar esta botica?");
    if (!confirm) return;
    try {
      // Eliminar todos los inventarios asociados a la botica
      const inventarios = await getInventarioByBoticaId(id);
      if (Array.isArray(inventarios) && inventarios.length > 0) {
        await Promise.all(inventarios.map(inv => deleteInventarioBotica(inv.id)));
      }
      await deleteBotica(id);
      setPharmacies(pharmacies.filter((p) => p.id !== id));
      if (editId === id) setEditId(null);
      if (typeof reloadPharmacies === "function") reloadPharmacies();
      alert("Botica eliminada correctamente");
    } catch (error) {
      alert(error.message || "Error al eliminar la botica");
    }
  };

  // Iniciar edición
  const startEdit = (pharmacy) => {
    const normalizeTime = (t) => (t ? t.slice(0,5) : "");
    const distritoObj = distritos.find(d => d.nombre_distrito === pharmacy.distrito);
    setEditId(pharmacy.id);
    setEditFields({
      name: pharmacy.name,
      direccion: pharmacy.direccion,
      telefono: pharmacy.telefono,
      horarioApertura: normalizeTime(pharmacy.horarioApertura),
      horarioCierre: normalizeTime(pharmacy.horarioCierre),
      distrito: distritoObj ? distritoObj.id : "",
    });
  };

  const handleEditChange = (e) => {
    setEditFields({ ...editFields, [e.target.name]: e.target.value });
  };

  const saveEdit = async (id) => {
    const { name, direccion, telefono, horarioApertura, horarioCierre, distrito } = editFields;
    if (
      String(name).trim() &&
      String(direccion).trim() &&
      String(telefono).trim() &&
      String(horarioApertura).trim() &&
      String(horarioCierre).trim() &&
      String(distrito).trim()
    ) {
      if (!/^9[0-9]{8}$/.test(telefono)) {
        alert("El teléfono debe empezar con 9 y tener 9 dígitos.");
        return;
      }
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
          telefono_botica: Number(telefono),
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
      <h3 className="text-xl font-semibold text-green-700 mb-4 w-full">Agregar nueva botica</h3>
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
          type="tel"
          placeholder="Teléfono de la botica"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          className="border border-green-400 rounded px-3 py-2 mr-2"
          pattern="9[0-9]{8}"
          inputMode="numeric"
          maxLength={9}
          required
          onKeyDown={e => {
            if (e.key.length === 1 && !/[0-9]/.test(e.key)) {
              e.preventDefault();
            }
          }}
        />
        <div className="flex flex-col mr-2">
          <label htmlFor="horarioApertura" className="text-green-700 text-sm mb-1">Horario de apertura</label>
          <input
            id="horarioApertura"
            type="time"
            placeholder="Horario de apertura"
            value={horarioApertura}
            onChange={(e) => setHorarioApertura(e.target.value)}
            className="border border-green-400 rounded px-2 py-1 text-base"
          />
        </div>
        <div className="flex flex-col mr-2">
          <label htmlFor="horarioCierre" className="text-green-700 text-sm mb-1">Horario de cierre</label>
          <input
            id="horarioCierre"
            type="time"
            placeholder="Horario de cierre"
            value={horarioCierre}
            onChange={(e) => setHorarioCierre(e.target.value)}
            className="border border-green-400 rounded px-2 py-1 text-base"
          />
        </div>
        <select
          value={distrito}
          onChange={e => setDistrito(e.target.value)}
          className="border border-green-400 rounded px-3 py-2 mr-2"
          required
        >
          <option value="">Distrito</option>
          {distritos.map(d => (
            <option key={d.id} value={d.id}>{d.nombre_distrito}</option>
          ))}
        </select>
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
                  type="tel"
                  name="telefono"
                  value={editFields.telefono}
                  onChange={handleEditChange}
                  placeholder="Teléfono"
                  className="border border-green-400 rounded px-2 py-1"
                  pattern="9[0-9]{8}"
                  inputMode="numeric"
                  maxLength={9}
                  required
                  onKeyDown={e => {
                    if (e.key.length === 1 && !/[0-9]/.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                />
                <input
                  type="time"
                  name="horarioApertura"
                  value={editFields.horarioApertura}
                  onChange={handleEditChange}
                  placeholder="Horario Apertura"
                  className="border border-green-400 rounded px-2 py-1"
                />
                <input
                  type="time"
                  name="horarioCierre"
                  value={editFields.horarioCierre}
                  onChange={handleEditChange}
                  placeholder="Horario Cierre"
                  className="border border-green-400 rounded px-2 py-1"
                />
                <select
                  name="distrito"
                  value={editFields.distrito}
                  onChange={handleEditChange}
                  className="border border-green-400 rounded px-2 py-1"
                  required
                >
                  <option value="">Distrito</option>
                  {distritos.map(d => (
                    <option key={d.id} value={d.id}>{d.nombre_distrito}</option>
                  ))}
                </select>
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