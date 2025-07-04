import InventarioBoticaService from '../../services/InventarioBoticaService.js';
import InventarioBoticaRepository from '../../repositories/InventarioBoticaRepository.js';

jest.mock('../../repositories/InventarioBoticaRepository.js');

describe('InventarioBoticaService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('findAll', () => {
        test('debe retornar todos los inventarios correctamente', async () => {
            const mockInventarios = [{ id: 1, cantidad_disponible: 10 }];
            InventarioBoticaRepository.findAll.mockResolvedValue(mockInventarios);
            const result = await InventarioBoticaService.findAll();
            expect(result).toEqual(mockInventarios);
            expect(InventarioBoticaRepository.findAll).toHaveBeenCalled();
        });
        test('debe lanzar error si el repositorio falla', async () => {
            InventarioBoticaRepository.findAll.mockRejectedValue(new Error('Error de BD'));
            await expect(InventarioBoticaService.findAll()).rejects.toThrow('Error al obtener los inventarios de las boticas: Error de BD');
        });
    });

    describe('findById', () => {
        test('debe retornar el inventario por id', async () => {
            const mockInventario = { id: 1, cantidad_disponible: 10 };
            InventarioBoticaRepository.findById.mockResolvedValue(mockInventario);
            const result = await InventarioBoticaService.findById(1);
            expect(result).toEqual(mockInventario);
            expect(InventarioBoticaRepository.findById).toHaveBeenCalledWith(1);
        });
        test('debe lanzar error si el repositorio falla', async () => {
            InventarioBoticaRepository.findById.mockRejectedValue(new Error('No encontrado'));
            await expect(InventarioBoticaService.findById(1)).rejects.toThrow('Error al obtener el inventario de la botica: No encontrado');
        });
    });

    describe('create', () => {
        test('debe crear un inventario correctamente', async () => {
            const mockInventario = { cantidad_disponible: 10, fecha_actualizacion: new Date(), botica_id: 1, medicamento_id: 1 };
            const mockCreated = { id: 1, ...mockInventario };
            InventarioBoticaRepository.create.mockResolvedValue(mockCreated);
            const result = await InventarioBoticaService.create(mockInventario);
            expect(result).toEqual(mockCreated);
            expect(InventarioBoticaRepository.create).toHaveBeenCalledWith(mockInventario);
        });
        test('debe lanzar error si el repositorio falla', async () => {
            InventarioBoticaRepository.create.mockRejectedValue(new Error('Error'));
            await expect(InventarioBoticaService.create({ cantidad_disponible: 10, fecha_actualizacion: new Date(), botica_id: 1, medicamento_id: 1 })).rejects.toThrow('Error en el servicio al crear el inventario de la botica: Error');
        });
    });

    describe('update', () => {
        test('debe actualizar un inventario correctamente', async () => {
            const mockInventario = {
                cantidad_disponible: 20,
                fecha_actualizacion: new Date(),
                botica_id: 1,
                medicamento_id: 1
            };
            const mockUpdated = { id: 1, ...mockInventario };
            InventarioBoticaRepository.update.mockResolvedValue(mockUpdated);
            const result = await InventarioBoticaService.update(1, mockInventario);
            expect(result).toEqual(mockUpdated);
            expect(InventarioBoticaRepository.update).toHaveBeenCalledWith(1, mockInventario);
        });
        test('debe lanzar error si el repositorio falla', async () => {
            const mockInventario = {
                cantidad_disponible: 20,
                fecha_actualizacion: new Date(),
                botica_id: 1,
                medicamento_id: 1
            };
            InventarioBoticaRepository.update.mockRejectedValue(new Error('Error'));
            await expect(InventarioBoticaService.update(1, mockInventario)).rejects.toThrow('Error en el servicio al actualizar el inventario de la botica: Error');
        });
    });

    describe('delete', () => {
        test('debe eliminar un inventario correctamente', async () => {
            InventarioBoticaRepository.delete.mockResolvedValue(true);
            const result = await InventarioBoticaService.delete(1);
            expect(result).toBe(true);
            expect(InventarioBoticaRepository.delete).toHaveBeenCalledWith(1);
        });
        test('debe lanzar error si el repositorio falla', async () => {
            InventarioBoticaRepository.delete.mockRejectedValue(new Error('Error'));
            await expect(InventarioBoticaService.delete(1)).rejects.toThrow('Error en el servicio al eliminar el inventario de la botica: Error');
        });
    });

    describe('findByBoticaId', () => {
        test('debe retornar inventarios por boticaId', async () => {
            const mockInventarios = [{ id: 1, botica_id: 1 }];
            InventarioBoticaRepository.findByBoticaId.mockResolvedValue(mockInventarios);
            const result = await InventarioBoticaService.findByBoticaId(1);
            expect(result).toEqual(mockInventarios);
            expect(InventarioBoticaRepository.findByBoticaId).toHaveBeenCalledWith(1);
        });
        test('debe lanzar error si el repositorio falla', async () => {
            InventarioBoticaRepository.findByBoticaId.mockRejectedValue(new Error('Error'));
            await expect(InventarioBoticaService.findByBoticaId(1)).rejects.toThrow('Error al obtener el inventario de la botica: Error');
        });
    });
}); 