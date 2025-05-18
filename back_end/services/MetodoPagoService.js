import MetodoPagoRepository from "../repositories/MetodoPagoRepository.js";

class MetodoPagoService {
    async findAll() {
        try {
            return await MetodoPagoRepository.findAll();
        } catch (error) {
            throw new Error(`Error al obtener todos los metodos de pago: ${error.message}`);
        }
    }

    async findById(id) {
        try {
            return await MetodoPagoRepository.findById(id);
        } catch (error) {
            throw new Error(`Error al obtener el metodo de pago: ${error.message}`);
        }
    }

    async create(metodoPago) {
        try {
            return await MetodoPagoRepository.create(metodoPago);
        } catch (error) {
            throw new Error(`Error al crear el metodo de pago: ${error.message}`);
        }
    }

    async update(id, metodoPago) {
        try {
            return await MetodoPagoRepository.update(id, metodoPago);
        } catch (error) {
            throw new Error(`Error al actualizar el metodo de pago: ${error.message}`);
        }
    }

    async delete(id) {
        try {
            return await MetodoPagoRepository.delete(id);
        } catch (error) {
            throw new Error(`Error al eliminar el metodo de pago: ${error.message}`);
        }
    }
}

export default new MetodoPagoService();