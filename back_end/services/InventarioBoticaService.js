import InventarioBoticaRepository from '../repositories/InventarioBoticaRepository.js';

class InventarioBoticaService {
    async findAll() {
        try {
            return await InventarioBoticaRepository.findAll();
        } catch (error) {
            throw new Error(`Error al obtener los inventarios de las boticas: ${error.message}`);
        }
    }

    async findById(id) {
        try {
            return await InventarioBoticaRepository.findById(id);
        } catch (error) {
            throw new Error(`Error al obtener el inventario de la botica: ${error.message}`);
        }
    }

    async create(inventarioBoticaData) {
        try {
            // Validaciones
            this.validateInventarioBoticaData(inventarioBoticaData);
            return await InventarioBoticaRepository.create(inventarioBoticaData);
        } catch (error) {
            throw new Error(`Error en el servicio al crear el inventario de la botica: ${error.message}`);
        }
    }

    async update(id, inventarioBoticaData) {
        try {
            // Validaciones 
            this.validateInventarioBoticaData(inventarioBoticaData);
            return await InventarioBoticaRepository.update(id, inventarioBoticaData);
        } catch (error) {
            throw new Error(`Error en el servicio al actualizar el inventario de la botica: ${error.message}`);
        }
    }

    async delete(id) {
        try {
            return await InventarioBoticaRepository.delete(id);
        } catch (error) {
            throw new Error(`Error en el servicio al eliminar el inventario de la botica: ${error.message}`);
        }
    }

    // Método privado para validaciones
    validateInventarioBoticaData(inventarioBoticaData) {
        const requiredFields = ['cantidad_disponible', 'fecha_actualizacion', 'botica_id', 'medicamento_id'];
        
        for (const field of requiredFields) {
            if (!inventarioBoticaData[field]) {
                throw new Error(`El campo ${field} es requerido`);
            }
        }

        // Validar formato de fecha (DD-MM-YYYY)
        const dateRegex = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/;
        if (!dateRegex.test(inventarioBoticaData.fecha_actualizacion)) {
            throw new Error('La fecha debe tener el formato DD-MM-YYYY');
        }
    }



    async findByBoticaId(boticaId) {
    try {
        return await InventarioBoticaRepository.findByBoticaId(boticaId);
    } catch (error) {
        throw new Error(`Error al obtener el inventario de la botica: ${error.message}`);
    }
    }

    

}

export default new InventarioBoticaService(); 