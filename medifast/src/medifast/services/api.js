const API_URL = "http://localhost:3000"; // Cambia según tu entorno

// Función GET con soporte para query params opcionales
export const get = async (path, params = {}) => {
  const queryString = new URLSearchParams(params).toString();
  const url = `${API_URL}${path}${queryString ? `?${queryString}` : ""}`;
  
  const res = await fetch(url);
  if (!res.ok) throw new Error("Error en GET");
  return res.json();
};

// Función POST con body JSON
export const post = async (path, data) => {
  const res = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Error en POST");
  return res.json();
};

// Función PUT con body JSON
export const put = async (path, data) => {
  const res = await fetch(`${API_URL}${path}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Error en PUT");
  return res.json();
};

// Función DELETE
export const del = async (path) => {
  const res = await fetch(`${API_URL}${path}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Error en DELETE");
  return res.json();
};
