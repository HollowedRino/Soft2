import { getSimple, getWithPathParam } from "./api";

const BASE_PATH = "/mensaje";

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
            errorMessage: error.message || "Error al obtener los mensajes",
        };
    }
}

export const findById = async (mensajeId) => {
    try {
        const res = await getWithPathParam(`${BASE_PATH}/`,  mensajeId );
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

export const findByChat = async (chatId) => {
    try {
        const res = await getWithPathParam(`${BASE_PATH}/chat`,  chatId );
        return {
            ok: true,
            res,
        };
    } catch (error) {
        return {
            ok: false,
            errorMessage: error.message || "Error al obtener los mensajes por chat",
        };
    }
}