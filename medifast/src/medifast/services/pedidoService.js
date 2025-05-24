import { post } from "./api";

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
        errorMessage: error ,
      };
    }
  };