import ChatbotService from "../../services/Chatbot/ChatbotService.js";


class ChatbotController {
  async handleChatRequest(req, res) {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Se requiere un mensaje" });
    }

    try {
      const respuesta = await ChatbotService.procesarMensaje(message);
      res.status(200).json({ resultado: respuesta });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
}

export default new ChatbotController();