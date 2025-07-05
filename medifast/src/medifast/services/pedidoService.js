import { post, getSimple, put } from "./api";

const BASE_PATH = "/pedido";

export const createPedido = async (data) => {
    console.log(data)
    try {
      const resp = await post(`${BASE_PATH}`, data);
      console.log(resp)
      return {
        ok: true,
        resp,
      };
    } catch (error) {
      console.log(error)
      return {
        ok: false,
        errorMessage: error,
      };
    }
};

export const getPedidosByUsuario = async (usuarioId) => {
    try {
        const resp = await getSimple(`${BASE_PATH}/usuario/${usuarioId}`);
        return {
            ok: true,
            resp,
        };
    } catch (error) {
        return {
            ok: false,
            errorMessage: error.message || "Error al obtener los pedidos del usuario",
        };
    }
};

export const getPedidosByRepartidor = async (repartidorId) => {
    try {
        console.log('Calling getPedidosByRepartidor with ID:', repartidorId);
        const url = `${BASE_PATH}/repartidor/${repartidorId}`;
        console.log('URL:', url);
        const resp = await getSimple(url);
        console.log('Response:', resp);
        return {
            ok: true,
            resp,
        };
    } catch (error) {
        console.error('Error in getPedidosByRepartidor:', error);
        return {
            ok: false,
            errorMessage: error.message || "Error al obtener los pedidos del repartidor",
        };
    }
};

export const getPedidoById = async (pedidoId) => {
    try {
        const resp = await getSimple(`${BASE_PATH}/${pedidoId}`);
        return {
            ok: true,
            resp,
        };
    } catch (error) {
        return {
            ok: false,
            errorMessage: error.message || "Error al obtener el pedido",
        };
    }
};

export const updatePedidoById = async (pedidoId, pedidoData) => {
    try {
        const resp = await put(`${BASE_PATH}/${pedidoId}`, pedidoData);
        return {
            ok: true,
            resp,
        };
    } catch (error) {
        return {
            ok: false,
            errorMessage: error.message || "Error al actualizar el pedido",
        };
    }
};