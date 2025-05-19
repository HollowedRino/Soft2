import CarritoRepository from "../repositories/CarritoRepository.js";

class CarritoService {
    async findAll() {
        try {
            return await CarritoRepository.findAll();
        } catch (error) {
            throw new Error(`Error al obtener todos los carritos: ${error.message}`);
        }
    }

    async findById(id) {
        try {
            return await CarritoRepository.findById(id);
        } catch (error) {
            throw new Error(`Error al obtener el carrito: ${error.message}`);
        }
    }

    async create(carritoData) {
        try {
            // Validaciones
            this.validateCarritoData(carritoData);
            return await CarritoRepository.create(carritoData);
        } catch (error) {
            throw new Error(`Error al crear el carrito: ${error.message}`);
        }
    }

    async update(id, carritoData) {
        try {
            // Validaciones
            this.validateCarritoData(carritoData);
            return await CarritoRepository.update(id, carritoData);
        } catch (error) {
            throw new Error(`Error al actualizar el carrito: ${error.message}`);
        }
    }

    async delete(id) {
        try {
            return await CarritoRepository.delete(id);
        } catch (error) {
            throw new Error(`Error al eliminar el carrito: ${error.message}`);
        }
    }

    // Método privado para validaciones
    validateCarritoData(carritoData) {
        const requiredFields = ['usuario_id', 'fecha_actualizacion'];
        
        for (const field of requiredFields) {
            if (!carritoData[field]) {
                throw new Error(`El campo ${field} es requerido`);
            }
        }

        // Validar formato de fecha (DD-MM-YYYY)
        const dateRegex = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/;
        if (!dateRegex.test(carritoData.fecha_actualizacion)) {
            throw new Error('La fecha debe tener el formato DD-MM-YYYY');
        }
    }

}

export default new CarritoService();