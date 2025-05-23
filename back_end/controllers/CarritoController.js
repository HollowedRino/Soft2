import CarritoService from "../services/CarritoService.js";

class CarritoController {
    async findAll(req, res) {
        try {
            const carritos = await CarritoService.findAll();
            res.status(200).json(carritos);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async findById(req, res) {
        try {
            const carrito = await CarritoService.findById(req.params.id);
            res.status(200).json(carrito);
        } catch (error) {
            if (error.message === 'Carrito no encontrado') {
                res.status(404).json({ error: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }
    async findCarritoCompletoByUsuarioId(req, res) {
        try {
            const carrito = await CarritoService.findCarritoCompletoByUsuarioId(req.params.usuarioId);
            res.status(200).json(carrito);
        } catch (error) {
            if (error.message === 'Carrito no encontrado para este usuario') {
                res.status(404).json({ error: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }

    async create(req, res) {
        try {
            const carrito = await CarritoService.create(req.body);
            res.status(201).json(carrito);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async update(req, res) {
        try {
            const carrito = await CarritoService.update(req.params.id, req.body);
            res.status(200).json(carrito);
        } catch (error) {
            if (error.message === 'Carrito no encontrado') {
                res.status(404).json({ error: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }

    async delete(req, res) {
        try {
            await CarritoService.delete(req.params.id);
            res.status(204).send();
        } catch (error) {
            if (error.message === 'Carrito no encontrado') {
                res.status(404).json({ error: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }
}

export default new CarritoController();