import express from 'express';
import PedidoController from '../controllers/PedidoController.js';

const router = express.Router();

router.get('/', PedidoController.getAllPedidos);
router.get('/usuario/:usuarioId', PedidoController.getPedidosByUsuario); 
router.get('/repartidor/:repartidorId', PedidoController.getPedidosByRepartidor);
router.get('/:id', PedidoController.getPedidoById);
router.post('/', PedidoController.createPedido);
router.put('/:id', PedidoController.updatePedido);
router.delete('/:id', PedidoController.deletePedido);

export default router;