import ItemCarrito from "../models/ItemCarrito.js";

class ItemCarritoRepository {
    async findAll() {
        try {
            return await ItemCarrito.findAll();
        } catch (error) {
            throw new Error(`Error al obtener todos los items de los carritos: ${error.message}`);
        }
    }

    async findById(id) {
        try {
        const item = await ItemCarrito.findByPk(id);
        if (!item) {
            throw new Error('Item no encontrado en ItemCarrito');
        }
        return item;
        } catch (error) {
        throw new Error(`Error al obtener el item especifico: ${error.message}`);
        }
    }

    async findItem(carrito_id,medicamento_id) {
        try {
        const item = await ItemCarrito.findOne(
            { where: { carrito_id, medicamento_id }}
        );
        if (!item) {
            throw new Error('Item no encontrado');
        }
        return item;
        } catch (error) {
        throw new Error(`Error al obtener el item especifico: ${error.message}`);
        }
    }

    async createItem(carrito_id,medicamento_id,cantidad) {
        try {
            return await ItemCarrito.create({carrito_id,medicamento_id,cantidad});
        } catch (error) {
            throw new Error(`Error al crear el item del carrito: ${error.message}`);
        }
    }

    async updateItemCantidad(carrito_id,medicamento_id,nuevaCantidad) {
        try {
            const item = await ItemCarrito.findOne(
                { where: {carrito_id,medicamento_id}}
            );
            if (!item) {
                throw new Error('Item no encontrado');
            }
            return await item.update({cantidad: nuevaCantidad});
        } catch (error) {
            throw new Error(`Error al modificar el item del carrito: ${error.message}`)
        }
    }
    
    async deleteItem(id) {
        try {
            const item = await ItemCarrito.findByPk(id);
            if (!item) {
                throw new Error('Item no encontrado');
            }
            return await item.destroy();
        } catch (error) {
            throw new Error(`Error al eliminar el item del carrito: ${error.message}`)
        }
    }
}

export default new ItemCarritoRepository();