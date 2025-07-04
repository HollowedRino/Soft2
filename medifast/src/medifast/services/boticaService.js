const API_URL = "http://localhost:3000";

export const getAllBoticas = async () => {
  const res = await fetch(`${API_URL}/boticas`); // Ajusta el path si es otro
  if (!res.ok) throw new Error("Error al obtener boticas");
  return res.json();
};

export const getInventarioByBoticaId = async (boticaId) => {
  const res = await fetch(`${API_URL}/inventarioBotica/botica/${boticaId}`); // <-- ruta correcta
  if (!res.ok) throw new Error("Error al traer inventario");
  const data = await res.json();
  return Array.isArray(data) ? data : [data];
};

export const updateBotica = async (id, boticaData) => {
  const res = await fetch(`${API_URL}/boticas/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(boticaData),
  });
  if (!res.ok) throw new Error("Error al actualizar botica");
  return res.json();
};

export const getAllMedicamentos = async () => {
  const res = await fetch(`${API_URL}/medicamento`);
  if (!res.ok) throw new Error("Error al obtener medicamentos");
  return res.json();
};

export const getAllDistritos = async () => {
  const res = await fetch(`${API_URL}/distrito`);
  if (!res.ok) throw new Error("Error al obtener distritos");
  return res.json();
};

export const createBotica = async (boticaData) => {
  const res = await fetch(`${API_URL}/boticas`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(boticaData),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Error al crear botica");
  }
  return res.json();
};

export const addMedicamentoToBotica = async (boticaId, medicamentoData) => {
  const now = new Date();
  const fecha_actualizacion = `${String(now.getDate()).padStart(2, "0")}-${String(now.getMonth() + 1).padStart(2, "0")}-${now.getFullYear()}`;

  const res = await fetch(`${API_URL}/inventarioBotica`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...medicamentoData,
      botica_id: boticaId,
      fecha_actualizacion, // <-- Agrega la fecha aquí
    }),
  });
  if (!res.ok) throw new Error("Error al agregar medicamento al inventario");
  return res.json();
};

export const updateInventarioBotica = async (inventarioId, data) => {
  const now = new Date();
  const fecha_actualizacion = `${String(now.getDate()).padStart(2, "0")}-${String(now.getMonth() + 1).padStart(2, "0")}-${now.getFullYear()}`;
  const res = await fetch(`${API_URL}/inventarioBotica/${inventarioId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...data,
      fecha_actualizacion,
    }),
  });
  if (!res.ok) throw new Error("Error al actualizar inventario de botica");
  return res.json();
};

export const deleteBotica = async (id) => {
  const res = await fetch(`${API_URL}/boticas/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Error al eliminar la botica");
  return true;
};

export const deleteInventarioBotica = async (inventarioId) => {
  const res = await fetch(`${API_URL}/inventarioBotica/${inventarioId}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Error al eliminar el medicamento del inventario");
  return true;
};