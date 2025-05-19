import express from "express";
import PagoController from "../controllers/PagoController.js";

const router = express.Router();

router.get("/", PagoController.findAll);
router.get("/:id", PagoController.findById);
router.post("/", PagoController.create);
router.put("/:id", PagoController.update);
router.delete("/:id",PagoController.delete);

export default router;