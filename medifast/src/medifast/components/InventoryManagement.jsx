import { useState, useEffect } from "react";
import { addMedicamentoToBotica, getAllMedicamentos, getInventarioByBoticaId, updateInventarioBotica } from "../services/boticaService";

export const InventoryManagement = ({
  pharmacy,
  reloadInventory,
  pharmacyId,
}) => {
  // Estados para el formulario
  const [medicamentos, setMedicamentos] = useState([]);
  const [selectedMedId, setSelectedMedId] = useState("");
  const [medStock, setMedStock] = useState("");
  // Para nuevo medicamento
  const [medName, setMedName] = useState("");
  const [medDescripcion, setMedDescripcion] = useState("");
  const [medCategoria, setMedCategoria] = useState("");
  const [medFabricante, setMedFabricante] = useState("");
  const [medPrice, setMedPrice] = useState("");
  const [medStockNuevo, setMedStockNuevo] = useState("");
  const [medReceta, setMedReceta] = useState("");
  const [medEstado, setMedEstado] = useState("");
  const [medImagen, setMedImagen] = useState("");
  const [showNew, setShowNew] = useState(false);

  useEffect(() => {
    getAllMedicamentos().then(setMedicamentos).catch(() => setMedicamentos([]));
  }, []);

  // Para agregar medicamento existente
  const handleAddExistente = async (e) => {
    e.preventDefault();
    if (!pharmacyId) {
      alert("Selecciona una botica antes de agregar medicamentos.");
      return;
    }
    if (!selectedMedId || !medStock) {
      alert("Selecciona un medicamento y stock");
      return;
    }
    try {
     
      const inventario = await getInventarioByBoticaId(pharmacyId);
      const existente = inventario.find(item => Number(item.medicamento_id) === Number(selectedMedId));
      if (existente) {
        // Si ya existe, actualizar el stock sumando la cantidad nueva
        await updateInventarioBotica(existente.id, {
          botica_id: pharmacyId,
          medicamento_id: Number(selectedMedId),
          cantidad_disponible: Number(existente.cantidad_disponible) + Number(medStock),
        });
        alert('Stock actualizado');
      } else {
        // Si no existe, agregar normalmente
        await addMedicamentoToBotica(pharmacyId, {
          medicamento_id: Number(selectedMedId),
          cantidad_disponible: Number(medStock),
        });
      }
      setSelectedMedId("");
      setMedStock("");
      if (typeof reloadInventory === "function") reloadInventory();
    } catch (error) {
      if (error && error.message) {
        alert(error.message);
      } else {
        alert("Error al agregar medicamento al inventario");
      }
    }
  };

  // Para agregar nuevo medicamento
  const handleAddNuevo = async (e) => {
    e.preventDefault();
    if (!pharmacyId) {
      alert("Selecciona una botica antes de agregar medicamentos.");
      return;
    }
    if (
      !medName.trim() ||
      !medDescripcion.trim() ||
      !medCategoria.trim() ||
      !medFabricante.trim() ||
      !medPrice.trim() ||
      medReceta === "" ||
      medEstado === "" ||
      !medStockNuevo
    ) {
      alert("Completa todos los campos obligatorios");
      return;
    }
    try {
      // Consultar inventario actual de la botica
      const inventario = await getInventarioByBoticaId(pharmacyId);
      const existeNombre = inventario.find(item =>
        (item.name && item.name.trim().toLowerCase() === medName.trim().toLowerCase()) ||
        (item.nombre && item.nombre.trim().toLowerCase() === medName.trim().toLowerCase()) ||
        (item.Medicamento && item.Medicamento.nombre && item.Medicamento.nombre.trim().toLowerCase() === medName.trim().toLowerCase()) ||
        (item.medicamento && item.medicamento.nombre && item.medicamento.nombre.trim().toLowerCase() === medName.trim().toLowerCase())
      );
      if (existeNombre) {
        alert('Medicamento ya existente');
        return;
      }
      const now = new Date();
      const fecha_actualizacion = `${String(now.getDate()).padStart(2, "0")}-${String(now.getMonth() + 1).padStart(2, "0")}-${now.getFullYear()}`;
      await addMedicamentoToBotica(pharmacyId, {
        nombre: medName,
        descripcion: medDescripcion,
        categoria: medCategoria,
        fabricante: medFabricante,
        precio: Number(medPrice),
        cantidad_disponible: Number(medStockNuevo),
        requiere_receta: medReceta === "true",
        estado_medicamento: medEstado === "true",
        imagen_url: medImagen,
        fecha_actualizacion,
      });
      setMedName("");
      setMedDescripcion("");
      setMedCategoria("");
      setMedFabricante("");
      setMedPrice("");
      setMedStockNuevo("");
      setMedReceta("");
      setMedEstado("");
      setMedImagen("");
      setShowNew(false);
      if (typeof reloadInventory === "function") reloadInventory();
    } catch (error) {
      alert(error.message || "Error al agregar medicamento");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-green-700 mb-4">
        Inventario de {pharmacy.name}
      </h2>

      <h3 className="text-lg font-semibold text-green-700 mb-2 w-full">Agregar medicamento</h3>

      <form onSubmit={handleAddExistente} className="mb-4 flex flex-wrap gap-2 items-end">
        <select
          value={selectedMedId}
          onChange={e => setSelectedMedId(e.target.value)}
          className="border border-green-400 rounded px-3 py-2"
        >
          <option value="">Selecciona medicamento existente</option>
          {medicamentos.map(med => (
            <option key={med.id} value={med.id}>{med.nombre}</option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Stock"
          value={medStock}
          onChange={(e) => setMedStock(e.target.value)}
          className="border border-green-400 rounded px-3 py-2"
          min="1"
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded text-center"
          disabled={!pharmacyId}
        >
          Agregar al inventario
        </button>
      </form>
      <div className="mt-2 mb-4">
        <button
          type="button"
          className="bg-green-600 text-white px-4 py-2 rounded text-center"
          onClick={() => setShowNew(true)}
          style={{ minWidth: 220 }}
        >
          Agregar nuevo medicamento
        </button>
      </div>

      {showNew && (
        <form onSubmit={handleAddNuevo} className="mb-6 flex flex-col gap-2 border-t pt-4">
          <div className="flex flex-wrap gap-2">
            <input
              type="text"
              placeholder="Nombre"
              value={medName}
              onChange={(e) => setMedName(e.target.value)}
              className="border border-green-400 rounded px-3 py-2 flex-1"
              required
            />
            <input
              type="text"
              placeholder="Descripción"
              value={medDescripcion}
              onChange={(e) => setMedDescripcion(e.target.value)}
              className="border border-green-400 rounded px-3 py-2 flex-1"
              required
            />
            <select
              value={medCategoria}
              onChange={(e) => setMedCategoria(e.target.value)}
              className="border border-green-400 rounded px-3 py-2 flex-1"
              required
            >
              <option value="">Selecciona categoría</option>
              <option value="medications">Medicamentos</option>
              <option value="natural-medicines">Medicamentos Naturales</option>
              <option value="older-adult">Adulto mayor</option>
              <option value="childish">Infantil</option>
              <option value="beauty">Belleza</option>
              <option value="vitamins">Vitaminas y Suplementos</option>
            </select>
          </div>
          <div className="flex flex-wrap gap-2">
            <input
              type="text"
              placeholder="Fabricante"
              value={medFabricante}
              onChange={(e) => setMedFabricante(e.target.value)}
              className="border border-green-400 rounded px-3 py-2 flex-1"
              required
            />
            <input
              type="number"
              placeholder="Precio"
              value={medPrice}
              onChange={(e) => setMedPrice(e.target.value)}
              className="border border-green-400 rounded px-3 py-2 flex-1"
              min="0"
              step="0.1"
              required
            />
            <input
              type="number"
              placeholder="Stock"
              value={medStockNuevo}
              onChange={(e) => setMedStockNuevo(e.target.value)}
              className="border border-green-400 rounded px-3 py-2 flex-1"
              min="1"
              required
            />
            <select
              value={medReceta}
              onChange={(e) => setMedReceta(e.target.value)}
              className="border border-green-400 rounded px-3 py-2 flex-1"
              required
            >
              <option value="">¿Requiere receta?</option>
              <option value="true">Sí</option>
              <option value="false">No</option>
            </select>
          </div>
          <div className="flex flex-wrap gap-2">
            <select
              value={medEstado}
              onChange={(e) => setMedEstado(e.target.value)}
              className="border border-green-400 rounded px-3 py-2"
              required
              style={{ minWidth: 120 }}
            >
              <option value="">¿Activo?</option>
              <option value="true">Sí</option>
              <option value="false">No</option>
            </select>
            <input
              type="text"
              placeholder="URL de imagen"
              value={medImagen}
              onChange={(e) => setMedImagen(e.target.value)}
              className="border border-green-400 rounded px-3 py-2 flex-1"
            />
            {/* Botones al costado del campo de imagen */}
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded text-center"
              disabled={!pharmacyId}
            >
              Agregar nuevo medicamento
            </button>
            <button
              type="button"
              className="bg-red-600 text-white px-4 py-2 rounded text-center"
              onClick={() => setShowNew(false)}
            >
              Cancelar
            </button>
          </div>
        </form>
      )}

      {pharmacy.inventory.length === 0 ? (
        <p>No hay productos en inventario.</p>
      ) : (
        <ul className="space-y-2">
          {pharmacy.inventory.map((item) => (
            <li
              key={item.id}
              className="flex flex-col border p-2 rounded"
            >
              <span><strong>Nombre:</strong> {item.name}</span>
              <span><strong>Descripción:</strong> {item.descripcion}</span>
              <span><strong>Categoría:</strong> {item.categoria}</span>
              <span><strong>Fabricante:</strong> {item.fabricante}</span>
              <span><strong>Precio:</strong> S/ {item.price}</span>
              <span><strong>Stock:</strong> {item.stock}</span>
              <span><strong>Requiere receta:</strong> {item.requiere_receta ? "Sí" : "No"}</span>
              <span><strong>Activo:</strong> {item.estado_medicamento ? "Sí" : "No"}</span>
              {item.imagen_url && (
                <span>
                  <strong>Imagen:</strong><br />
                  <img src={item.imagen_url} alt={item.name} style={{ maxWidth: 120, maxHeight: 120 }} />
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};