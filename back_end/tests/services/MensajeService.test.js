import MensajeService from '../../services/MensajeService.js';
import MensajeRepository from '../../repositories/MensajeRepository.js';

jest.mock('../../repositories/MensajeRepository.js');

describe('MensajeService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('findAll', () => {
        test('debe retornar todos los mensajes correctamente', async () => {
            const mockMensajes = [{ id: 1, chat_id: 1 }];
            MensajeRepository.findAll.mockResolvedValue(mockMensajes);
            const result = await MensajeService.findAll();
            expect(result).toEqual(mockMensajes);
            expect(MensajeRepository.findAll).toHaveBeenCalled();
        });
        test('debe lanzar error si el repositorio falla', async () => {
            MensajeRepository.findAll.mockRejectedValue(new Error('Error de BD'));
            await expect(MensajeService.findAll()).rejects.toThrow('Error al obtener todos los mensajes: Error de BD');
        });
    });

    describe('findById', () => {
        test('debe retornar el mensaje por id', async () => {
            const mockMensaje = { id: 1, chat_id: 1 };
            MensajeRepository.findById.mockResolvedValue(mockMensaje);
            const result = await MensajeService.findById(1);
            expect(result).toEqual(mockMensaje);
            expect(MensajeRepository.findById).toHaveBeenCalledWith(1);
        });
        test('debe lanzar error si el repositorio falla', async () => {
            MensajeRepository.findById.mockRejectedValue(new Error('No encontrado'));
            await expect(MensajeService.findById(1)).rejects.toThrow('Error al obtener el mensaje: No encontrado');
        });
    });

    describe('findByChat', () => {
        test('debe retornar los mensajes por chatId', async () => {
            const mockMensajes = [{ id: 1, chat_id: 1 }];
            MensajeRepository.findByChat.mockResolvedValue(mockMensajes);
            const result = await MensajeService.findByChat(1);
            expect(result).toEqual(mockMensajes);
            expect(MensajeRepository.findByChat).toHaveBeenCalledWith(1);
        });
        test('debe lanzar error si el repositorio falla', async () => {
            MensajeRepository.findByChat.mockRejectedValue(new Error('Error'));
            await expect(MensajeService.findByChat(1)).rejects.toThrow('Error al obtener los mensajes del chat: Error');
        });
    });

    describe('create', () => {
        test('debe crear un mensaje correctamente', async () => {
            const mockMensaje = { chat_id: 1, texto: 'Hola' };
            const mockCreated = { id: 1, ...mockMensaje };
            MensajeRepository.create.mockResolvedValue(mockCreated);
            const result = await MensajeService.create(mockMensaje);
            expect(result).toEqual(mockCreated);
            expect(MensajeRepository.create).toHaveBeenCalledWith(mockMensaje);
        });
        test('debe lanzar error si el repositorio falla', async () => {
            MensajeRepository.create.mockRejectedValue(new Error('Error'));
            await expect(MensajeService.create({ chat_id: 1, texto: 'Hola' })).rejects.toThrow('Error al crear el mensaje: Error');
        });
    });

    describe('update', () => {
        test('debe actualizar un mensaje correctamente', async () => {
            const mockMensaje = { texto: 'Editado' };
            const mockUpdated = { id: 1, ...mockMensaje };
            MensajeRepository.update.mockResolvedValue(mockUpdated);
            const result = await MensajeService.update(1, mockMensaje);
            expect(result).toEqual(mockUpdated);
            expect(MensajeRepository.update).toHaveBeenCalledWith(1, mockMensaje);
        });
        test('debe lanzar error si el repositorio falla', async () => {
            MensajeRepository.update.mockRejectedValue(new Error('Error'));
            await expect(MensajeService.update(1, { texto: 'Editado' })).rejects.toThrow('Error al actualizar el mensaje: Error');
        });
    });

    describe('delete', () => {
        test('debe eliminar un mensaje correctamente', async () => {
            MensajeRepository.delete.mockResolvedValue(true);
            const result = await MensajeService.delete(1);
            expect(result).toBe(true);
            expect(MensajeRepository.delete).toHaveBeenCalledWith(1);
        });
        test('debe lanzar error si el repositorio falla', async () => {
            MensajeRepository.delete.mockRejectedValue(new Error('Error'));
            await expect(MensajeService.delete(1)).rejects.toThrow('Error al eliminar el mensaje: Error');
        });
    });
}); 