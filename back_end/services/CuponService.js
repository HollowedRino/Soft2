import CuponRepository from "../repositories/CuponRepository.js";

class CuponService {
    async findAll() {
        try {
            return await CuponRepository.findAll();
        } catch (error) {
            throw new Error(`Error al obtener todos los cupones: ${error.message}`);
        }
    }

    async findById(id) {
        try {
            return await CuponRepository.findById(id);
        } catch (error) {
            throw new Error(`Error al obtener el cupon: ${error.message}`);
        }
    }

    async create(cupon) {
        try {
            return await CuponRepository.create(cupon);
        } catch (error) {
            throw new Error(`Error al crear el cupon: ${error.message}`);
        }
    }

    async update(id, cupon) {
        try {
            return await CuponRepository.update(id, cupon);
        } catch (error) {
            throw new Error(`Error al actualizar el cupon: ${error.message}`);
        }
    }

    async delete(id) {
        try {
            return await CuponRepository.delete(id);
        } catch (error) {
            throw new Error(`Error al eliminar el cupon: ${error.message}`);
        }
    }
}

export default new CuponService();