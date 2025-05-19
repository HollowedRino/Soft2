import Cupon from '../models/Cupon.js';

class CuponRepository {
    async findAll() {
        try {
            return await Cupon.findAll();
        } catch (error) {
            throw new Error(`Error al obtener todos los cupones: ${error.message}`);
        }
    }

    async findById(id) {
        try {
            const cupon = await Cupon.findByPk(id);
            if (!cupon) {
                throw new Error('Cupon no encontrado');
            }
            return cupon;
        } catch (error) {
            throw new Error(`Error al obtener el cupon: ${error.message}`);
        }
    }

    async create(cupon) {
        try {
            return await Cupon.create(cupon);
        } catch (error) {
            throw new Error(`Error al crear el cupon: ${error.message}`);
        }
    }

    async update(id, cupon) {
        try {
            const cupon = await this.findById(id);
            return await Cupon.update(cupon);
        } catch (error) {
            throw new Error(`Error al actualizar el cupon: ${error.message}`);
        }
    }

    async delete(id) {
        try {
            const cupon = await this.findById(id);
            await Cupon.destroy();
            return true;
        } catch (error) {
            throw new Error(`Error al eliminar el cupon: ${error.message}`);
        }
    }

}

export default new CuponRepository();