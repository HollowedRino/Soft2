import { post } from "./api";

const BASE_PATH = "/api";

export const sendChatbotMessage = async (message) => {
    try {
        const response = await post(`${BASE_PATH}/chatbot`,message);
        return {
            ok: true,
            response,
        };
    } catch (error) {
        return {
            ok: false,
            errorMessage: "Error al comunicarte con el chatbot, por favor intentelo mas tarde",
            error,
        }
    }
}