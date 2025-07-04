import ChatService from "../services/ChatService.js";

class ChatController {
    async findAll(req, res) {
        try {
            const chats = await ChatService.findAll();
            res.status(200).json(chats);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async findById(req, res) {
        try {
            const chat = await ChatService.findById(req.params.id);
            res.status(200).json(chat);
        } catch (error) {
            if (error.message === 'Chat no encontrado') {
                res.status(404).json({ error: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }

    async findByPedidoId(req,res) {
        try {
            console.log('ChatController.findByPedidoId - req.params:', req.params);
            const pedido = await ChatService.findByPedidoId(req.params.id);
            res.status(200).json(pedido);
        } catch (error) {
            console.error('ChatController.findByPedidoId - error:', error);
            if (error.message === 'Chats por pedido no encontrado') {
                res.status(404).json({error: error.message});
            } else {
                res.status(500).json({error: error.message});
            }
        }
    }

    async create(req, res) {
        try {
            console.log('ChatController.create - req.body:', req.body);
            const chat = await ChatService.create(req.body);
            console.log('ChatController.create - result:', chat);
            res.status(201).json(chat);
        } catch (error) {
            console.error('ChatController.create - error:', error);
            res.status(500).json({ error: error.message });
        }
    }

    async update(req, res) {
        try {
            const chat = await ChatService.update(req.params.id, req.body);
            res.status(200).json(chat);
        } catch (error) {
            if (error.message === 'Chat no encontrado') {
                res.status(404).json({ error: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }

    async delete(req, res) {
        try {
            await ChatService.delete(req.params.id);
            res.status(204).send();
        } catch (error) {
            if (error.message === 'Chat no encontrado') {
                res.status(404).json({ error: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }
}

export default new ChatController();
