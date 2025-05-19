import express from "express";
import MetodoPagoController from "../controllers/MetodoPagoController.js";

const router = express.Router();

router.get("/", MetodoPagoController.findAll);
router.get("/:id", MetodoPagoController.findById);
router.post("/", MetodoPagoController.create);
router.put("/:id", MetodoPagoController.update);
router.delete("/:id", MetodoPagoController.delete);

export default router;