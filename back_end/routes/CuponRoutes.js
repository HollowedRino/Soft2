import express from "express";
import CuponController from "../controllers/CuponController.js";

const router = express.Router();

router.get("/", CuponController.findAll);
router.get("/:id", CuponController.findById);
router.post("/", CuponController.create);
router.put("/:id", CuponController.update);
router.delete("/:id", CuponController.delete);

export default router;