import Carrito from "../models/Carrito.js";

class CarritoRepository {
    async findAll() {
        try {
            return await Carrito.findAll({
                include: ['Usuario']
            });
        } catch (error) {
            throw new Error(`Error al obtener todos los carritos: ${error.message}`);
        }
    }

    async findById(id) {
        try {
            return await Carrito.findByPk(id, {
                include: ['Usuario']
            });
        } catch (error) {
            throw new Error(`Error al obtener el carrito: ${error.message}`);
        }
    }

    async create(carrito) {
        try {
            return await Carrito.create(carrito);
        } catch (error) {
            throw new Error(`Error al crear el carrito: ${error.message}`);
        }
    }

    async update(id, carrito) {
        try {
            const carrito = await this.findById(id);
            return await carrito.update(carrito);
        } catch (error) {
            throw new Error(`Error al actualizar el carrito: ${error.message}`);
        }
    }

    async delete(id) {
        try {
            const carrito = await this.findById(id);
            await carrito.destroy();
            return true;
        } catch (error) {
            throw new Error(`Error al eliminar el carrito: ${error.message}`);
        }
    }
}

export default new CarritoRepository();