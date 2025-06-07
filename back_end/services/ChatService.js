import ChatRepository from "../repositories/ChatRepository.js";

class ChatService {
    async findAll() {
        try {
            return await ChatRepository.findAll();
        } catch (error) {
            throw new Error(`Error al obtener todos los chats: ${error.message}`);
        }
    }

    async findById(id) {
        try {
            return await ChatRepository.findById(id);
        } catch (error) {
            throw new Error(`Error al obtener el chat: ${error.message}`);
        }
    }

    async findByPedidoId(pedidoId) {
        try {
            return await ChatRepository.findByPedidoId(pedidoId);
        } catch (error) {
            throw new Error(`Error al obtener el chat del pedido: ${error.message}`);
        }
    }
    
    async create(chat) {
        try {
            return await ChatRepository.create(chat);
        } catch (error) {
            throw new Error(`Error al crear el chat: ${error.message}`);
        }
    }

    async update(id, chat) {
        try {
            return await ChatRepository.update(id, chat);
        } catch (error) {
            throw new Error(`Error al actualizar el chat: ${error.message}`);
        }
    }

    async delete(id) {
        try {
            return await ChatRepository.delete(id);
        } catch (error) {
            throw new Error(`Error al eliminar el chat: ${error.message}`);
        }
    }
}

export default new ChatService();
