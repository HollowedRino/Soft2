import express from "express";
import MensajeController from "../controllers/MensajeController.js";

const router = express.Router();

router.get("/", MensajeController.findAll);
router.get("/:id", MensajeController.findById);
router.get("/chat/:id",MensajeController.findByChat);
router.post("/", MensajeController.create);
router.put("/:id", MensajeController.update);
router.delete("/:id", MensajeController.delete);

export default router;
