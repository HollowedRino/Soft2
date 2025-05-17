import express from 'express';
import BoticaRepository from '../repositories/BoticaRepository.js';
import BoticaService from '../services/BoticaService.js';
import BoticaController from '../controllers/BoticaController.js';

const router = express.Router();

// Usar las instancias exportadas directamente
router.get('/boticas', BoticaController.getAllBoticas);
router.get('/boticas/:id', BoticaController.getBoticaById);
router.post('/boticas', BoticaController.createBotica);
router.put('/boticas/:id', BoticaController.updateBotica);
router.delete('/boticas/:id', BoticaController.deleteBotica);

export default router;


