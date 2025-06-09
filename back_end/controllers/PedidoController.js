import PedidoService from '../services/PedidoService.js';

class PedidoController {
    async getAllPedidos(req, res) {
        try {
            const pedidos = await PedidoService.getAllPedidos();
            res.json(pedidos);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getPedidoById(req, res) {
        try {
            const { id } = req.params;
            const pedido = await PedidoService.getPedidoById(id);
            res.json(pedido);
        } catch (error) {
            if (error.message === 'Pedido no encontrado') {
                res.status(404).json({ error: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }

    async createPedido(req, res) {
        try {
            const pedidoData = req.body;
            const newPedido = await PedidoService.createPedido(pedidoData);
            res.status(201).json(newPedido);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async updatePedido(req, res) {
        try {
            const { id } = req.params;
            const pedidoData = req.body;
            const updatedPedido = await PedidoService.updatePedido(id, pedidoData);
            res.json(updatedPedido);
        } catch (error) {
            if (error.message === 'Pedido no encontrado') {
                res.status(404).json({ error: error.message });
            } else {
                res.status(400).json({ error: error.message });
            }
        }
    }

    async deletePedido(req, res) {
        try {
            const { id } = req.params;
            await PedidoService.deletePedido(id);
            res.status(204).send();
        } catch (error) {
            if (error.message === 'Pedido no encontrado') {
                res.status(404).json({ error: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }
}

export default new PedidoController();
