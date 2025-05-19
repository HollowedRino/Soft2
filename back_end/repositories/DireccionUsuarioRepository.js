import DireccionUsuario from '../models/DireccionUsuario.js';

class DireccionUsuarioRepository {
    async findAll() {
        try {
            return await DireccionUsuario.findAll({
                include: ['Usuario','Distrito']
            });
        } catch (error) {
            throw new Error(`Error al obtener todas las direcciones de usuario: ${error.message}`);
        }
    }

    async findById(id) {
        try {
            const direccionUsuario = await DireccionUsuario.findByPk(id, {
                include: ['Usuario','Distrito']
            });
            if (!direccionUsuario) {
                throw new Error('Direccion usuario no encontrada');
            }
            return direccionUsuario;
        } catch (error) {
            throw new Error(`Error al obtener la direccion de usuario: ${error.message}`);
        }
    }

    async create(direccionUsuarioData) {
        try {
            return await DireccionUsuario.create(direccionUsuarioData);
        } catch (error) {
            throw new Error(`Error al crear la direccion de usuario: ${error.message}`);
        }
    }

    async update(id, direccionUsuarioData) {
        try {
            const direccionUsuario = await this.findById(id);
            return await direccionUsuario.update(direccionUsuario);
        } catch (error) {
            throw new Error(`Error al actualizar la direccion de usuario: ${error.message}`);
        }
    }

    async delete(id) {
        try {
            const direccionUsuario = await this.findById(id);
            await direccionUsuario.destroy();
            return true;
        } catch (error) {
            throw new Error(`Error al eliminar la direccion de usuario: ${error.message}`);
        }
    }
}

export default new DireccionUsuarioRepository();
