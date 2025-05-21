import MedicamentoController from "../controllers/MedicamentoController.js";
import express from "express";

const router = express.Router();

router.get("/", MedicamentoController.findAll);
router.get("/:id", MedicamentoController.findById);
router.get("/detalle/:id",MedicamentoController.findByIdPlus);
router.get("/detalle/categoria/:categoria",MedicamentoController.findByCategoriaPlus);
router.get("/detalle/nombre/:nombre",MedicamentoController.findByNombreParcial);
router.post("/", MedicamentoController.create);
router.put("/:id", MedicamentoController.update);
router.delete("/:id", MedicamentoController.delete);

export default router;