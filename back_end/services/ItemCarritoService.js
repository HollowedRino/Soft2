import ItemCarritoRepository from "../repositories/ItemCarritoRepository.js";

class ItemcarritoService {
    async findAll() {
        try {
            return await ItemCarritoRepository.findAll();
        } catch (error) {
            throw new Error(`Error al obtener todos los items de carritos: ${error.message}`);
        }
    }

    async findById(id) {
        try {
            return await ItemCarritoRepository.findById(id);
        } catch (error) {
            throw new Error(`Error al obtener el item del carrito: ${error.message}`);
        }
    }

    async findItem(carrito_id,medicamento_id) {
        try {
            return await ItemCarritoRepository.findItem(carrito_id,medicamento_id);
        } catch (error) {
            throw new Error(`Error al obtener el item del carro especifico: ${error.message}`);            
        }
    }

    async createItem(carrito_id,medicamento_id,cantidad) {
        try {
            return await ItemCarritoRepository.createItem(carrito_id,medicamento_id,cantidad);
        } catch (error) {
            throw new Error(`Error al el item en el carrito: ${error.message}`);
        }
    }

    async updateItemCantidad(carrito_id,medicamento_id,nuevaCantidad) {
        try {
            return await ItemCarritoRepository.updateItemCantidad(carrito_id,medicamento_id,nuevaCantidad);
        } catch (error) {
            throw new Error(`Error al actualizar la cantidad del item del carrito: ${error.message}`);
        }
    }

    async deleteItem(id) {
        try {
            return await ItemCarritoRepository.deleteItem(id);
        } catch (error) {
            throw new Error(`Error al eliminar el item del carrito: ${error.message}`);
        }
    }
}

export default new ItemcarritoService();