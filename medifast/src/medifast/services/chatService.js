import { getSimple, getWithPathParam, post } from "./api";

const BASE_PATH = "/chat";

export const findAll = async () => {
    try {
        const res = await getSimple(`${BASE_PATH}`);
        return {
            ok: true,
            res,
        };
    } catch (error) {
        return {
            ok: false,
            errorMessage: error.message || "Error al obtener los chats",
        };
    }
}

export const findById = async (chatId) => {
    try {
        const res = await getWithPathParam(`${BASE_PATH}/`,  chatId );
        return {
            ok: true,
            res,
        };
    } catch (error) {
        return {
            ok: false,
            errorMessage: error.message || "Error al obtener el chat",
        };
    }
}

export const findByPedido = async (pedidoId) => {
    try {
        const res = await getWithPathParam(`${BASE_PATH}/pedido`,  pedidoId );
        return {
            ok: true,
            res,
        };
    } catch (error) {
        return {
            ok: false,
            errorMessage: error.message || "Error al obtener el chat por pedido",
        };
    }
}

export const createChat = async (pedidoId, estado = "activo") => {
    try {
        const res = await post(`${BASE_PATH}`, {
            pedido_id: pedidoId,
            estado
        });
        return {
            ok: true,
            res,
        };
    } catch (error) {
        return {
            ok: false,
            errorMessage: error.message || "Error al crear el chat",
        };
    }
};