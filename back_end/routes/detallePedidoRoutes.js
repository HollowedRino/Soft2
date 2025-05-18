import express from "express";
import DetallePedidoController from "../controllers/DetallePedidoController.js";

const router = express.Router();

router.get("/", DetallePedidoController.getAllDetallePedidos);
router.get("/:id", DetallePedidoController.getDetallePedidoById);
router.post("/", DetallePedidoController.createDetallePedido);
router.put("/:id", DetallePedidoController.updateDetallePedido);
router.delete("/:id", DetallePedidoController.deleteDetallePedido);

export default router;