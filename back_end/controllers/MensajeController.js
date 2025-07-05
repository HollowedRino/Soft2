import MensajeService from "../services/MensajeService.js";

class MensajeController {
    async findAll(req, res) {
        try {
            const chats = await MensajeService.findAll();
            res.status(200).json(chats);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async findById(req, res) {
        try {
            const chat = await MensajeService.findById(req.params.id);
            res.status(200).json(chat);
        } catch (error) {
            if (error.message === 'Mensaje no encontrado') {
                res.status(404).json({ error: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }

    async findByChat(req,res) {
        try {
            const mensaje = await MensajeService.findByChat(req.params.id);
            res.status(200).json(mensaje);
        } catch (error) {
            if (error.message === 'Mensajes por chat no encontrados') {
                res.status(404).json({error: error.message});
            } else {
                res.status(500).json({error: error.message});
            }
        }
    }

    async create(req, res) {
        try {
            const chat = await MensajeService.create(req.body);
            res.status(201).json(chat);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async update(req, res) {
        try {
            const chat = await MensajeService.update(req.params.id, req.body);
            res.status(200).json(chat);
        } catch (error) {
            if (error.message === 'Mensaje no encontrado') {
                res.status(404).json({ error: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }

    async delete(req, res) {
        try {
            await MensajeService.delete(req.params.id);
            res.status(204).send();
        } catch (error) {
            if (error.message === 'Mensaje no encontrado') {
                res.status(404).json({ error: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }
}

export default new MensajeController();
