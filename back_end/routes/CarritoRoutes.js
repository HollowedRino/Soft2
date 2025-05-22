import express from "express";
import CarritoController from "../controllers/CarritoController.js";

const router = express.Router();

router.get("/", CarritoController.findAll);
router.get("/:id", CarritoController.findById);
router.get("/usuario/:usuarioId", CarritoController.findCarritoCompletoByUsuarioId);
router.post("/", CarritoController.create);
router.put("/:id", CarritoController.update);
router.delete("/:id", CarritoController.delete);

export default router;
