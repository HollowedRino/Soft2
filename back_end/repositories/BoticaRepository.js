import { Op } from 'sequelize';
import Botica from '../models/Botica.js';
import Distrito from '../models/Distrito.js';

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

    // Para el chatbot
    async findByNombre(nombreParcial) {
        try {
            const botica = await Botica.findOne({
            where: {
                nombre: {
                [Op.like]: `%${nombreParcial}%`
                }
            },
            include: ['Distrito']
            });

            return botica ? botica.toJSON() : null; // Devuelve null si no encuentra
        } catch (error) {
            throw new Error(`Error al buscar la botica por nombre: ${error.message}`);
        }
    }

    // Para el chatbot
    async findByDistrito(nombreDistrito) {
        try {
            const boticas = await Botica.findAll({
            include: [
                {
                model: Distrito,
                where: {
                    nombre_distrito: {
                    [Op.like]: `%${nombreDistrito}%`
                    }
                },
                attributes: ['id', 'nombre_distrito']
                }
            ]
            });

            return boticas.map(botica => botica.toJSON());
        } catch (error) {
            throw new Error(`Error al buscar boticas por distrito: ${error.message}`);
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
