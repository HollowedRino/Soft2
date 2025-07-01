import ChatbotService from "../../../services/Chatbot/ChatbotService.js";
import * as obtenerIntencionModule from "../../../utils/obtenerIntencion.js";
import * as MedicamentoService from "../../../services/MedicamentoService.js";
import * as BoticaService from "../../../services/BoticaService.js";
import * as formatResults from "../../../utils/formatResults.js";
import * as generarPromptRespuestaModule from "../../../prompts/generarPromptRespuesta.js";
import * as obtenerRespuestaRedactadaModule from "../../../utils/obtenerRespuestaRedactada.js";

jest.mock("../../../services/MedicamentoService.js", () => ({
  __esModule: true,
  default: {
    findByNombre: jest.fn(),
  },
}));
jest.mock("../../../services/BoticaService.js", () => ({
  __esModule: true,
  default: {
    getBoticaByDistrito: jest.fn(),
    getBoticaByNombre: jest.fn(),
  },
}));

describe("ChatbotService", () => {
    beforeEach(() => { 
        jest.clearAllMocks();
        MedicamentoService.default.findByNombre = jest.fn();
        BoticaService.default.getBoticaByDistrito = jest.fn();
        BoticaService.default.getBoticaByNombre = jest.fn();
    });

    it("should return funcionalidades message for consultar_funcionalidades", async () => {
        jest.spyOn(obtenerIntencionModule, "obtenerIntencion").mockResolvedValue({
            INTENCION: "consultar_funcionalidades"
        });
        jest.spyOn(formatResults, "formatearResultados").mockReturnValue("Funcionalidades disponibles.");
        jest.spyOn(generarPromptRespuestaModule, "generarPromptRespuesta").mockReturnValue("prompt");
        jest.spyOn(obtenerRespuestaRedactadaModule, "obtenerRespuestaRedactada").mockResolvedValue("Respuesta redactada");

        const result = await ChatbotService.procesarMensaje("¿Qué puedes hacer?");
        console.log(result);
        expect(result).toEqual({ mensaje: "Respuesta redactada" });
    });

    it("should search medicamento for buscar_medicamento", async () => {
        jest.spyOn(obtenerIntencionModule, "obtenerIntencion").mockResolvedValue({
            INTENCION: "buscar_medicamento",
            VALOR: "paracetamol"
        });
        MedicamentoService.default.findByNombre.mockResolvedValue([{ nombre: "Paracetamol" }]);
        jest.spyOn(formatResults, "formatearResultados").mockReturnValue("Paracetamol encontrado.");
        jest.spyOn(generarPromptRespuestaModule, "generarPromptRespuesta").mockReturnValue("prompt");
        jest.spyOn(obtenerRespuestaRedactadaModule, "obtenerRespuestaRedactada").mockResolvedValue("Medicamento encontrado");

        const result = await ChatbotService.procesarMensaje("Busco paracetamol");
        expect(MedicamentoService.default.findByNombre).toHaveBeenCalledWith("paracetamol");
        expect(result).toEqual({ mensaje: "Medicamento encontrado" });
    });

    it("should search botica by distrito for buscar_botica_distrito", async () => {
        jest.spyOn(obtenerIntencionModule, "obtenerIntencion").mockResolvedValue({
            INTENCION: "buscar_botica_distrito",
            VALOR: "Miraflores"
        });
        BoticaService.default.getBoticaByDistrito.mockResolvedValue([{ nombre: "Botica Miraflores" }]);
        jest.spyOn(formatResults, "formatearResultados").mockReturnValue("Boticas en Miraflores.");
        jest.spyOn(generarPromptRespuestaModule, "generarPromptRespuesta").mockReturnValue("prompt");
        jest.spyOn(obtenerRespuestaRedactadaModule, "obtenerRespuestaRedactada").mockResolvedValue("Boticas encontradas");

        const result = await ChatbotService.procesarMensaje("Boticas en Miraflores");
        expect(BoticaService.default.getBoticaByDistrito).toHaveBeenCalledWith("Miraflores");
        expect(result).toEqual({ mensaje: "Boticas encontradas" });
    });

    it("should search botica by nombre for buscar_botica_nombre", async () => {
        jest.spyOn(obtenerIntencionModule, "obtenerIntencion").mockResolvedValue({
            INTENCION: "buscar_botica_nombre",
            VALOR: "Inkafarma"
        });
        BoticaService.default.getBoticaByNombre.mockResolvedValue([{ nombre: "Inkafarma" }]);
        jest.spyOn(formatResults, "formatearResultados").mockReturnValue("Inkafarma encontrada.");
        jest.spyOn(generarPromptRespuestaModule, "generarPromptRespuesta").mockReturnValue("prompt");
        jest.spyOn(obtenerRespuestaRedactadaModule, "obtenerRespuestaRedactada").mockResolvedValue("Botica encontrada");

        const result = await ChatbotService.procesarMensaje("¿Dónde está Inkafarma?");
        expect(BoticaService.default.getBoticaByNombre).toHaveBeenCalledWith("Inkafarma");
        expect(result).toEqual({ mensaje: "Botica encontrada" });
    });

    it("should return default message for desconocido", async () => {
        jest.spyOn(obtenerIntencionModule, "obtenerIntencion").mockResolvedValue({
            INTENCION: "desconocido"
        });
        jest.spyOn(formatResults, "formatearResultados").mockReturnValue("No entendí tu solicitud.");
        jest.spyOn(generarPromptRespuestaModule, "generarPromptRespuesta").mockReturnValue("prompt");
        jest.spyOn(obtenerRespuestaRedactadaModule, "obtenerRespuestaRedactada").mockResolvedValue("No entendí tu solicitud");

        const result = await ChatbotService.procesarMensaje("Mensaje irreconocible");
        expect(result).toEqual({ mensaje: "No entendí tu solicitud" });
    });

    it("should throw error if obtenerIntencion returns invalid data", async () => {
        jest.spyOn(obtenerIntencionModule, "obtenerIntencion").mockResolvedValue(null);

        await expect(ChatbotService.procesarMensaje("Hola")).rejects.toThrow("Respuesta inválida del modelo");
    });
});
