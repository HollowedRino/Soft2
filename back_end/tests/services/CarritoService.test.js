import CarritoService from '../../services/CarritoService.js';
import CarritoRepository from '../../repositories/CarritoRepository.js';

// Mock del repositorio
jest.mock('../../repositories/CarritoRepository.js');

describe('CarritoService', () => {
    beforeEach(() => {
        // Limpiar todos los mocks antes de cada test
        jest.clearAllMocks();
    });
    
    describe('Find All Carritos', () => {
        test('should get all carritos successfully', async () => {
            // PREPARAR
            const mockCarritos = [
                { id: 1, usuario_id: 1, fecha_actualizacion: new Date() },
                { id: 2, usuario_id: 2, fecha_actualizacion: new Date() }
            ];
            CarritoRepository.findAll.mockResolvedValue(mockCarritos);

            // EJECUTAR
            const result = await CarritoService.findAll();

            // VALIDAR
            expect(result).toEqual(mockCarritos);
            expect(Array.isArray(result)).toBe(true);
            expect(CarritoRepository.findAll).toHaveBeenCalled();
        });

        test('should throw error when repository fails', async () => {
            // PREPARAR
            CarritoRepository.findAll.mockRejectedValue(new Error('Error de conexión'));

            // EJECUTAR y VALIDAR
            await expect(CarritoService.findAll())
                .rejects
                .toThrow('Error al obtener todos los carritos: Error de conexión');
        });
    });

    describe('Find Carrito by ID', () => {
        test('should find carrito by valid ID successfully', async () => {
            // PREPARAR
            const mockCarrito = {
                id: 1,
                usuario_id: 1,
                fecha_actualizacion: new Date('2025-07-15')
            };
            CarritoRepository.findById.mockResolvedValue(mockCarrito);

            // EJECUTAR
            const result = await CarritoService.findById(mockCarrito.id);
            
            // VALIDAR
            expect(result).toEqual(mockCarrito);
            expect(result.usuario_id).toBe(1);
            expect(CarritoRepository.findById).toHaveBeenCalledWith(mockCarrito.id);
        });

        test('should return null for non-existent carrito ID', async () => {
            // PREPARAR
            const nonExistentId = 999999;
            CarritoRepository.findById.mockResolvedValue(null);

            // EJECUTAR
            const result = await CarritoService.findById(nonExistentId);

            // VALIDAR
            expect(result).toBeNull();
            expect(CarritoRepository.findById).toHaveBeenCalledWith(nonExistentId);
        });

        test('should throw error when repository fails', async () => {
            // PREPARAR
            CarritoRepository.findById.mockRejectedValue(new Error('Carrito no encontrado'));

            // EJECUTAR y VALIDAR
            await expect(CarritoService.findById(999))
                .rejects
                .toThrow('Error al obtener el carrito: Carrito no encontrado');
        });
    });

    describe('Find Carrito Completo by Usuario ID', () => {
        test('should find complete carrito by usuario ID successfully', async () => {
            // PREPARAR
            const usuarioId = 1;
            const mockCarritoCompleto = {
                id: 1,
                usuario_id: usuarioId,
                fecha_actualizacion: new Date(),
                items: []
            };
            CarritoRepository.findCarritoCompletoByUsuarioId.mockResolvedValue(mockCarritoCompleto);

            // EJECUTAR
            const result = await CarritoService.findCarritoCompletoByUsuarioId(usuarioId);

            // VALIDAR
            expect(result).toEqual(mockCarritoCompleto);
            expect(result.usuario_id).toBe(usuarioId);
            expect(CarritoRepository.findCarritoCompletoByUsuarioId).toHaveBeenCalledWith(usuarioId);
        });

        test('should return null when no carrito exists for user', async () => {
            // PREPARAR
            const usuarioId = 999;
            CarritoRepository.findCarritoCompletoByUsuarioId.mockResolvedValue(null);

            // EJECUTAR
            const result = await CarritoService.findCarritoCompletoByUsuarioId(usuarioId);

            // VALIDAR
            expect(result).toBeNull();
            expect(CarritoRepository.findCarritoCompletoByUsuarioId).toHaveBeenCalledWith(usuarioId);
        });

        test('should throw error when repository fails', async () => {
            // PREPARAR
            CarritoRepository.findCarritoCompletoByUsuarioId.mockRejectedValue(new Error('Error de conexión'));

            // EJECUTAR y VALIDAR
            await expect(CarritoService.findCarritoCompletoByUsuarioId(1))
                .rejects
                .toThrow('Error al obtener el carrito completo por usuario: Error de conexión');
        });
    });

    describe('Create Carrito', () => {
        test('should create carrito with valid data successfully', async () => {
            // PREPARAR
            const validCarritoData = {
                usuario_id: 1,
                fecha_actualizacion: '15-07-2025'
            };
            const mockCreatedCarrito = { 
                id: 1, 
                usuario_id: 1, 
                fecha_actualizacion: new Date('2025-07-15') 
            };
            CarritoRepository.create.mockResolvedValue(mockCreatedCarrito);

            // EJECUTAR
            const result = await CarritoService.create(validCarritoData);
            
            // VALIDAR
            expect(result).toEqual(mockCreatedCarrito);
            expect(result.id).toBeDefined();
            expect(result.usuario_id).toBe(1);
            expect(CarritoRepository.create).toHaveBeenCalledWith(validCarritoData);
        });

        test('should throw error when required fields are missing', async () => {
            // PREPARAR datos inválidos (falta usuario_id)
            const invalidCarritoData = {
                fecha_actualizacion: '15-07-2025'
                // falta usuario_id
            };

            // EJECUTAR y VALIDAR
            await expect(CarritoService.create(invalidCarritoData))
                .rejects
                .toThrow('Error al crear el carrito: El campo usuario_id es requerido');
        });

        test('should throw error when fecha_actualizacion is missing', async () => {
            // PREPARAR datos inválidos (falta fecha_actualizacion)
            const invalidCarritoData = {
                usuario_id: 1
                // falta fecha_actualizacion
            };

            // EJECUTAR y VALIDAR
            await expect(CarritoService.create(invalidCarritoData))
                .rejects
                .toThrow('Error al crear el carrito: El campo fecha_actualizacion es requerido');
        });

        test('should throw error with invalid date format', async () => {
            // PREPARAR
            const invalidCarritoData = {
                usuario_id: 1,
                fecha_actualizacion: '2025-07-15' // formato incorrecto (YYYY-MM-DD en lugar de DD-MM-YYYY)
            };

            // EJECUTAR y VALIDAR
            await expect(CarritoService.create(invalidCarritoData))
                .rejects
                .toThrow('Error al crear el carrito: La fecha debe tener el formato DD-MM-YYYY');
        });

        test('should throw error when repository fails', async () => {
            // PREPARAR
            const validData = { usuario_id: 1, fecha_actualizacion: '15-07-2025' };
            CarritoRepository.create.mockRejectedValue(new Error('Error de conexión'));

            // EJECUTAR y VALIDAR
            await expect(CarritoService.create(validData))
                .rejects
                .toThrow('Error al crear el carrito: Error de conexión');
        });
    });

    describe('Validation (validateCarritoData)', () => {
        test('should validate all required fields through create', async () => {
            // PREPARAR casos de prueba para cada campo requerido
            const testCases = [
                { field: 'usuario_id', data: { fecha_actualizacion: '15-07-2025' } },
                { field: 'fecha_actualizacion', data: { usuario_id: 1 } }
            ];

            for (const testCase of testCases) {
                // EJECUTAR y VALIDAR
                await expect(CarritoService.create(testCase.data))
                    .rejects
                    .toThrow(`Error al crear el carrito: El campo ${testCase.field} es requerido`);
            }
        });

        test('should validate date format through create', async () => {
            const invalidDates = [
                '32-12-2025',  // día inválido
                '15-13-2025',  // mes inválido
                '15/07/2025',  // separador incorrecto
                '15-7-2025',   // mes sin cero inicial
                '5-07-2025',   // día sin cero inicial
                '15-07-25',    // año de 2 dígitos
                'invalid-date' // formato completamente incorrecto
            ];

            for (const invalidDate of invalidDates) {
                const invalidCarrito = {
                    usuario_id: 1,
                    fecha_actualizacion: invalidDate
                };

                await expect(CarritoService.create(invalidCarrito))
                    .rejects
                    .toThrow('Error al crear el carrito: La fecha debe tener el formato DD-MM-YYYY');
            }
        });

        test('should pass validation with all valid fields', async () => {
            // PREPARAR
            const validData = {
                usuario_id: 1,
                fecha_actualizacion: '15-07-2025'
            };
            const mockCreatedCarrito = { 
                id: 1, 
                usuario_id: 1, 
                fecha_actualizacion: new Date('2025-07-15') 
            };
            CarritoRepository.create.mockResolvedValue(mockCreatedCarrito);

            // EJECUTAR - La validación debe pasar y crear el carrito
            const result = await CarritoService.create(validData);
            
            // VALIDAR - No debe lanzar error y debe crear exitosamente
            expect(result).toEqual(mockCreatedCarrito);
            expect(result.usuario_id).toBe(1);
            expect(CarritoRepository.create).toHaveBeenCalledWith(validData);
        });
    });

    describe('Update Carrito', () => {
        test('should update carrito with valid data successfully', async () => {
            // PREPARAR
            const carritoId = 1;
            const updateData = {
                usuario_id: 1,
                fecha_actualizacion: '16-07-2025'
            };
            const mockUpdatedCarrito = { 
                id: carritoId, 
                usuario_id: 1, 
                fecha_actualizacion: new Date('2025-07-16') 
            };
            CarritoRepository.update.mockResolvedValue(mockUpdatedCarrito);

            // EJECUTAR
            const result = await CarritoService.update(carritoId, updateData);
            
            // VALIDAR
            expect(result).toEqual(mockUpdatedCarrito);
            expect(CarritoRepository.update).toHaveBeenCalledWith(carritoId, updateData);
        });

        test('should throw error when updating non-existent carrito', async () => {
            // PREPARAR
            const nonExistentId = 999999;
            const updateData = {
                usuario_id: 1,
                fecha_actualizacion: '15-07-2025'
            };
            CarritoRepository.update.mockRejectedValue(new Error('Carrito no encontrado'));

            // EJECUTAR y VALIDAR
            await expect(CarritoService.update(nonExistentId, updateData))
                .rejects
                .toThrow('Error al actualizar el carrito: Carrito no encontrado');
        });

        test('should throw error when update data is invalid', async () => {
            // PREPARAR
            const invalidUpdateData = {
                fecha_actualizacion: '15-07-2025'
                // falta usuario_id
            };

            // EJECUTAR y VALIDAR
            await expect(CarritoService.update(1, invalidUpdateData))
                .rejects
                .toThrow('Error al actualizar el carrito: El campo usuario_id es requerido');
        });
    });

    describe('Delete Carrito', () => {
        test('should delete carrito successfully', async () => {
            // PREPARAR
            const carritoId = 1;
            CarritoRepository.delete.mockResolvedValue(true);

            // EJECUTAR
            const result = await CarritoService.delete(carritoId);
            
            // VALIDAR
            expect(result).toBe(true);
            expect(CarritoRepository.delete).toHaveBeenCalledWith(carritoId);
        });

        test('should throw error when deleting non-existent carrito', async () => {
            // PREPARAR
            const nonExistentId = 999999;
            CarritoRepository.delete.mockRejectedValue(new Error('Carrito no encontrado'));

            // EJECUTAR y VALIDAR
            await expect(CarritoService.delete(nonExistentId))
                .rejects
                .toThrow('Error al eliminar el carrito: Carrito no encontrado');
        });
    });
});
