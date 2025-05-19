import Pedido from '../models/Pedido.js';

class PedidoRepository {
    async findAll() {
        try {
            return await Pedido.findAll({
                include: ['Usuario','Botica','MetodoPago','DireccionUsuario','Repartidor']
            });
        } catch (error) {
            throw new Error(`Error al obtener todas los pedidos: ${error.message}`);
        }
    }

    async findById(id) {
        try {
            const pedido = await Pedido.findByPk(id, {
                include: ['Usuario','Botica','MetodoPago','DireccionUsuario','Repartidor']
            });
            if (!pedido) {
                throw new Error('Pedido no encontrada');
            }
            return pedido;
        } catch (error) {
            throw new Error(`Error al obtener el pedido: ${error.message}`);
        }
    }

    async create(pedidoData) {
        try {
            return await Pedido.create(pedidoData);
        } catch (error) {
            throw new Error(`Error al crear el pedido: ${error.message}`);
        }
    }

    async update(id, pedidoData) {
        try {
            const pedido = await this.findById(id);
            return await pedido.update(pedidoData);
        } catch (error) {
            throw new Error(`Error al actualizar el pedido: ${error.message}`);
        }
    }

    async delete(id) {
        try {
            const pedido = await this.findById(id);
            await pedido.destroy();
            return true;
        } catch (error) {
            throw new Error(`Error al eliminar el pedido: ${error.message}`);
        }
    }
}

export default new PedidoRepository();
