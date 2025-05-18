import Medicamento from '../models/Medicamento.js';

class MedicamentoRepository {
    async findAll() {
        try {
            return await Medicamento.findAll();
        } catch (error) {
            throw new Error(`Error al obtener todos los medicamentos: ${error.message}`);
        }
    }

    async findById(id) {
        try {
            return await Medicamento.findByPk(id);
        } catch (error) {
            throw new Error(`Error al obtener el medicamento: ${error.message}`);
        }
    }

    async create(medicamento) {
        try {
            return await Medicamento.create(medicamento);
        } catch (error) {
            throw new Error(`Error al crear el medicamento: ${error.message}`);
        }
    }

    async update(id, medicamento) {
        try {
            const medicamento = await this.findById(id);
            return await medicamento.update(medicamento);
        } catch (error) {
            throw new Error(`Error al actualizar el medicamento: ${error.message}`);
        }
    }

    async delete(id) {
        try {
            const medicamento = await this.findById(id);
            await medicamento.destroy();
            return true;
        } catch (error) {
            throw new Error(`Error al eliminar el medicamento: ${error.message}`);
        }
    }
}

export default new MedicamentoRepository();
