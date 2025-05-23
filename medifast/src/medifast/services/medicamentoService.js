import { getSimple, getWithPathParam } from "./api";

const BASE_PATH = "/medicamento";

export const findMedsByCategory = async (category) => {
    try {
        const res = await getWithPathParam(`${BASE_PATH}/detalle/categoria`,  category );
        return {
            ok: true,
            res,
        };
    } catch (error) {
        return {
            ok: false,
            errorMessage: error.message || "Error al obtener los medicamentos por categoría",
        };
    }
}

export const findMedsByPartialName = async (nombre) => {
    try {
        const res = await getWithPathParam(`${BASE_PATH}/detalle/nombre`,  nombre );
        return {
            ok: true,
            res,
        };
    } catch (error) {
        return {
            ok: false,
            errorMessage: error.message || "Error al obtener los medicamentos por nombre parcial",
        };
    }
}

export const findAllMedsWithDetail= async () => {
    try {
        const res = await getSimple(`${BASE_PATH}/filtro/all`);
        return {
            ok: true,
            res,
        };
    } catch (error) {
        return {
            ok: false,
            errorMessage: error.message || "Error al obtener los medicamentos por nombre parcial",
        };
    }
}