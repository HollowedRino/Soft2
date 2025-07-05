import MedicamentoService from '../../services/MedicamentoService.js';
import MedicamentoRepository from '../../repositories/MedicamentoRepository.js';

jest.mock('../../repositories/MedicamentoRepository.js');

describe('MedicamentoService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('findAll', () => {
        test('debe retornar todos los medicamentos correctamente', async () => {
            const mockMedicamentos = [{ id: 1, nombre: 'Paracetamol' }];
            MedicamentoRepository.findAll.mockResolvedValue(mockMedicamentos);
            const result = await MedicamentoService.findAll();
            expect(result).toEqual(mockMedicamentos);
            expect(MedicamentoRepository.findAll).toHaveBeenCalled();
        });
        test('debe lanzar error si el repositorio falla', async () => {
            MedicamentoRepository.findAll.mockRejectedValue(new Error('Error de BD'));
            await expect(MedicamentoService.findAll()).rejects.toThrow('Error al obtener todos los medicamentos: Error de BD');
        });
    });

    describe('findById', () => {
        test('debe retornar el medicamento por id', async () => {
            const mockMedicamento = { id: 1, nombre: 'Paracetamol' };
            MedicamentoRepository.findById.mockResolvedValue(mockMedicamento);
            const result = await MedicamentoService.findById(1);
            expect(result).toEqual(mockMedicamento);
            expect(MedicamentoRepository.findById).toHaveBeenCalledWith(1);
        });
        test('debe lanzar error si el repositorio falla', async () => {
            MedicamentoRepository.findById.mockRejectedValue(new Error('No encontrado'));
            await expect(MedicamentoService.findById(1)).rejects.toThrow('Error al obtener el medicamento: No encontrado');
        });
    });

    describe('findByIdPlus', () => {
        test('debe retornar detalles del medicamento por id', async () => {
            const mockDetalle = { id: 1, nombre: 'Paracetamol', detalles: 'info' };
            MedicamentoRepository.findByIdPlus.mockResolvedValue(mockDetalle);
            const result = await MedicamentoService.findByIdPlus(1);
            expect(result).toEqual(mockDetalle);
            expect(MedicamentoRepository.findByIdPlus).toHaveBeenCalledWith(1);
        });
        test('debe lanzar error si el repositorio falla', async () => {
            MedicamentoRepository.findByIdPlus.mockRejectedValue(new Error('Error'));
            await expect(MedicamentoService.findByIdPlus(1)).rejects.toThrow('Error al obtener detalles del medicamento: Error');
        });
    });

    describe('findByCategoriaPlus', () => {
        test('debe retornar detalles por categoría', async () => {
            const mockDetalle = [{ id: 1, categoria: 'Analgésico' }];
            MedicamentoRepository.findByCategoriaPlus.mockResolvedValue(mockDetalle);
            const result = await MedicamentoService.findByCategoriaPlus('Analgésico');
            expect(result).toEqual(mockDetalle);
            expect(MedicamentoRepository.findByCategoriaPlus).toHaveBeenCalledWith('Analgésico');
        });
        test('debe lanzar error si el repositorio falla', async () => {
            MedicamentoRepository.findByCategoriaPlus.mockRejectedValue(new Error('Error'));
            await expect(MedicamentoService.findByCategoriaPlus('Analgésico')).rejects.toThrow('Error al obtener detalles del medicamento por categoria: Error');
        });
    });

    describe('findByNombreParcial', () => {
        test('debe retornar medicamentos por nombre parcial', async () => {
            const mockMedicamentos = [{ id: 1, nombre: 'Paracetamol' }];
            MedicamentoRepository.findByNombreParcial.mockResolvedValue(mockMedicamentos);
            const result = await MedicamentoService.findByNombreParcial('Para');
            expect(result).toEqual(mockMedicamentos);
            expect(MedicamentoRepository.findByNombreParcial).toHaveBeenCalledWith('Para');
        });
        test('debe lanzar error si el repositorio falla', async () => {
            MedicamentoRepository.findByNombreParcial.mockRejectedValue(new Error('Error'));
            await expect(MedicamentoService.findByNombreParcial('Para')).rejects.toThrow('Error al obtener medicamentos por nombre parcial: Error');
        });
    });

    describe('findAllWithDetalle', () => {
        test('debe retornar medicamentos con detalles', async () => {
            const mockMedicamentos = [{ id: 1, nombre: 'Paracetamol', detalles: 'info' }];
            MedicamentoRepository.findAllWithDetalle.mockResolvedValue(mockMedicamentos);
            const result = await MedicamentoService.findAllWithDetalle();
            expect(result).toEqual(mockMedicamentos);
            expect(MedicamentoRepository.findAllWithDetalle).toHaveBeenCalled();
        });
        test('debe lanzar error si el repositorio falla', async () => {
            MedicamentoRepository.findAllWithDetalle.mockRejectedValue(new Error('Error'));
            await expect(MedicamentoService.findAllWithDetalle()).rejects.toThrow('Error al obtener medicamentos con detalles: Error');
        });
    });

    describe('findByNombre', () => {
        test('debe retornar medicamento por nombre', async () => {
            const mockMedicamento = { id: 1, nombre: 'Paracetamol' };
            MedicamentoRepository.findByNombre.mockResolvedValue(mockMedicamento);
            const result = await MedicamentoService.findByNombre('Paracetamol');
            expect(result).toEqual(mockMedicamento);
            expect(MedicamentoRepository.findByNombre).toHaveBeenCalledWith('Paracetamol');
        });
        test('debe lanzar error si el repositorio falla', async () => {
            MedicamentoRepository.findByNombre.mockRejectedValue(new Error('Error'));
            await expect(MedicamentoService.findByNombre('Paracetamol')).rejects.toThrow('Error al obtener el medicamento Paracetamol: Error');
        });
    });

    describe('create', () => {
        test('debe crear un medicamento correctamente', async () => {
            const mockMedicamento = { nombre: 'NuevoMed', categoria: 'Analgésico' };
            const mockCreated = { id: 1, ...mockMedicamento };
            MedicamentoRepository.create.mockResolvedValue(mockCreated);
            const result = await MedicamentoService.create(mockMedicamento);
            expect(result).toEqual(mockCreated);
            expect(MedicamentoRepository.create).toHaveBeenCalledWith(mockMedicamento);
        });
        test('debe lanzar error si el repositorio falla', async () => {
            MedicamentoRepository.create.mockRejectedValue(new Error('Error'));
            await expect(MedicamentoService.create({ nombre: 'NuevoMed' })).rejects.toThrow('Error al crear el medicamento: Error');
        });
    });

    describe('update', () => {
        test('debe actualizar un medicamento correctamente', async () => {
            const mockMedicamento = { nombre: 'Editado' };
            const mockUpdated = { id: 1, ...mockMedicamento };
            MedicamentoRepository.update.mockResolvedValue(mockUpdated);
            const result = await MedicamentoService.update(1, mockMedicamento);
            expect(result).toEqual(mockUpdated);
            expect(MedicamentoRepository.update).toHaveBeenCalledWith(1, mockMedicamento);
        });
        test('debe lanzar error si el repositorio falla', async () => {
            MedicamentoRepository.update.mockRejectedValue(new Error('Error'));
            await expect(MedicamentoService.update(1, { nombre: 'Editado' })).rejects.toThrow('Error al actualizar el medicamento: Error');
        });
    });

    describe('delete', () => {
        test('debe eliminar un medicamento correctamente', async () => {
            MedicamentoRepository.delete.mockResolvedValue(true);
            const result = await MedicamentoService.delete(1);
            expect(result).toBe(true);
            expect(MedicamentoRepository.delete).toHaveBeenCalledWith(1);
        });
        test('debe lanzar error si el repositorio falla', async () => {
            MedicamentoRepository.delete.mockRejectedValue(new Error('Error'));
            await expect(MedicamentoService.delete(1)).rejects.toThrow('Error al eliminar el medicamento: Error');
        });
    });
}); 