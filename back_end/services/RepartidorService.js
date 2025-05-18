import RepartidorRepository from "../repositories/RepartidorRepository.js";

class RepartidorService {
    async findAll() {
        try {
            return await RepartidorRepository.findAll();
        } catch (error) {
            throw new Error(`Error al obtener a todos los repartidores: ${error.message}`);
        }
    }

    async findById(id) {
        try {
            return await RepartidorRepository.findById(id);
        } catch (error) {
            throw new Error(`Error al obtener al repartidor: ${error.message}`);
        }
    }

    async create(repartidorData) {
        try {
            // Validaciones
            this.validateRepartidorData(repartidorData);
            return await RepartidorRepository.create(repartidorData);
        } catch (error) {
            throw new Error(`Error al crear al repartidor ${error.message}`);
        }
    }

    async update(id, repartidorData) {
        try {
            // Validaciones
            this.validateRepartidorData(repartidorData);
            return await RepartidorRepository.update(id, RepartidorData);
        } catch (error) {
            throw new Error(`Error al actualizar al repartidor: ${error.message}`);
        }
    }

    async delete(id) {
        try {
            return await RepartidorRepository.delete(id);
        } catch (error) {
            throw new Error(`Error al eliminar al repartidor: ${error.message}`);
        }
    }

    // Método privado para validaciones
    validateRepartidorData(repartidorData) {
        const requiredFields = ['nombre', 'numero'];
        
        for (const field of requiredFields) {
            if (!repartidorData[field]) {
                throw new Error(`El campo ${field} es requerido`);
            }
        }

        // Validar formato de teléfono
        if (!/^\d{9}$/.test(repartidorData.numero)) {
            throw new Error('El teléfono debe tener 9 dígitos');
        }
    }
}

export default new RepartidorService();