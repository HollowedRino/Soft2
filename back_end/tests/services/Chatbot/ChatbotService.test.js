import chatbotService from "../../../services/Chatbot/ChatbotService";
import { obtenerIntencion } from "../../../utils/obtenerIntencion";
import { obtenerRespuestaRedactada } from "../../../utils/obtenerRespuestaRedactada";
import BoticaService from "../../../services/BoticaService";
import MedicamentoService from "../../../services/MedicamentoService";
import { intencionFuncionalidades, intencionBuscarMed, intencionBuscarBotiPorDistrito, intencionBuscarBotiPorNombre, intencionDesconocida } from "../../fixtures/ChatbotIntents";
import { generarPromptRespuesta } from "../../../prompts/generarPromptRespuesta";

jest.mock('../../../utils/obtenerIntencion', () => ({
    obtenerIntencion: jest.fn(),
}));
jest.mock('../../../utils/obtenerRespuestaRedactada', () => ({
    obtenerRespuestaRedactada: jest.fn(),
}));
jest.mock('../../../services/BoticaService', () => ({
    getBoticaByDistrito: jest.fn(),
    getBoticaByNombre: jest.fn(),
}));
jest.mock('../../../services/MedicamentoService', () => ({
    findByNombre: jest.fn(),
}));
jest.mock('../../../prompts/generarPromptRespuesta', () => ({
    generarPromptRespuesta: jest.fn(),
}));

beforeEach(() => {
    jest.clearAllMocks();
});

