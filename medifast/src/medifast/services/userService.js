import { getWithPathParam, post } from "./api";

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




export const registerGoogleUser = async (userData) => {
  try {
    const user = await post("/user/google", userData);
    return {
      ok: true,
      user,
    };
  } catch (error) {
    if (error.status === 409) {
      // Usuario ya existe, lo consideramos "ok"
      return {
        ok: true,
        user: null, // o algún dato si quieres
      };
    }
    return {
      ok: false,
      errorMessage: error.message || "Error al registrar el usuario",
    };
  }
};

export const getUserByEmail = async (email) => {
  try {
    const resp = await getWithPathParam(`${BASE_PATH}/login`, email);
    return {
      ok: true,
      resp,
    };
  } catch (error) {
    return {
      ok: false,
      errorMessage: error.message || "Error al obtener el usuario",
    };
    
  }
}




