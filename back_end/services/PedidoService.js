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
            // Validaciones de negocio para actualización
            this.validatePedidoUpdateData(pedidoData);
            
            const result = await PedidoRepository.update(id, pedidoData);
            
            return result;
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

    async getPedidosByUsuario(usuarioId) {
        try {
            if (!usuarioId) {
                throw new Error('El ID del usuario es requerido');
            }
            return await PedidoRepository.findByUsuarioId(usuarioId);
        } catch (error) {
            throw new Error(`Error en el servicio al obtener pedidos del usuario: ${error.message}`);
        }
    }

    async getPedidosByRepartidor(repartidorId) {
        try {
            if (!repartidorId) {
                throw new Error('El ID del repartidor es requerido');
            }
            return await PedidoRepository.findByRepartidorId(repartidorId);
        } catch (error) {
            throw new Error(`Error en el servicio al obtener pedidos del repartidor: ${error.message}`);
        }
    }

    // Método privado para validaciones de creación
    validatePedidoData(pedidoData) {
        const requiredFields = ['fecha_pedido', 'estado_pedido', 'usuario_id', 'botica_id', 'metodo_pago_id','repartidor_id'];
        
        for (const field of requiredFields) {
            if (!pedidoData[field]) {
                throw new Error(`El campo ${field} es requerido`);
            }
        }
    }

    // Método privado para validaciones de actualización
    validatePedidoUpdateData(pedidoData) {
        // Para actualizaciones, validamos que todos los campos requeridos estén presentes
        const requiredFields = ['fecha_pedido', 'estado_pedido', 'usuario_id', 'botica_id', 'metodo_pago_id', 'repartidor_id'];
        
        for (const field of requiredFields) {
            if (!pedidoData[field]) {
                throw new Error(`El campo ${field} es requerido para la actualización`);
            }
        }

        // Validar que el estado_pedido sea válido
        if (!['pendiente', 'completado', 'cancelado'].includes(pedidoData.estado_pedido)) {
            throw new Error('El estado del pedido debe ser: pendiente, completado o cancelado');
        }
    }
}

export default new PedidoService(); 