import DistritoService from "../services/DistritoService.js";

class DistritoController {
    async findAll(req, res) {
        try {
            const distritos = await DistritoService.findAll();
            res.status(200).json(distritos);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async findById(req, res) {
        try {
            const distrito = await DistritoService.findById(req.params.id);
            res.status(200).json(distrito);
        } catch (error) {
            if (error.message === 'Distrito no encontrado') {
                res.status(404).json({ error: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }

    async create(req, res) {
        try {
            const distrito = await DistritoService.create(req.body);
            res.status(201).json(distrito);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async update(req, res) {
        try {
            const distrito = await DistritoService.update(req.params.id, req.body);
            res.status(200).json(distrito);
        } catch (error) {
            if (error.message === 'Distrito no encontrado') {
                res.status(404).json({ error: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }

    async delete(req, res) {
        try {
            await DistritoService.delete(req.params.id);
            res.status(204).send();
        } catch (error) {
            if (error.message === 'Distrito no encontrado') {
                res.status(404).json({ error: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }
}

export default new DistritoController();