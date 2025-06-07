import express from "express";
import ChatController from "../controllers/ChatController.js";

const router = express.Router();

router.get("/", ChatController.findAll);
router.get("/:id", ChatController.findById);
router.get("/pedido/:id",ChatController.findByPedidoId);
router.post("/", ChatController.create);
router.put("/:id", ChatController.update);
router.delete("/:id", ChatController.delete);

export default router;
