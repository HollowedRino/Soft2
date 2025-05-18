import RepartidorService from "../services/RepartidorService.js";

class RepartidorController {
    async findAll(req, res) {
        try {
            const repartidores = await RepartidorService.findAll();
            res.status(200).json(repartidores);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async findById(req, res) {
        try {
            const repartidor = await RepartidorService.findById(req.params.id);
            res.status(200).json(repartidor);
        } catch (error) {
            if (error.message === 'Repartidor no encontrado') {
                res.status(404).json({ error: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }

    async create(req, res) {
        try {
            const repartidor = await RepartidorService.create(req.body);
            res.status(201).json(repartidor);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async update(req, res) {
        try {
            const repartidor = await RepartidorService.update(req.params.id, req.body);
            res.status(200).json(repartidor);
        } catch (error) {
            if (error.message === 'Repartidor no encontrado') {
                res.status(404).json({ error: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }

    async delete(req, res) {
        try {
            await RepartidorService.delete(req.params.id);
            res.status(204).send();
        } catch (error) {
            if (error.message === 'Repartidor no encontrado') {
                res.status(404).json({ error: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }
}

export default new RepartidorController();