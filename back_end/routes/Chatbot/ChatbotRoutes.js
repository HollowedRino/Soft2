import express from "express";
import ChatbotController from "../../controllers/Chatbot/ChatbotController.js";

const router = express.Router();

router.post("/chatbot", ChatbotController.handleChatRequest);

export default router;
