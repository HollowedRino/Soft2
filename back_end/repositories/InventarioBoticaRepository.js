import InventarioBotica from '../models/InventarioBotica.js';

class InventarioBoticaRepository {
    async findAll() {
        try {
            return await InventarioBotica.findAll({
                include: ['Botica','Medicamento']
            });
        } catch (error) {
            throw new Error(`Error al obtener todos los inventarios de medicamentos: ${error.message}`);
        }
    }

    async findById(id) {
        try {
            const inventarioBotica = await InventarioBotica.findByPk(id, {
                include: ['Botica','Medicamento']
            });
            if (!inventarioBotica) {
                throw new Error('Inventario de botica no encontrado');
            }
            return inventarioBotica;
        } catch (error) {
            throw new Error(`Error al obtener el inventario de botica: ${error.message}`);
        }
    }

    async create(inventarioBotica) {
        try {
            return await InventarioBotica.create(inventarioBotica);
        } catch (error) {
            throw new Error(`Error al crear el inventario de la botica: ${error.message}`);
        }
    }

    async update(id, inventarioBoticaData) {
        try {
            const inventarioBotica = await this.findById(id);
            return await inventarioBotica.update(inventarioBoticaData);
        } catch (error) {
            throw new Error(`Error al actualizar el inventario de la botica: ${error.message}`);
        }
    }

    async delete(id) {
        try {
            const inventarioBotica = await this.findById(id);
            await inventarioBotica.destroy();
            return true;
        } catch (error) {
            throw new Error(`Error al eliminar el inventario de la botica: ${error.message}`);
        }
    }



    async findByBoticaId(boticaId) {
    try {
        return await InventarioBotica.findAll({
            where: { botica_id: boticaId },
            include: ['Botica', 'Medicamento']
        });
    } catch (error) {
        throw new Error(`Error al obtener el inventario de la botica: ${error.message}`);
    }
    }


    
}

export default new InventarioBoticaRepository();
