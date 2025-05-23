import express from 'express';
import BoticaRepository from '../repositories/BoticaRepository.js';
import BoticaService from '../services/BoticaService.js';
import BoticaController from '../controllers/BoticaController.js';

const router = express.Router();

// Usar las instancias exportadas directamente
router.get('/', BoticaController.getAllBoticas);
router.get('/:id', BoticaController.getBoticaById);
router.post('/', BoticaController.createBotica);
router.put('/:id', BoticaController.updateBotica);
router.delete('/:id', BoticaController.deleteBotica);

export default router;


