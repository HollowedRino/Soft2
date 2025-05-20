import { post } from "./api";

const BASE_PATH = "/user";

export const registerUserInBackend = async (userData) => {
  try {
    const user = await post(BASE_PATH, userData);
    return {
      ok: true,
      user,
    };
  } catch (error) {
    return {
      ok: false,
      errorMessage: error.message || "Error al registrar el usuario",
    };
  }
};
