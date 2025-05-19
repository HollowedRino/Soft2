import express from "express";
import RepartidorController from "../controllers/RepartidorController.js";

const router = express.Router();

router.get("/", RepartidorController.findAll);
router.get("/:id", RepartidorController.findById);
router.post("/", RepartidorController.create);
router.put("/:id", RepartidorController.update);
router.delete("/:id", RepartidorController.delete);

export default router;