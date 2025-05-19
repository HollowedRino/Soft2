import DireccionUsuarioService from '../services/DireccionUsuarioService.js';

class DireccionUsuarioController {
    async getAllDirecciones(req, res) {
        try {
            const direcciones = await DireccionUsuarioService.getAllDirecciones();
            res.json(direcciones);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getDireccionById(req, res) {
        try {
            const { id } = req.params;
            const direccionUsuario = await DireccionUsuarioService.getDireccionById(id);
            res.json(direccionUsuario);
        } catch (error) {
            if (error.message === 'Direccion de usuario no encontrada') {
                res.status(404).json({ error: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }

    async createDireccion(req, res) {
        try {
            const direccionUsuarioData = req.body;
            const newDireccionUsuario = await DireccionUsuarioService.createDireccion(direccionUsuarioData);
            res.status(201).json(newDireccionUsuario);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async updateDireccion(req, res) {
        try {
            const { id } = req.params;
            const direccionUsuarioData = req.body;
            const updatedDireccionUsuario = await DireccionUsuarioService.updateDireccion(id, direccionUsuarioData);
            res.json(updatedDireccionUsuario);
        } catch (error) {
            if (error.message === 'Direccion de usuario no encontrada') {
                res.status(404).json({ error: error.message });
            } else {
                res.status(400).json({ error: error.message });
            }
        }
    }

    async deleteDireccion(req, res) {
        try {
            const { id } = req.params;
            await DireccionUsuarioService.deleteDireccion(id);
            res.status(204).send();
        } catch (error) {
            if (error.message === 'Direccion de usuario no encontrada') {
                res.status(404).json({ error: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }
}

export default new DireccionUsuarioController();
