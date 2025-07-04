import ItemcarritoService from '../../services/ItemCarritoService.js';
import ItemCarritoRepository from '../../repositories/ItemCarritoRepository.js';

jest.mock('../../repositories/ItemCarritoRepository.js');

describe('ItemcarritoService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('findAll', () => {
        test('debe retornar todos los items correctamente', async () => {
            const mockItems = [{ id: 1, carrito_id: 1 }];
            ItemCarritoRepository.findAll.mockResolvedValue(mockItems);
            const result = await ItemcarritoService.findAll();
            expect(result).toEqual(mockItems);
            expect(ItemCarritoRepository.findAll).toHaveBeenCalled();
        });
        test('debe lanzar error si el repositorio falla', async () => {
            ItemCarritoRepository.findAll.mockRejectedValue(new Error('Error de BD'));
            await expect(ItemcarritoService.findAll()).rejects.toThrow('Error al obtener todos los items de carritos: Error de BD');
        });
    });

    describe('findById', () => {
        test('debe retornar el item por id', async () => {
            const mockItem = { id: 1, carrito_id: 1 };
            ItemCarritoRepository.findById.mockResolvedValue(mockItem);
            const result = await ItemcarritoService.findById(1);
            expect(result).toEqual(mockItem);
            expect(ItemCarritoRepository.findById).toHaveBeenCalledWith(1);
        });
        test('debe lanzar error si el repositorio falla', async () => {
            ItemCarritoRepository.findById.mockRejectedValue(new Error('No encontrado'));
            await expect(ItemcarritoService.findById(1)).rejects.toThrow('Error al obtener el item del carrito: No encontrado');
        });
    });

    describe('findItem', () => {
        test('debe retornar el item por carrito_id y medicamento_id', async () => {
            const mockItem = { id: 1, carrito_id: 1, medicamento_id: 2 };
            ItemCarritoRepository.findItem.mockResolvedValue(mockItem);
            const result = await ItemcarritoService.findItem(1, 2);
            expect(result).toEqual(mockItem);
            expect(ItemCarritoRepository.findItem).toHaveBeenCalledWith(1, 2);
        });
        test('debe lanzar error si el repositorio falla', async () => {
            ItemCarritoRepository.findItem.mockRejectedValue(new Error('Error'));
            await expect(ItemcarritoService.findItem(1, 2)).rejects.toThrow('Error al obtener el item del carro especifico: Error');
        });
    });

    describe('createItem', () => {
        test('debe crear un item correctamente', async () => {
            const mockItem = { carrito_id: 1, medicamento_id: 2, cantidad: 3 };
            const mockCreated = { id: 1, ...mockItem };
            ItemCarritoRepository.createItem.mockResolvedValue(mockCreated);
            const result = await ItemcarritoService.createItem(1, 2, 3);
            expect(result).toEqual(mockCreated);
            expect(ItemCarritoRepository.createItem).toHaveBeenCalledWith(1, 2, 3);
        });
        test('debe lanzar error si el repositorio falla', async () => {
            ItemCarritoRepository.createItem.mockRejectedValue(new Error('Error'));
            await expect(ItemcarritoService.createItem(1, 2, 3)).rejects.toThrow('Error al el item en el carrito: Error');
        });
    });

    describe('updateItemCantidad', () => {
        test('debe actualizar la cantidad de un item correctamente', async () => {
            const mockUpdated = { id: 1, carrito_id: 1, medicamento_id: 2, cantidad: 5 };
            ItemCarritoRepository.updateItemCantidad.mockResolvedValue(mockUpdated);
            const result = await ItemcarritoService.updateItemCantidad(1, 2, 5);
            expect(result).toEqual(mockUpdated);
            expect(ItemCarritoRepository.updateItemCantidad).toHaveBeenCalledWith(1, 2, 5);
        });
        test('debe lanzar error si el repositorio falla', async () => {
            ItemCarritoRepository.updateItemCantidad.mockRejectedValue(new Error('Error'));
            await expect(ItemcarritoService.updateItemCantidad(1, 2, 5)).rejects.toThrow('Error al actualizar la cantidad del item del carrito: Error');
        });
    });

    describe('deleteItem', () => {
        test('debe eliminar un item correctamente', async () => {
            ItemCarritoRepository.deleteItem.mockResolvedValue(true);
            const result = await ItemcarritoService.deleteItem(1);
            expect(result).toBe(true);
            expect(ItemCarritoRepository.deleteItem).toHaveBeenCalledWith(1);
        });
        test('debe lanzar error si el repositorio falla', async () => {
            ItemCarritoRepository.deleteItem.mockRejectedValue(new Error('Error'));
            await expect(ItemcarritoService.deleteItem(1)).rejects.toThrow('Error al eliminar el item del carrito: Error');
        });
    });
}); 