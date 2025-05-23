import express from "express";
import ItemCarritoController from "../controllers/ItemCarritoController.js";

const router = express.Router();

router.get("/",ItemCarritoController.findAll);
router.get("/:id",ItemCarritoController.findById);
router.get("/item/:carrito_id/:medicamento_id",ItemCarritoController.findItem);
router.post("/item",ItemCarritoController.createItem);
router.put("/item",ItemCarritoController.updateItem);
router.delete("/:id",ItemCarritoController.deleteItem);

export default router;