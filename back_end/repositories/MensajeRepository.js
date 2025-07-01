import Mensaje from '../models/Mensaje.js';

class MensajeRepository {
    async findAll() {
        try {
            return await Mensaje.findAll();
        } catch (error) {
            throw new Error(`Error al obtener todos los mensajes: ${error.message}`);
        }
    }

    async findById(id) {
        try {
            return await Mensaje.findByPk(id);
        } catch (error) {
            throw new Error(`Error al obtener el mensaje: ${error.message}`);
        }
    }

    async findByChat(chatId) {
        try {
            
            const mensajes = await Mensaje.findAll({
                where: { chat_id: chatId }
            });
        } catch (error) {
            throw new Error(`Error al obtener mensajes por chat: ${error.message}`);
        }
    }

    async create(mensajeData) {
        try {
            return await Mensaje.create(mensajeData);
        } catch (error) {
            throw new Error(`Error al crear el mensaje: ${error.message}`);
        }
    }

    async update(id, mensajeData) {
        try {
            const mensaje = await this.findById(id);
            return await mensaje.update(mensajeData);
        } catch (error) {
            throw new Error(`Error al actualizar el mensaje: ${error.message}`);
        }
    }

    async delete(id) {
        try {
            const mensaje = await this.findById(id);
            await mensaje.destroy();
            return true;
        } catch (error) {
            throw new Error(`Error al eliminar el mensaje: ${error.message}`);
        }
    }
}

export default new MensajeRepository();
