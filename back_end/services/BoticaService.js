import BoticaRepository from '../repositories/BoticaRepository.js';

class BoticaService {
    async getAllBoticas() {
        try {
            return await BoticaRepository.findAll();
        } catch (error) {
            throw new Error(`Error en el servicio al obtener boticas: ${error.message}`);
        }
    }

    async getBoticaById(id) {
        try {
            return await BoticaRepository.findById(id);
        } catch (error) {
            throw new Error(`Error en el servicio al obtener botica: ${error.message}`);
        }
    }

    async createBotica(boticaData) {
        try {
            // Validaciones de negocio
            this.validateBoticaData(boticaData);
            return await BoticaRepository.create(boticaData);
        } catch (error) {
            throw new Error(`Error en el servicio al crear botica: ${error.message}`);
        }
    }

    async updateBotica(id, boticaData) {
        try {
            // Validaciones de negocio
            this.validateBoticaData(boticaData);
            return await BoticaRepository.update(id, boticaData);
        } catch (error) {
            throw new Error(`Error en el servicio al actualizar botica: ${error.message}`);
        }
    }

    async deleteBotica(id) {
        try {
            return await BoticaRepository.delete(id);
        } catch (error) {
            throw new Error(`Error en el servicio al eliminar botica: ${error.message}`);
        }
    }

    // Método privado para validaciones
    validateBoticaData(boticaData) {
        const requiredFields = ['nombre', 'direccion', 'telefono_botica', 'horario_apertura', 'horario_cierre', 'distrito_id'];
        
        for (const field of requiredFields) {
            if (!boticaData[field]) {
                throw new Error(`El campo ${field} es requerido`);
            }
        }

        // Validar formato de teléfono
        if (!/^\d{9}$/.test(boticaData.telefono_botica)) {
            throw new Error('El teléfono debe tener 9 dígitos');
        }

        // Validar formato de horarios (HH:MM)
        const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
        if (!timeRegex.test(boticaData.horario_apertura) || !timeRegex.test(boticaData.horario_cierre)) {
            throw new Error('Los horarios deben tener el formato HH:MM');
        }
    }
}

export default new BoticaService(); 