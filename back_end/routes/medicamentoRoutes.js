import express from "express";
import MedicamentoController from "../controllers/MedicamentoController.js";

const router = express.Router();

router.get("/", MedicamentoController.findAll);
router.get("/:id", MedicamentoController.findById);
router.post("/", MedicamentoController.create);
router.put("/:id", MedicamentoController.update);
router.delete("/:id", MedicamentoController.delete);

export default router;