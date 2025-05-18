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

    async create(carrito) {
        try {
            return await CarritoRepository.create(carrito);
        } catch (error) {
            throw new Error(`Error al crear el carrito: ${error.message}`);
        }
    }

    async update(id, carrito) {
        try {
            return await CarritoRepository.update(id, carrito);
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
}

export default new CarritoService();