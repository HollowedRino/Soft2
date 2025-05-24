import InventarioBoticaService from '../services/InventarioBoticaService.js';

class InventarioBoticaController {
    async findAll(req, res) {
        try {
            const inventariosBotica = await InventarioBoticaService.findAll();
            res.json(inventariosBotica);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async findById(req, res) {
        try {
            const { id } = req.params;
            const inventarioBotica = await InventarioBoticaService.findById(id);
            res.json(inventarioBotica);
        } catch (error) {
            if (error.message === 'Inventario de la botica no encontrado') {
                res.status(404).json({ error: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }

    async create(req, res) {
        try {
            const inventarioBotica = await InventarioBoticaService.create(req.body);
            res.status(201).json(inventarioBotica);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async update(req, res) {
        try {
            const inventarioBotica = await InventarioBoticaService.update(req.params.id, req.body);
            res.status(200).json(inventarioBotica);
        } catch (error) {
            if (error.message === 'Inventario de la botica no encontrado') {
                res.status(404).json({ error: error.message });
            } else {
                res.status(400).json({ error: error.message });
            }
        }
    }

    async delete(req, res) {
        try {
            await InventarioBoticaService.delete(req.params.id);
            res.status(204).send();
        } catch (error) {
            if (error.message === 'Inventario de la botica no encontrado') {
                res.status(404).json({ error: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }



    async findByBoticaId(req, res) {
    try {
        const { boticaId } = req.params;
        const inventario = await InventarioBoticaService.findByBoticaId(boticaId);
        res.json(inventario);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

    

}

export default new InventarioBoticaController();
