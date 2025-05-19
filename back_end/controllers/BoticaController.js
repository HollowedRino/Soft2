import BoticaService from '../services/BoticaService.js';

class BoticaController {
    async getAllBoticas(req, res) {
        try {
            const boticas = await BoticaService.getAllBoticas();
            res.json(boticas);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getBoticaById(req, res) {
        try {
            const { id } = req.params;
            const botica = await BoticaService.getBoticaById(id);
            res.json(botica);
        } catch (error) {
            if (error.message === 'Botica no encontrada') {
                res.status(404).json({ error: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }

    async createBotica(req, res) {
        try {
            const boticaData = req.body;
            const newBotica = await BoticaService.createBotica(boticaData);
            res.status(201).json(newBotica);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async updateBotica(req, res) {
        try {
            const { id } = req.params;
            const boticaData = req.body;
            const updatedBotica = await BoticaService.updateBotica(id, boticaData);
            res.json(updatedBotica);
        } catch (error) {
            if (error.message === 'Botica no encontrada') {
                res.status(404).json({ error: error.message });
            } else {
                res.status(400).json({ error: error.message });
            }
        }
    }

    async deleteBotica(req, res) {
        try {
            const { id } = req.params;
            await BoticaService.deleteBotica(id);
            res.status(204).send();
        } catch (error) {
            if (error.message === 'Botica no encontrada') {
                res.status(404).json({ error: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }
}

export default new BoticaController();
