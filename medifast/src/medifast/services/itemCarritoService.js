import { del, deleteWithPathParam, getWithPathParam, getWithTwoPathParams, post, put } from "./api";

const BASE_PATH = "/itemcarrito";

export const createItemCarrito = async (data) => {
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

// ejemplo de data
// {
//   "carrito_id": 6,
//   "medicamento_id": 1,
//   "cantidad": 1
// }  

  export const updateItemCarrito = async (data) => {
  try {
    const resp = await put(`${BASE_PATH}/item`, data);
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

// ejemplo de data para update
// {
//   "carrito_id": 6,
//   "medicamento_id": 1,
//   "cantidad": 2
// } 

export const getItemCarritoByCarritoIdMedicamentoId = async (carrito_id,medicamento_id) => {
  try {
    const resp = await getWithTwoPathParams(`${BASE_PATH}/item`, carrito_id,medicamento_id);
    return {
      ok: true,
      resp,
    };
  } catch (error) {
    return {
      ok: false,
      errorMessage: error.message || `Error al cargar el itemCarrito del carrito con ID: ${carrito_id} y medicamento con ID: ${medicamento_id}`,
    };
  }
};


export const deleteItemCarrito = async (itemCarrito_id) => {
  try {
    const resp = await deleteWithPathParam(BASE_PATH, itemCarrito_id);
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


