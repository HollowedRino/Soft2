import PedidoRepository from '../repositories/PedidoRepository.js';

class PedidoService {
    async getAllPedidos() {
        try {
            return await PedidoRepository.findAll();
        } catch (error) {
            throw new Error(`Error en el servicio al obtener pedidos: ${error.message}`);
        }
    }

    async getPedidoById(id) {
        try {
            return await PedidoRepository.findById(id);
        } catch (error) {
            throw new Error(`Error en el servicio al obtener pedido: ${error.message}`);
        }
    }

    async createPedido(pedidoData) {
        try {
            // Validaciones de negocio
            this.validatePedidoData(pedidoData);
            return await PedidoRepository.create(pedidoData);
        } catch (error) {
            throw new Error(`Error en el servicio al crear pedido: ${error.message}`);
        }
    }

    async updatePedido(id, pedidoData) {
        try {
            // Validaciones de negocio
            this.validatePedidoData(pedidoData);
            return await PedidoRepository.update(id, pedidoData);
        } catch (error) {
            throw new Error(`Error en el servicio al actualizar pedido: ${error.message}`);
        }
    }

    async deletePedido(id) {
        try {
            return await PedidoRepository.delete(id);
        } catch (error) {
            throw new Error(`Error en el servicio al eliminar pedido: ${error.message}`);
        }
    }

    // Método privado para validaciones
    validatePedidoData(pedidoData) {
        const requiredFields = ['fecha_pedido', 'estado_pedido', 'usuario_id', 'botica_id', 'metodo_pago_id','repartidor_id'];
        
        for (const field of requiredFields) {
            if (!pedidoData[field]) {
                throw new Error(`El campo ${field} es requerido`);
            }
        }

    }
}

export default new PedidoService(); 