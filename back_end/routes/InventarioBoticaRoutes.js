import express from "express";
import InventarioBoticaController from "../controllers/InventarioBoticaController.js";

const router = express.Router();
router.get('/botica/:boticaId', InventarioBoticaController.findByBoticaId);
router.get("/", InventarioBoticaController.findAll);
router.get("/:id", InventarioBoticaController.findById);
router.post("/", InventarioBoticaController.create);
router.put("/:id", InventarioBoticaController.update);
router.delete("/:id", InventarioBoticaController.delete);

export default router;