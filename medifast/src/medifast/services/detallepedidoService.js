import { getSimple, getWithPathParam } from "./api";

const BASE_PATH = "/detallepedido";

export const createDetallePedido = async (data) => {
    try {
      const resp = await post(`${BASE_PATH}`, data);
      return {
        ok: true,
        resp,
      };
    } catch (error) {
      return {
        ok: false,
        errorMessage: error.message || `Error al crear el detalle del pedido`,
      };
    }
  };