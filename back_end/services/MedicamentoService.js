import MedicamentoRepository from "../repositories/MedicamentoRepository.js";

class MedicamentoService {
    async findAll() {
        try {
            return await MedicamentoRepository.findAll();
        } catch (error) {
            throw new Error(`Error al obtener todos los medicamentos: ${error.message}`);
        }
    }

    async findById(id) {
        try {
            return await MedicamentoRepository.findById(id);
        } catch (error) {
            throw new Error(`Error al obtener el medicamento: ${error.message}`);
        }
    }

    async create(medicamento) {
        try {
            return await MedicamentoRepository.create(medicamento);
        } catch (error) {
            throw new Error(`Error al crear el medicamento: ${error.message}`);
        }
    }

    async update(id, medicamento) {
        try {
            return await MedicamentoRepository.update(id, medicamento);
        } catch (error) {
            throw new Error(`Error al actualizar el medicamento: ${error.message}`);
        }
    }

    async delete(id) {
        try {
            return await MedicamentoRepository.delete(id);
        } catch (error) {
            throw new Error(`Error al eliminar el medicamento: ${error.message}`);
        }
    }
}

export default new MedicamentoService();