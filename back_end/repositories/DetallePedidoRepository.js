import DetallePedido from "../models/DetallePedido.js";

class DetallePedidoRepository {
    async findAll() {
        try {
            return await DetallePedido.findAll({
                include: ['Pedido', 'Medicamento']
            });
        } catch (error) {
            throw new Error(`Error al obtener todos los detalles de pedidos: ${error.message}`);
        }
    }

    async findById(id) {
        try {
            const detallePedido = await DetallePedido.findByPk(id, {
                include: ['Pedido', 'Medicamento']
            });
            if (!detallePedido) {
                throw new Error('Detalle Pedido no encontrada');
            }
            return detallePedido;
        } catch (error) {
            throw new Error(`Error al obtener el detalle del pedido: ${error.message}`);
        }
    }

    async create(detallePedidoData) {
        try {
            return await DetallePedido.create(detallePedidoData);
        } catch (error) {
            throw new Error(`Error al crear el detalle pedido: ${error.message}`);
        }
    }

    async update(id, detallePedidoData) {
        try {
            const detallePedido = await this.findById(id);
            return await detallePedido.update(detallePedidoData);
        } catch (error) {
            throw new Error(`Error al actualizar el detalle del pedido: ${error.message}`);
        }
    }

    async delete(id) {
        try {
            const detallePedido = await this.findById(id);
            await detallePedido.destroy();
            return true;
        } catch (error) {
            throw new Error(`Error al eliminar el detalle del pedido: ${error.message}`);
        }
    }
}

export default new DetallePedidoRepository();
