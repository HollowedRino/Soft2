const API_URL = "http://localhost:3000";
import { post, put, getWithPathParam, deleteWithPathParam } from "./api";

export const getAllCupones = async () => {
  const res = await fetch(`${API_URL}/cupon`); // Asegúrate que este path coincida con el de tu backend
  if (!res.ok) throw new Error("Error al obtener cupones");
  return res.json();
};

export const deleteCupon = async (id) => {
  return await deleteWithPathParam("/cupon", id);
};


export const createCupon = async (cupon) => {
  return await post("/cupon", cupon);
};