import PagoService from '../services/PagoService.js';

class PagoController {
    async findAll(req, res) {
        try {
            const pagos = await PagoService.findAll();
            res.json(pagos);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async findById(req, res) {
        try {
            const { id } = req.params;
            const pago = await PagoService.findById(id);
            res.json(pago);
        } catch (error) {
            if (error.message === 'Pago no encontrado') {
                res.status(404).json({ error: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }

    async create(req, res) {
        try {
            const pago = await PagoService.create(req.body);
            res.status(201).json(pago);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async update(req, res) {
        try {
            const pago = await PagoService.update(req.params.id, req.body);
            res.status(200).json(pago);
        } catch (error) {
            if (error.message === 'Pago no encontrado') {
                res.status(404).json({ error: error.message });
            } else {
                res.status(400).json({ error: error.message });
            }
        }
    }

    async delete(req, res) {
        try {
            await PagoService.delete(req.params.id);
            res.status(204).send();
        } catch (error) {
            if (error.message === 'Pago no encontrado') {
                res.status(404).json({ error: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }
}

export default new PagoController();
