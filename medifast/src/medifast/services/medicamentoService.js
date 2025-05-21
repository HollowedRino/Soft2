import { getWithPathParam } from "./api";

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