import Distrito from '../models/Distrito.js';

class DistritoRepository {
    async findAll() {
        try {
            return await Distrito.findAll();
        } catch (error) {
            throw new Error(`Error al obtener todos los distritos: ${error.message}`);
        }
    }

    async findById(id) {
        try {
            const distrito = await Distrito.findByPk(id);
            if (!distrito) {
                throw new Error('Distrito no encontrado');
            }
            return distrito;
        } catch (error) {
            throw new Error(`Error al obtener el distrito: ${error.message}`);
        }
    }

    async create(distrito) {
        try {
            return await Distrito.create(distrito);
        } catch (error) {
            throw new Error(`Error al crear el distrito: ${error.message}`);
        }
    }

    async update(id, distrito) {
        try {
            const distrito = await this.findById(id);
            return await distrito.update(distrito);
        } catch (error) {
            throw new Error(`Error al actualizar el distrito: ${error.message}`);
        }
    }

    async delete(id) {
        try {
            const distrito = await this.findById(id);
            await distrito.destroy();
            return true;
        } catch (error) {
            throw new Error(`Error al eliminar el distrito: ${error.message}`);
        }
    }

}

export default new DistritoRepository();
