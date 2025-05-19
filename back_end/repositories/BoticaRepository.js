import Botica from '../models/Botica.js';

class BoticaRepository {
    async findAll() {
        try {
            return await Botica.findAll({
                include: ['Distrito']
            });
        } catch (error) {
            throw new Error(`Error al obtener todas las boticas: ${error.message}`);
        }
    }

    async findById(id) {
        try {
            const botica = await Botica.findByPk(id, {
                include: ['Distrito']
            });
            if (!botica) {
                throw new Error('Botica no encontrada');
            }
            return botica;
        } catch (error) {
            throw new Error(`Error al obtener la botica: ${error.message}`);
        }
    }

    async create(boticaData) {
        try {
            return await Botica.create(boticaData);
        } catch (error) {
            throw new Error(`Error al crear la botica: ${error.message}`);
        }
    }

    async update(id, boticaData) {
        try {
            const botica = await this.findById(id);
            return await botica.update(boticaData);
        } catch (error) {
            throw new Error(`Error al actualizar la botica: ${error.message}`);
        }
    }

    async delete(id) {
        try {
            const botica = await this.findById(id);
            await botica.destroy();
            return true;
        } catch (error) {
            throw new Error(`Error al eliminar la botica: ${error.message}`);
        }
    }
}

export default new BoticaRepository();
