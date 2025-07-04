import ChatService from '../../services/ChatService.js';
import ChatRepository from '../../repositories/ChatRepository.js';

jest.mock('../../repositories/ChatRepository.js');

describe('ChatService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('findAll', () => {
        test('debe retornar todos los chats correctamente', async () => {
            const mockChats = [{ id: 1, pedido_id: 1 }];
            ChatRepository.findAll.mockResolvedValue(mockChats);
            const result = await ChatService.findAll();
            expect(result).toEqual(mockChats);
            expect(ChatRepository.findAll).toHaveBeenCalled();
        });
        test('debe lanzar error si el repositorio falla', async () => {
            ChatRepository.findAll.mockRejectedValue(new Error('Error de BD'));
            await expect(ChatService.findAll()).rejects.toThrow('Error al obtener todos los chats: Error de BD');
        });
    });

    describe('findById', () => {
        test('debe retornar el chat por id', async () => {
            const mockChat = { id: 1, pedido_id: 1 };
            ChatRepository.findById.mockResolvedValue(mockChat);
            const result = await ChatService.findById(1);
            expect(result).toEqual(mockChat);
            expect(ChatRepository.findById).toHaveBeenCalledWith(1);
        });
        test('debe lanzar error si el repositorio falla', async () => {
            ChatRepository.findById.mockRejectedValue(new Error('No encontrado'));
            await expect(ChatService.findById(1)).rejects.toThrow('Error al obtener el chat: No encontrado');
        });
    });

    describe('findByPedidoId', () => {
        test('debe retornar el chat por pedidoId', async () => {
            const mockChat = { id: 1, pedido_id: 1 };
            ChatRepository.findByPedidoId.mockResolvedValue(mockChat);
            const result = await ChatService.findByPedidoId(1);
            expect(result).toEqual(mockChat);
            expect(ChatRepository.findByPedidoId).toHaveBeenCalledWith(1);
        });
        test('debe lanzar error si el repositorio falla', async () => {
            ChatRepository.findByPedidoId.mockRejectedValue(new Error('Error'));
            await expect(ChatService.findByPedidoId(1)).rejects.toThrow('Error al obtener el chat del pedido: Error');
        });
    });

    describe('create', () => {
        test('debe crear un chat correctamente', async () => {
            const mockChat = { pedido_id: 1 };
            const mockCreated = { id: 1, ...mockChat };
            ChatRepository.create.mockResolvedValue(mockCreated);
            const result = await ChatService.create(mockChat);
            expect(result).toEqual(mockCreated);
            expect(ChatRepository.create).toHaveBeenCalledWith(mockChat);
        });
        test('debe lanzar error si el repositorio falla', async () => {
            ChatRepository.create.mockRejectedValue(new Error('Error'));
            await expect(ChatService.create({ pedido_id: 1 })).rejects.toThrow('Error al crear el chat: Error');
        });
    });

    describe('update', () => {
        test('debe actualizar un chat correctamente', async () => {
            const mockChat = { pedido_id: 1 };
            const mockUpdated = { id: 1, ...mockChat };
            ChatRepository.update.mockResolvedValue(mockUpdated);
            const result = await ChatService.update(1, mockChat);
            expect(result).toEqual(mockUpdated);
            expect(ChatRepository.update).toHaveBeenCalledWith(1, mockChat);
        });
        test('debe lanzar error si el repositorio falla', async () => {
            ChatRepository.update.mockRejectedValue(new Error('Error'));
            await expect(ChatService.update(1, { pedido_id: 1 })).rejects.toThrow('Error al actualizar el chat: Error');
        });
    });

    describe('delete', () => {
        test('debe eliminar un chat correctamente', async () => {
            ChatRepository.delete.mockResolvedValue(true);
            const result = await ChatService.delete(1);
            expect(result).toBe(true);
            expect(ChatRepository.delete).toHaveBeenCalledWith(1);
        });
        test('debe lanzar error si el repositorio falla', async () => {
            ChatRepository.delete.mockRejectedValue(new Error('Error'));
            await expect(ChatService.delete(1)).rejects.toThrow('Error al eliminar el chat: Error');
        });
    });
});
