import MensajeRepository from "../repositories/MensajeRepository.js";

class MensajeService {
    async findAll() {
        try {
            return await MensajeRepository.findAll();
        } catch (error) {
            throw new Error(`Error al obtener todos los mensajes: ${error.message}`);
        }
    }

    async findById(id) {
        try {
            return await MensajeRepository.findById(id);
        } catch (error) {
            throw new Error(`Error al obtener el mensaje: ${error.message}`);
        }
    }

    async findByChat(chatId) {
        try {
            return await MensajeRepository.findByChat(chatId);
        } catch (error) {
            throw new Error(`Error al obtener los mensajes del chat: ${error.message}`);
        }
    }
    
    async create(mensaje) {
        try {
            return await MensajeRepository.create(mensaje);
        } catch (error) {
            throw new Error(`Error al crear el mensaje: ${error.message}`);
        }
    }

    async update(id, mensaje) {
        try {
            return await MensajeRepository.update(id, mensaje);
        } catch (error) {
            throw new Error(`Error al actualizar el mensaje: ${error.message}`);
        }
    }

    async delete(id) {
        try {
            return await MensajeRepository.delete(id);
        } catch (error) {
            throw new Error(`Error al eliminar el mensaje: ${error.message}`);
        }
    }
}

export default new MensajeService();
