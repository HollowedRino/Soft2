import Carrito from "../models/Carrito.js";
import ItemCarrito from "../models/ItemCarrito.js";
import Medicamento from "../models/Medicamento.js";

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


    async findCarritoCompletoByUsuarioId(usuarioId) {
    try {
        const carrito = await Carrito.findOne({
            where: { usuario_id: usuarioId },
            include: [
                {
                    model: ItemCarrito,
                    attributes: ["id", "cantidad", "medicamento_id"],
                    include: [
                        {
                            model: Medicamento,
                            attributes: [
                                "id",
                                "nombre",
                                "descripcion",
                                "fabricante",
                                "categoria",
                                "precio",
                                "requiere_receta",
                                "estado_medicamento",
                                "imagen_url"
                            ]
                        }
                    ]
                }
            ]
        });

        if (!carrito) {
            throw new Error("Carrito no encontrado para este usuario");
        }

        const { ItemCarritos, ...carritoData } = carrito.toJSON();

        const itemsConMedicamento = ItemCarritos.map(item => {
            const { Medicamento: medicamento, ...itemData } = item;
            return {
                ...itemData,
                medicamento
            };
        });

        return {
            ...carritoData,
            items: itemsConMedicamento
        };

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