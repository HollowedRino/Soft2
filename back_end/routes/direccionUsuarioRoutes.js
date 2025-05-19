import express from 'express';
import DireccionUsuarioController from '../controllers/DireccionUsuarioController.js';

const router = express.Router();

// Usar las instancias exportadas directamente
router.get('/', DireccionUsuarioController.getAllDirecciones);
router.get('/:id', DireccionUsuarioController.getDireccionById);
router.post('/', DireccionUsuarioController.createDireccion);
router.put('/:id', DireccionUsuarioController.updateDireccion);
router.delete('/:id', DireccionUsuarioController.deleteDireccion);

export default router;


