import BoticaService from '../../services/BoticaService.js';
import BoticaRepository from '../../repositories/BoticaRepository.js';

// Mock del repositorio
jest.mock('../../repositories/BoticaRepository.js');

describe('BoticaService', () => {
    beforeEach(() => {
        // Limpiar todos los mocks antes de cada test
        jest.clearAllMocks();
    });

    describe('Get Botica by ID', () => {
        test('should get botica by valid ID successfully', async () => {
            // PREPARAR
            const mockBotica = {
                id: 1,
                nombre: 'Botica Central',
                direccion: 'Av. Principal 123',
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

    describe('Get Botica by Name', () => {
        test('should get botica by valid name successfully', async () => {
            // PREPARAR
            const mockBoticas = [
                {
                    id: 1,
                    nombre: 'Inkafarma',
                    direccion: 'Av. Principal 123',
                    telefono_botica: '987654321',
                    horario_apertura: '08:00',
                    horario_cierre: '20:00',
                    distrito_id: 1
                }
            ];
            BoticaRepository.findByNombre.mockResolvedValue(mockBoticas);

            // EJECUTAR
            const result = await BoticaService.getBoticaByNombre('Inkafarma');

            // VALIDAR
            expect(result).toEqual(mockBoticas);
            expect(result).toHaveLength(1);
            expect(result[0].nombre).toBe('Inkafarma');
            expect(BoticaRepository.findByNombre).toHaveBeenCalledWith('Inkafarma');
        });

        test('should throw error when repository fails', async () => {
            // PREPARAR
            BoticaRepository.findByNombre.mockRejectedValue(new Error('Error de conexión'));

            // EJECUTAR y VALIDAR
            await expect(BoticaService.getBoticaByNombre('Inkafarma'))
                .rejects
                .toThrow('Error en el servicio al obtener botica llamada Inkafarma: Error de conexión');
        });
    });

    describe('Get Botica by District', () => {
        test('should get boticas by valid district successfully', async () => {
            // PREPARAR
            const mockBoticas = [
                {
                    id: 1,
                    nombre: 'Botica Miraflores',
                    direccion: 'Av. Larco 456',
                    telefono_botica: '987654321',
                    distrito_id: 5
                },
                {
                    id: 2,
                    nombre: 'Farmacia Central',
                    direccion: 'Av. Pardo 789',
                    telefono_botica: '987654322',
                    distrito_id: 5
                }
            ];
            BoticaRepository.findByDistrito.mockResolvedValue(mockBoticas);

            // EJECUTAR
            const result = await BoticaService.getBoticaByDistrito('Miraflores');

            // VALIDAR
            expect(result).toEqual(mockBoticas);
            expect(result).toHaveLength(2);
            expect(BoticaRepository.findByDistrito).toHaveBeenCalledWith('Miraflores');
        });

        test('should throw error when repository fails', async () => {
            // PREPARAR
            BoticaRepository.findByDistrito.mockRejectedValue(new Error('Distrito no válido'));

            // EJECUTAR y VALIDAR
            await expect(BoticaService.getBoticaByDistrito('DistritoInvalido'))
                .rejects
                .toThrow('Error en el servicio al obtener boticas por distrito DistritoInvalido: Distrito no válido');
        });
    });

    describe('Create Botica', () => {
        test('should create botica with valid data successfully', async () => {
            // PREPARAR
            const validBoticaData = {
                nombre: 'Botica Test',
                direccion: 'Av. Principal 123',
                telefono_botica: '987654321',
                horario_apertura: '08:00',
                horario_cierre: '20:00',
                distrito_id: 1
            };
            const mockCreatedBotica = { id: 1, ...validBoticaData };
            BoticaRepository.create.mockResolvedValue(mockCreatedBotica);

            // EJECUTAR
            const result = await BoticaService.createBotica(validBoticaData);

            // VALIDAR
            expect(result).toEqual(mockCreatedBotica);
            expect(result.id).toBeDefined();
            expect(BoticaRepository.create).toHaveBeenCalledWith(validBoticaData);
        });

        test('should throw error when required fields are missing', async () => {
            // PREPARAR datos inválidos (faltan campos requeridos)
            const invalidBoticaData = {
                nombre: 'Botica Test',
                direccion: 'Av. Principal 123'
                // Faltan: telefono_botica, horario_apertura, horario_cierre, distrito_id
            };

            // EJECUTAR y VALIDAR
            await expect(BoticaService.createBotica(invalidBoticaData))
                .rejects
                .toThrow('Error en el servicio al crear botica: El campo telefono_botica es requerido');
        });

        test('should validate all required fields', async () => {
            // PREPARAR casos de prueba para cada campo requerido
            const requiredFields = ['nombre', 'direccion', 'telefono_botica', 'horario_apertura', 'horario_cierre', 'distrito_id'];
            
            for (const field of requiredFields) {
                const incompleteData = {
                    nombre: 'Botica Test',
                    direccion: 'Av. Principal 123',
                    telefono_botica: '987654321',
                    horario_apertura: '08:00',
                    horario_cierre: '20:00',
                    distrito_id: 1
                };
                delete incompleteData[field];

                // EJECUTAR y VALIDAR
                await expect(BoticaService.createBotica(incompleteData))
                    .rejects
                    .toThrow(`Error en el servicio al crear botica: El campo ${field} es requerido`);
            }
        });

        test('should throw error when phone format is invalid', async () => {
            // PREPARAR
            const invalidPhoneBotica = {
                nombre: 'Botica Test',
                direccion: 'Av. Principal 123',
                telefono_botica: '12345', // Teléfono inválido
                horario_apertura: '08:00',
                horario_cierre: '20:00',
                distrito_id: 1
            };

            // EJECUTAR y VALIDAR
            await expect(BoticaService.createBotica(invalidPhoneBotica))
                .rejects
                .toThrow('Error en el servicio al crear botica: El teléfono debe tener 9 dígitos');
        });

        test('should throw error when time format is invalid', async () => {
            // PREPARAR
            const invalidTimeBotica = {
                nombre: 'Botica Test',
                direccion: 'Av. Principal 123',
                telefono_botica: '987654321',
                horario_apertura: '25:00', // Hora inválida
                horario_cierre: '20:00',
                distrito_id: 1
            };

            // EJECUTAR y VALIDAR
            await expect(BoticaService.createBotica(invalidTimeBotica))
                .rejects
                .toThrow('Error en el servicio al crear botica: Los horarios deben tener el formato HH:MM');
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
                .toThrow('Error en el servicio al crear botica: La dirección debe tener al menos 5 caracteres');
        });

        test('should throw error when address format is incomplete', async () => {
            // PREPARAR
            const incompleteAddressBotica = {
                nombre: 'Botica Test',
                direccion: 'Avenida Principal', // Sin número
                telefono_botica: '987654321',
                horario_apertura: '08:00',
                horario_cierre: '20:00',
                distrito_id: 1
            };

            // EJECUTAR y VALIDAR
            await expect(BoticaService.createBotica(incompleteAddressBotica))
                .rejects
                .toThrow('Error en el servicio al crear botica: La dirección debe incluir calle y número');
        });
    });

    describe('Update Botica', () => {
        test('should update botica with valid data successfully', async () => {
            // PREPARAR
            const boticaId = 1;
            const updateData = {
                nombre: 'Botica Actualizada',
                direccion: 'Av. Nueva 456',
                telefono_botica: '987654321',
                horario_apertura: '09:00',
                horario_cierre: '21:00',
                distrito_id: 2
            };
            const mockUpdatedBotica = { id: boticaId, ...updateData };
            BoticaRepository.update.mockResolvedValue(mockUpdatedBotica);

            // EJECUTAR
            const result = await BoticaService.updateBotica(boticaId, updateData);

            // VALIDAR
            expect(result).toEqual(mockUpdatedBotica);
            expect(result.nombre).toBe('Botica Actualizada');
            expect(BoticaRepository.update).toHaveBeenCalledWith(boticaId, updateData);
        });

        test('should throw error when update data is invalid', async () => {
            // PREPARAR
            const invalidUpdateData = {
                nombre: 'Botica Test'
                // Faltan campos requeridos
            };

            // EJECUTAR y VALIDAR
            await expect(BoticaService.updateBotica(1, invalidUpdateData))
                .rejects
                .toThrow('Error en el servicio al actualizar botica: El campo direccion es requerido');
        });
    });

    describe('Delete Botica', () => {
        test('should delete botica successfully', async () => {
            // PREPARAR
            const boticaId = 1;
            BoticaRepository.delete.mockResolvedValue(true);

            // EJECUTAR
            const result = await BoticaService.deleteBotica(boticaId);

            // VALIDAR
            expect(result).toBe(true);
            expect(BoticaRepository.delete).toHaveBeenCalledWith(boticaId);
        });

        test('should throw error when delete fails', async () => {
            // PREPARAR
            BoticaRepository.delete.mockRejectedValue(new Error('Botica no encontrada'));

            // EJECUTAR y VALIDAR
            await expect(BoticaService.deleteBotica(999))
                .rejects
                .toThrow('Error en el servicio al eliminar botica: Botica no encontrada');
        });
    });

    describe('Get All Boticas', () => {
        test('should get all boticas successfully', async () => {
            // PREPARAR
            const mockBoticas = [
                {
                    id: 1,
                    nombre: 'Botica Central',
                    direccion: 'Av. Principal 123',
                    distrito_id: 1
                },
                {
                    id: 2,
                    nombre: 'Farmacia Norte',
                    direccion: 'Av. Norte 456',
                    distrito_id: 2
                }
            ];
            BoticaRepository.findAll.mockResolvedValue(mockBoticas);

            // EJECUTAR
            const result = await BoticaService.getAllBoticas();

            // VALIDAR
            expect(result).toEqual(mockBoticas);
            expect(result).toHaveLength(2);
            expect(BoticaRepository.findAll).toHaveBeenCalled();
        });

        test('should throw error when repository fails', async () => {
            // PREPARAR
            BoticaRepository.findAll.mockRejectedValue(new Error('Error de conexión'));

            // EJECUTAR y VALIDAR
            await expect(BoticaService.getAllBoticas())
                .rejects
                .toThrow('Error en el servicio al obtener boticas: Error de conexión');
        });
    });
}); 