import MetodoPagoService from "../services/MetodoPagoService.js";

class MetodoPagoController {
    async findAll(req, res) {
        try {
            const metodosPago = await MetodoPagoService.findAll();
            res.status(200).json(metodosPago);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async findById(req, res) {
        try {
            const metodoPago = await MetodoPagoService.findById(req.params.id);
            res.status(200).json(metodoPago);
        } catch (error) {
            if (error.message === 'Metodo de pago no encontrado') {
                res.status(404).json({ error: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }

    async create(req, res) {
        try {
            const metodoPago = await MetodoPagoService.create(req.body);
            res.status(201).json(metodoPago);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async update(req, res) {
        try {
            const metodoPago = await MetodoPagoService.update(req.params.id, req.body);
            res.status(200).json(metodoPago);
        } catch (error) {
            if (error.message === 'Metodo de pago no encontrado') {
                res.status(404).json({ error: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }

    async delete(req, res) {
        try {
            await MetodoPagoService.delete(req.params.id);
            res.status(204).send();
        } catch (error) {
            if (error.message === 'Metodo de pago no encontrado') {
                res.status(404).json({ error: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }
}

export default new MetodoPagoController();