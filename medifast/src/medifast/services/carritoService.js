import { getWithPathParam } from "./api";

const BASE_PATH = "/carrito";

export const loadUserCart = async (id) => {
  try {
    const resp = await getWithPathParam(`${BASE_PATH}/usuario`, id);
    return {
      ok: true,
      resp,
    };
  } catch (error) {
    return {
      ok: false,
      errorMessage: error.message || `Error al cargar el carrito del usuario con ID: ${id}`,
    };
  }
};

