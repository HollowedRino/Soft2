import Chat from '../models/Chat.js';
import Pedido from "../models/Pedido.js";
import Usuario from "../models/Usuario.js";

class ChatRepository {
  async findAll() {
        try {
            return await Chat.findAll();
        } catch (error) {
            throw new Error(`Error al obtener todos los chats: ${error.message}`);
        }
    }

    async findById(id) {
        try {
            const chat = await Chat.findByPk(id, {
                include: {
                    model: Pedido,
                    as: "pedido",
                    include: [
                        {
                            model: Usuario,
                            as: "cliente",
                            attributes: ["id", "nombre", "estado"]
                        },
                        {
                            model: Usuario,
                            as: "repartidor",
                            attributes: ["id", "nombre", "estado"]
                        }
                    ]
                }
            });
            if (!chat) {
                throw new Error('Chat no encontrado');
            }
            return chat;
        } catch (error) {
            throw new Error(`Error al obtener el chat: ${error.message}`);
        }
    }

    async findByPedidoId(pedidoId) {
        try {
            const chat = await chat.findAll({
                where: { pedido_id: pedidoId },
                include: {
                    model: Pedido,
                    as: "pedido",
                    include: [
                        {
                            model: Usuario,
                            as: "cliente",
                            attributes: ["id", "nombre", "estado"]
                        },
                        {
                            model: Usuario,
                            as: "repartidor",
                            attributes: ["id", "nombre", "estado"]
                        }
                    ]
                }
            });
            if (!chat) {
                throw new Error('Chat asignado al pedido no encontrado');
            }
            return chat;
        } catch (error) {
            throw new Error(`Error al obtener los chats del pedido solicitado: ${error.message}`);
        }
    }
  
    async create(chatData) {
        try {
            return await Chat.create(chatData);
        } catch (error) {
            throw new Error(`Error al crear el chat: ${error.message}`);
        }
    }

    async update(id, chatData) {
        try {
            const chat = await this.findById(id);
            return await chat.update(chatData);
        } catch (error) {
            throw new Error(`Error al actualizar el chat: ${error.message}`);
        }
    }

    async delete(id) {
        try {
            const chat = await this.findById(id);
            await chat.destroy();
            return true;
        } catch (error) {
            throw new Error(`Error al eliminar el chat: ${error.message}`);
        }
    }
}

export default new ChatRepository();
