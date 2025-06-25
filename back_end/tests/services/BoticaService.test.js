import BoticaService from '../../services/BoticaService.js';
import BoticaRepository from '../../repositories/BoticaRepository.js';

// Mock del repositorio
jest.mock('../../repositories/BoticaRepository.js');

describe('BoticaService', () => {
    beforeEach(() => {
        // Limpiar todos los mocks antes de cada test
        jest.clearAllMocks();
    });

    describe('Get Botica by Location', () => {
        test('should get botica by valid ID successfully', async () => {
            // PREPARAR
            const mockBotica = {
                id: 1,
                nombre: 'Botica Central',
                direccion: 'Av. Principal 123, Lima',
                telefono_botica: '987654321',
                horario_apertura: '08:00',
                horario_cierre: '20:00',
                distrito_id: 1
            };
            BoticaRepository.findById.mockResolvedValue(mockBotica);

            // EJECUTAR
            const result = await BoticaService.getBoticaById(mockBotica.id);

            // VALIDAR
            expect(result).toEqual(mockBotica);
            expect(result.direccion).toBeDefined();
            expect(BoticaRepository.findById).toHaveBeenCalledWith(mockBotica.id);
        });

        test('should throw error when botica is not found', async () => {
            // PREPARAR
            BoticaRepository.findById.mockRejectedValue(new Error('Botica no encontrada'));

            // EJECUTAR y VALIDAR
            await expect(BoticaService.getBoticaById(999))
                .rejects
                .toThrow('Error en el servicio al obtener botica: Botica no encontrada');
        });
    });

    describe('Validate Address Format', () => {
        test('should validate correct address format', async () => {
            // PREPARAR
            const validBotica = {
                nombre: 'Botica Test',
                direccion: 'Av. Principal 123',
                telefono_botica: '987654321',
                horario_apertura: '08:00',
                horario_cierre: '20:00',
                distrito_id: 1
            };

            // EJECUTAR
            const result = await BoticaService.createBotica(validBotica);

            // VALIDAR
            expect(result).toBeDefined();
            expect(result.direccion).toBe('Av. Principal 123');
        });

        test('should throw error when address is incomplete', async () => {
            // PREPARAR
            const invalidBotica = {
                nombre: 'Botica Test',
                direccion: 'Av.', // Dirección incompleta
                telefono_botica: '987654321',
                horario_apertura: '08:00',
                horario_cierre: '20:00',
                distrito_id: 1
            };

            // EJECUTAR y VALIDAR
            await expect(BoticaService.createBotica(invalidBotica))
                .rejects
                .toThrow('La dirección debe incluir calle y número');
        });

        test('should throw error when address is too short', async () => {
            // PREPARAR
            const shortAddressBotica = {
                nombre: 'Botica Test',
                direccion: 'Av', // Dirección muy corta
                telefono_botica: '987654321',
                horario_apertura: '08:00',
                horario_cierre: '20:00',
                distrito_id: 1
            };

            // EJECUTAR y VALIDAR
            await expect(BoticaService.createBotica(shortAddressBotica))
                .rejects
                .toThrow('La dirección debe tener al menos 5 caracteres');
        });
    });
}); 