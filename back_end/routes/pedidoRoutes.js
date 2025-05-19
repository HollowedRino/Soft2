import express from 'express';
import PedidoController from '../controllers/PedidoController.js';

const router = express.Router();

// Usar las instancias exportadas directamente
router.get('/', PedidoController.getAllPedidos);
router.get('/:id', PedidoController.getPedidoById);
router.post('/', PedidoController.createPedido);
router.put('/:id', PedidoController.updatePedido);
router.delete('/:id', PedidoController.deletePedido);

export default router;


