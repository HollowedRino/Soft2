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

    async findByIdPlus(id) {
        try {
            return await MedicamentoRepository.findByIdPlus(id);
        } catch (error) {
            throw new Error(`Error al obtener detalles del medicamento: ${error.message}`);
        }
    }
    async findByCategoriaPlus(categoria) {
        try {
            return await MedicamentoRepository.findByCategoriaPlus(categoria);
        } catch (error) {
            throw new Error(`Error al obtener detalles del medicamento por categoria: ${error.message}`);
        }
    }
    
    async findByNombreParcial(nombre) {
        try {
            return await MedicamentoRepository.findByNombreParcial(nombre);
        } catch (error) {
            throw new Error(`Error al obtener medicamentos por nombre parcial: ${error.message}`);
        }
    }

    async findAllWithDetalle() {
        try {
            return await MedicamentoRepository.findAllWithDetalle();
        } catch (error) {
            throw new Error(`Error al obtener medicamentos con detalles: ${error.message}`);
        }
    }
    
    async findByNombre(nombre) {
        try {
            return await MedicamentoRepository.findByNombre(nombre);
        } catch (error) {
            throw new Error(`Error al obtener el medicamento ${nombre}: ${error.message}`);
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