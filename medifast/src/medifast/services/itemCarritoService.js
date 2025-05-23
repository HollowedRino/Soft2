import { del, post } from "./api";

const BASE_PATH = "/itemcarrito";

export const addItemCarrito = async (data) => {
  try {
    const resp = await post(`${BASE_PATH}/item`, data);
    return {
      ok: true,
      resp,
    };
  } catch (error) {
    return {
      ok: false,
      errorMessage: error.message || `Error al agregar el item al carrito`,
    };
  }
};

export const deleteItemCarrito = async (id) => {
  try {
    const resp = await del(BASE_PATH, id);
    return {
      ok: true,
      resp,
    };
  } catch (error) {
    return {
      ok: false,
      errorMessage: error.message || `Error al agregar el item al carrito`,
    };
  }
};

