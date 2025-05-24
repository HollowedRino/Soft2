const API_URL = "http://localhost:3000"; // Cambia según tu entorno

// Función GET con soporte para query params opcionales
export const getWithQueryParams = async (path, params = {}) => {
  const queryString = new URLSearchParams(params).toString();
  const url = `${API_URL}${path}${queryString ? `?${queryString}` : ""}`;
  
  const res = await fetch(url);
  if (!res.ok) throw new Error("Error en GET con query params");
  return res.json();
};

export const getWithPathParam = async (basePath, param) => {
  const url = `${API_URL}${basePath}/${encodeURIComponent(param)}`;
  

  const res = await fetch(url);
  if (!res.ok) throw new Error("Error en GET con path param");
  return res.json();
};

export const getWithTwoPathParams = async (basePath, param1, param2) => {
  const url = `${API_URL}${basePath}/${encodeURIComponent(param1)}/${encodeURIComponent(param2)}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Error en GET con dos path params");
  return res.json();
};

export const getSimple = async (path) => {
  const url = `${API_URL}${path}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Error en GET simple");

  return res.json();
};


// Función POST con body JSON
export const post = async (path, data) => {
  const res = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const json = await res.json();

  if (!res.ok) {
    const error = new Error(json.message || "Error en POST");
    error.status = res.status;  // Guardamos el status para manejarlo después
    throw error;
  }

  return json;
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

// Función DELETE con path param

export const deleteWithPathParam = async (basePath, param) => {
  const url = `${API_URL}${basePath}/${encodeURIComponent(param)}`;
  
  const res = await fetch(url, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Error en DELETE con path param");
  return res.json();
};

