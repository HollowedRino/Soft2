import express from "express";
import { handleChatRequest } from "../../controllers/Chatbot/ChatbotController.js";

const router = express.Router();

router.post("/chatbot", handleChatRequest);

export default router;
