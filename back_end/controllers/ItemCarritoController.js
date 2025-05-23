import ItemCarritoService from "../services/ItemCarritoService.js";

class ItemCarritoController {
    async findAll(req, res) {
        try {
            const items = await ItemCarritoService.findAll();
            res.status(200).json(items);
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async findById(req, res) {
        try {
            const item = await ItemCarritoService.findById(req.params.id);
            res.status(200).json(item);
        } catch (error) {
            if(error.message === 'Item no encontrado en ItemCarrito') {
                res.status(404).json({error: error.message});
            } else {
                res.status(500).json({error: error.message});
            }
        }
    }

    async findItem(req, res) {
        try {
            const { carrito_id, medicamento_id } = req.params;
            const item = await ItemCarritoService.findItem(carrito_id, medicamento_id);
            res.status(200).json(item);
        } catch (error) {
            if(error.message === 'Item no encontrado') {
                res.status(404).json({error: error.message});
            } else {
                res.status(500).json({error: error.message});
            }
        }
    }

    async createItem(req, res) {
        try {
            const { carrito_id, medicamento_id, cantidad } = req.body;
            const item = await ItemCarritoService.createItem(carrito_id,medicamento_id,cantidad);
            res.status(201).json(item);
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async updateItem(req, res) {
        try {
            const { carrito_id, medicamento_id, nuevaCantidad } = req.body;
            const item = await ItemCarritoService.updateItemCantidad(carrito_id,medicamento_id,nuevaCantidad);
            res.status(200).json(item);
        } catch (error) {
            if (error.message === 'Item no encontrado') {
                res.status(404).json({ error: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }

    async deleteItem(req, res) {
        try {
            await ItemCarritoService.deleteItem(req.params.id);
            res.status(204).send();
        } catch (error) {
            if (error.message === 'Item no encontrado') {
                res.status(404).json({ error: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }
}

export default new ItemCarritoController();