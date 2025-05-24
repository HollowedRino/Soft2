import DetallePedidoRepository from "../repositories/DetallePedidoRepository.js";

class DetallePedidoService {
    async getAllDetallePedidos() {
        try {
            return await DetallePedidoRepository.findAll();
        } catch (error) {
            throw new Error(`Error en el servicio al obtener el detalle de los pedidos: ${error.message}`);
        }
    }

    async getDetallePedidoById(id) {
        try {
            return await DetallePedidoRepository.findById(id);
        } catch (error) {
            throw new Error(`Error en el servicio al obtener el detalle pedido: ${error.message}`);
        }
    }

    async createDetallePedido(detallePedidoData) {
        try {
            // Validaciones de negocio
            this.validateDetallePedidoData(detallePedidoData);
            return await DetallePedidoRepository.create(detallePedidoData);
        } catch (error) {
            throw new Error(`Error en el servicio al crear el detalle del pedido: ${error.message}`);
        }
    }

    async updateDetallePedido(id, detallePedidoData) {
        try {
            // Validaciones de negocio
            this.validateDetallePedidoData(detallePedidoData);
            return await DetallePedidoRepository.update(id, detallePedidoData);
        } catch (error) {
            throw new Error(`Error en el servicio al actualizar el detalle pedido: ${error.message}`);
        }
    }

    async deleteDetallePedido(id) {
        try {
            return await DetallePedidoRepository.delete(id);
        } catch (error) {
            throw new Error(`Error en el servicio al eliminar el detalle pedido: ${error.message}`);
        }
    }

    // Método privado para validaciones
    validateDetallePedidoData(detallePedidoData) {
        const requiredFields = ['cantidad', 'precio_unitario', 'pedido_id', 'medicamento_id'];
        
        for (const field of requiredFields) {
            if (!detallePedidoData[field]) {
                throw new Error(`El campo ${field} es requerido`);
            }
        }

    }
}

export default new DetallePedidoService();