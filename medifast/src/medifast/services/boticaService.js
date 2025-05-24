const API_URL = "http://localhost:3000";

export const getAllBoticas = async () => {
  const res = await fetch(`${API_URL}/boticas`); // Ajusta el path si es otro
  if (!res.ok) throw new Error("Error al obtener boticas");
  return res.json();
};


export const getInventarioByBoticaId = async (boticaId) => {
  const res = await fetch(`${API_URL}/inventarioBotica/${boticaId}`);
  if (!res.ok) throw new Error("Error al traer inventario");
  const data = await res.json();
  return Array.isArray(data) ? data : [data]; // Siempre devolvemos array
};