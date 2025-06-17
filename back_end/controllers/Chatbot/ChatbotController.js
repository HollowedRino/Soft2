import { procesarMensaje } from "../../services/Chatbot/ChatbotService.js";

export const handleChatRequest = async (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: "Se requiere un mensaje" });
  }

  try {
    const respuesta = await procesarMensaje(message);
    res.status(200).json({ resultado: respuesta });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
