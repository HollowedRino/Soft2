import MetodoPago from '../models/MetodoPago.js';

class MetodoPagoRepository {
    async findAll() {
        try {
            return await MetodoPago.findAll();
        } catch (error) {
            throw new Error(`Error al obtener todos los metodos de pago: ${error.message}`);
        }
    }

    async findById(id) {
        try {
            const metodoPago = await MetodoPago.findByPk(id);
            if (!metodoPago) {
                throw new Error('Metodo de pago no encontrado');
            }
            return metodoPago;
        } catch (error) {
            throw new Error(`Error al obtener el metodo de pago: ${error.message}`);
        }
    }

    async create(metodoPago) {
        try {
            return await MetodoPago.create(metodoPago);
        } catch (error) {
            throw new Error(`Error al crear el metodo de pago: ${error.message}`);
        }
    }

    async update(id, metodoPago) {
        try {
            const metodoPago = await this.findById(id);
            return await MetodoPago.update(metodoPago);
        } catch (error) {
            throw new Error(`Error al actualizar el metodo de pago: ${error.message}`);
        }
    }

    async delete(id) {
        try {
            const metodoPago = await this.findById(id);
            await MetodoPago.destroy();
            return true;
        } catch (error) {
            throw new Error(`Error al eliminar el metodo de pago: ${error.message}`);
        }
    }

}

export default new MetodoPagoRepository();
