import express from "express";
import MedicamentoController from "../controllers/MedicamentoController.js";

const router = express.Router();

//"/Medicamento/"

router.get("/", MedicamentoController.findAll);
router.get("/:id", MedicamentoController.findById);
router.get("/detalle/:id",MedicamentoController.findByIdPlus);
router.get("/detalle/categoria/:categoria",MedicamentoController.findByCategoriaPlus);
router.get("/detalle/nombre/:nombre",MedicamentoController.findByNombreParcial);
router.get("/filtro/all",MedicamentoController.findAllWithDetalle);
router.get("/disponibles", MedicamentoController.findDisponibles);
router.post("/", MedicamentoController.create);
router.put("/:id", MedicamentoController.update);
router.delete("/:id", MedicamentoController.delete);

export default router;
