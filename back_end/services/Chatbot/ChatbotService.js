import { generarPromptRespuesta } from "../../prompts/generarPromptRespuesta,js";
import { formatearResultados } from "../../utils/formatResults.js";
import { obtenerIntencion } from "../../utils/obtenerIntencion.js";
import { obtenerRespuestaRedactada } from "../../utils/obtenerRespuestaRedactada.js";
import BoticaService from "../BoticaService.js";
import MedicamentoService from "../MedicamentoService.js";

export const procesarMensaje = async (mensajeUsuario) => {

    const data = await obtenerIntencion(mensajeUsuario);
    
    if (!data || !data.INTENCION) {
      throw new Error("Respuesta inválida del modelo");
    }

    let resultados = null;

    switch (data.INTENCION) {
      case "consultar_funcionalidades":
        resultados = { mensaje: "Por ahora solo puedo ayudarte a consultar productos disponibles, buscar boticas por nombre o encontrar boticas según distritos disponibles en Lima." };
        break;
      case "buscar_medicamento":
        resultados = await MedicamentoService.findByNombre(data.VALOR);
        break;
      case "buscar_botica_distrito":
        resultados = await BoticaService.getBoticaByDistrito(data.VALOR);
        break;
      case "buscar_botica_nombre":
        resultados = await BoticaService.getBoticaByNombre(data.VALOR);
        break;
      case "desconocido":
      default:
        resultados = { mensaje: "No entendí tu solicitud. ¿Podrías reformularla?" } ;
    }
    console.log("RESULTADOS ANTES DE FORMATEAR:")
    console.log(resultados);
    const resultadosTexto = formatearResultados(resultados, data.INTENCION);
    console.log(resultadosTexto)
    // Generar prompt para respuesta final
    const prompt = generarPromptRespuesta(data.INTENCION, data.VALOR, resultadosTexto, mensajeUsuario);

    // Obtener respuesta redactada por Gemini
    const mensaje = await obtenerRespuestaRedactada(prompt);

    return { mensaje };

};
