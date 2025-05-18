import DistritoRepository from "../repositories/DistritoRepository.js";

class DistritoService {
    async findAll() {
        try {
            return await DistritoRepository.findAll();
        } catch (error) {
            throw new Error(`Error al obtener todos los distritos: ${error.message}`);
        }
    }

    async findById(id) {
        try {
            return await DistritoRepository.findById(id);
        } catch (error) {
            throw new Error(`Error al obtener el distrito: ${error.message}`);
        }
    }

    async create(distrito) {
        try {
            return await DistritoRepository.create(carrito);
        } catch (error) {
            throw new Error(`Error al crear el distrito: ${error.message}`);
        }
    }

    async update(id, distrito) {
        try {
            return await DistritoRepository.update(id, carrito);
        } catch (error) {
            throw new Error(`Error al actualizar el distrito: ${error.message}`);
        }
    }

    async delete(id) {
        try {
            return await DistritoRepository.delete(id);
        } catch (error) {
            throw new Error(`Error al eliminar el distrito: ${error.message}`);
        }
    }
}

export default new DistritoService();