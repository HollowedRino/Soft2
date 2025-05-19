import express from "express";
import DistritoController from "../controllers/DistritoController.js";

const router = express.Router();

router.get("/", DistritoController.findAll);
router.get("/:id", DistritoController.findById);
router.post("/", DistritoController.create);
router.put("/:id", DistritoController.update);
router.delete("/:id", DistritoController.delete);

export default router;