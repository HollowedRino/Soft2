import Repartidor from '../models/Repartidor.js';

class RepartidorRepository {
    async findAll() {
        try {
            return await Repartidor.findAll();
        } catch (error) {
            throw new Error(`Error al obtener todos los repartidores: ${error.message}`);
        }
    }

    async findById(id) {
        try {
            const repartidor = await Repartidor.findByPk(id);
            if (!repartidor) {
                throw new Error('Repartidor no encontrado');
            }
            return repartidor;
        } catch (error) {
            throw new Error(`Error al obtener el repartidor: ${error.message}`);
        }
    }

    async create(repartidor) {
        try {
            return await Repartidor.create(repartidor);
        } catch (error) {
            throw new Error(`Error al crear el repartidor: ${error.message}`);
        }
    }

    async update(id, repartidor) {
        try {
            const repartidor = await this.findById(id);
            return await Repartidor.update(repartidor);
        } catch (error) {
            throw new Error(`Error al actualizar el repartidor: ${error.message}`);
        }
    }

    async delete(id) {
        try {
            const repartidor = await this.findById(id);
            await Repartidor.destroy();
            return true;
        } catch (error) {
            throw new Error(`Error al eliminar el repartidor: ${error.message}`);
        }
    }

}

export default new RepartidorRepository();