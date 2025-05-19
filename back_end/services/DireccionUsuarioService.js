import DireccionUsuarioRepository from '../repositories/DireccionUsuarioRepository.js';

class DireccionUsuarioService {
    async getAllDirecciones() {
        try {
            return await DireccionUsuarioRepository.findAll();
        } catch (error) {
            throw new Error(`Error en el servicio al obtener direcciones de usuario: ${error.message}`);
        }
    }

    async getDireccionById(id) {
        try {
            return await DireccionUsuarioRepository.findById(id);
        } catch (error) {
            throw new Error(`Error en el servicio al obtener direccion de usuario: ${error.message}`);
        }
    }

    async createDireccion(direccionUsuarioData) {
        try {
            // Validaciones de negocio
            this.validatedireccionUsuarioData(direccionUsuarioData);
            return await DireccionUsuarioRepository.create(direccionUsuarioData);
        } catch (error) {
            throw new Error(`Error en el servicio al crear direccion de usuario: ${error.message}`);
        }
    }

    async updateDireccion(id, direccionUsuarioData) {
        try {
            // Validaciones de negocio
            this.validatedireccionUsuarioData(direccionUsuarioData);
            return await DireccionUsuarioRepository.update(id, direccionUsuarioData);
        } catch (error) {
            throw new Error(`Error en el servicio al actualizar direccion usuario: ${error.message}`);
        }
    }

    async deleteDireccion(id) {
        try {
            return await DireccionUsuarioRepository.delete(id);
        } catch (error) {
            throw new Error(`Error en el servicio al eliminar direccion de usuario: ${error.message}`);
        }
    }

    // Método privado para validaciones
    validatedireccionUsuarioData(direccionUsuarioData) {
        const requiredFields = ['direccion', 'alias', 'usuario_id', 'distrito_id'];
        
        for (const field of requiredFields) {
            if (!direccionUsuarioData[field]) {
                throw new Error(`El campo ${field} es requerido`);
            }
        }

    }
}

export default new DireccionUsuarioService(); 