describe('Pruebas en ChatbotService', () => {

    test('procesarMensaje debe de usar consultar_funcionalidades', async () => {
        // mensaje de usuario que solicita funcionalidades
        const mensajeUsuario = "¿Qué opciones puedes realizar?";
        // Mock de la intención de consultar funcionalidades
        obtenerIntencion.mockResolvedValue(intencionFuncionalidades);
        // respuesta final que se devolvera al usuario q llama a la api de gemini
        obtenerRespuestaRedactada.mockResolvedValue("Puedo ayudarte a consultar productos disponibles.");
        // se llama a la api de gemini para generar la respuesta final q llegara al usuario
        generarPromptRespuesta.mockReturnValue("Mocked prompt");

        // se llama al metodo procesarMensaje del servicio chatbotService
        const respuesta = await chatbotService.procesarMensaje(mensajeUsuario);

        // se verifica que se llame con la intencion correcta
        expect(generarPromptRespuesta).toHaveBeenCalledWith(
            "consultar_funcionalidades",
            "-",
            expect.stringContaining("Por ahora solo puedo ayudarte"),
            mensajeUsuario
        );
        expect(respuesta.mensaje).toContain("Puedo ayudarte a consultar productos");
    });

    test('procesarMensaje debe de buscar medicamento', async () => {
        // mensaje de usuario que solicita buscar un medicamento
        const mensajeUsuario = "Estoy buscando paracetamol";
        // Mock de la intención de buscar medicamento
        obtenerIntencion.mockResolvedValue(intencionBuscarMed);
        // respuesta final que se devolvera al usuario q llama a la api de gemini
        MedicamentoService.findByNombre.mockResolvedValue([{ nombre: "Paracetamol", descripcion: "Analgésico" }]);
        // se llama a la api de gemini para generar la respuesta final q llegara al usuario
        obtenerRespuestaRedactada.mockResolvedValue("Aquí tienes los medicamentos encontrados.");
        // se genera el prompt que se enviara a la api de gemini
        generarPromptRespuesta.mockReturnValue("Mocked prompt");

        // se llama al metodo procesarMensaje del servicio chatbotService
        const respuesta = await chatbotService.procesarMensaje(mensajeUsuario);

        // se verifica que se llame al servicio de MedicamentoService con el nombre correcto
        expect(MedicamentoService.findByNombre).toHaveBeenCalledWith("paracetamol");

        // se verifica que se llame a generarPromptRespuesta con los parametros correctos
        expect(generarPromptRespuesta).toHaveBeenCalledWith(
            "buscar_medicamento",
            "paracetamol",
            expect.any(String),
            mensajeUsuario
        );
        // se verifica que la respuesta contenga la información esperada
        expect(respuesta.mensaje).toContain("Aquí tienes los medicamentos encontrados");
    });

    test('procesarMensaje debe de buscar botica por distrito', async () => {
        // mensaje de usuario que solicita buscar boticas en un distrito específico
        const mensajeUsuario = "Quiero buscar boticas en Jesús María";
        // Mock de la intención de buscar botica por distrito
        obtenerIntencion.mockResolvedValue(intencionBuscarBotiPorDistrito);
        // respuesta final que se devolvera al usuario q llama a la api de gemini
        BoticaService.getBoticaByDistrito.mockResolvedValue([{ nombre: "Botica Salud", distrito: "Jesús María" }]);
        // se llama a la api de gemini para generar la respuesta final q llegara al usuario
        obtenerRespuestaRedactada.mockResolvedValue("Estas son las boticas en el distrito.");
        // se genera el prompt que se enviara a la api de gemini
        generarPromptRespuesta.mockReturnValue("Mocked prompt");

        // se llama al metodo procesarMensaje del servicio chatbotService
        const respuesta = await chatbotService.procesarMensaje(mensajeUsuario);

        // se verifica que se llame al servicio de BoticaService con el distrito correcto
        expect(BoticaService.getBoticaByDistrito).toHaveBeenCalledWith("Jesús María");
        // se verifica que se llame a generarPromptRespuesta con los parametros correctos
        expect(generarPromptRespuesta).toHaveBeenCalledWith(
            "buscar_botica_distrito",
            "Jesús María",
            expect.any(String),
            mensajeUsuario
        );
        // se verifica que la respuesta contenga la información esperada
        expect(respuesta.mensaje).toContain("Estas son las boticas en el distrito");
    });

    test('procesarMensaje debe de buscar botica por nombre', async () => {
        // mensaje de usuario que solicita buscar una botica por nombre
        const mensajeUsuario = "Quiero buscar la botica BTL";
        // Mock de la intención de buscar botica por nombre
        obtenerIntencion.mockResolvedValue(intencionBuscarBotiPorNombre);
        // respuesta final que se devolvera al usuario q llama a la api de gemini
        BoticaService.getBoticaByNombre.mockResolvedValue([{ nombre: "BTL", direccion: "Av. Principal 123" }]);
        // se llama a la api de gemini para generar la respuesta final q llegara al usuario
        obtenerRespuestaRedactada.mockResolvedValue("Aquí tienes la información de la botica.");
        // se genera el prompt que se enviara a la api de gemini
        generarPromptRespuesta.mockReturnValue("Mocked prompt");

        // se llama al metodo procesarMensaje del servicio chatbotService
        const respuesta = await chatbotService.procesarMensaje(mensajeUsuario);

        // se verifica que se llame al servicio de BoticaService con el nombre correcto
        expect(BoticaService.getBoticaByNombre).toHaveBeenCalledWith("BTL");
        // se verifica que se llame a generarPromptRespuesta con los parametros correctos
        expect(generarPromptRespuesta).toHaveBeenCalledWith(
            "buscar_botica_nombre",
            "BTL",
            expect.any(String),
            mensajeUsuario
        ); 
        // se verifica que la respuesta contenga la información esperada
        expect(respuesta.mensaje).toContain("Aquí tienes la información de la botica");
    });

    // UNHAPPY PATH
    test('procesarMensaje debe de manejar intención desconocida', async () => {
        // mensaje de usuario que no se entiende
        const mensajeUsuario = "asdfgh";
        // Mock de la intención desconocida
        obtenerIntencion.mockResolvedValue(intencionDesconocida);
        // respuesta final que se devolvera al usuario q llama a la api de gemini
        obtenerRespuestaRedactada.mockResolvedValue("No entendí tu solicitud.");
        // se llama a la api de gemini para generar la respuesta final q llegara al usuario
        generarPromptRespuesta.mockReturnValue("Mocked prompt");

        // se llama al metodo procesarMensaje del servicio chatbotService
        const respuesta = await chatbotService.procesarMensaje(mensajeUsuario);

        // se verifica que se llame a generarPromptRespuesta con los parametros correctos
        expect(generarPromptRespuesta).toHaveBeenCalledWith(
            "desconocido",
            "-",
            expect.stringContaining("No entendí tu solicitud"),
            mensajeUsuario
        );
        // se verifica que la respuesta contenga el mensaje de error esperado
        expect(respuesta.mensaje).toContain("No entendí tu solicitud");
    });
});
