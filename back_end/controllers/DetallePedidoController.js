import DetallePedidoService from "../services/DetallePedidoService.js";

class DetallePedidoController {
    async getAllDetallePedidos(req, res) {
        try {
            const detallePedidos = await DetallePedidoService.getAllDetallePedidos();
            res.json(detallePedidos);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getDetallePedidoById(req, res) {
        try {
            const { id } = req.params;
            const detallePedido = await DetallePedidoService.getDetallePedidoById(id);
            res.json(detallePedido);
        } catch (error) {
            if (error.message === 'Detalle del pedido no encontrado') {
                res.status(404).json({ error: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }

    async createDetallePedido(req, res) {
        try {
            const detallePedidoData = req.body;
            const newdetallePedido = await DetallePedidoService.createDetallePedido(detallePedidoData);
            res.status(201).json(newdetallePedido);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async updateDetallePedido(req, res) {
        try {
            const { id } = req.params;
            const detallePedidoData = req.body;
            const updatedDetallePedido = await DetallePedidoService.updateDetallePedido(id, detallePedidoData);
            res.json(updatedDetallePedido);
        } catch (error) {
            if (error.message === 'Detalle Pedido no encontrado') {
                res.status(404).json({ error: error.message });
            } else {
                res.status(400).json({ error: error.message });
            }
        }
    }

    async deleteDetallePedido(req, res) {
        try {
            const { id } = req.params;
            await DetallePedidoService.deleteDetallePedido(id);
            res.status(204).send();
        } catch (error) {
            if (error.message === 'Detalle del pedido no encontrado') {
                res.status(404).json({ error: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }
}
export default new DetallePedidoController();