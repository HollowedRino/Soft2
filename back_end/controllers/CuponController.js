import CuponService from "../services/CuponService.js";

class CuponController {
    async findAll(req, res) {
        try {
            const cupon = await CuponService.findAll();
            res.status(200).json(cupon);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async findById(req, res) {
        try {
            const cupon = await CuponService.findById(req.params.id);
            res.status(200).json(cupon);
        } catch (error) {
            if (error.message === 'Cupon no encontrado') {
                res.status(404).json({ error: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }

    async create(req, res) {
        try {
            const cupon = await CuponService.create(req.body);
            res.status(201).json(cupon);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async update(req, res) {
        try {
            const cupon = await CuponService.update(req.params.id, req.body);
            res.status(200).json(cupon);
        } catch (error) {
            if (error.message === 'Cupon no encontrado') {
                res.status(404).json({ error: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }

    async delete(req, res) {
        try {
            await CuponService.delete(req.params.id);
            res.status(204).send();
        } catch (error) {
            if (error.message === 'Cupon no encontrado') {
                res.status(404).json({ error: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }
}

export default new CuponController();