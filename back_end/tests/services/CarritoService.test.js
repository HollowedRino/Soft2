import CarritoService from '../../services/CarritoService.js';

describe('CarritoService', () => {
    
    describe('Find All Carritos', () => {
        test('should get all carritos successfully', async () => {
            // EJECUTAR
            const carritos = await CarritoService.findAll();

            // VALIDAR
            expect(Array.isArray(carritos)).toBe(true);
        });
    });

    describe('Find Carrito by ID', () => {
        test('should find carrito by valid ID successfully', async () => {
            // PREPARAR - Crear primero un carrito para buscar
            const newCarrito = {
                usuario_id: 1,
                fecha_actualizacion: '15-07-2025'
            };
            const created = await CarritoService.create(newCarrito);

            // EJECUTAR
            const result = await CarritoService.findById(created.id);
            
            // VALIDAR
            expect(result).toHaveProperty('id', created.id);
            expect(result.usuario_id).toBe(1);
            expect(result.fecha_actualizacion).toBeInstanceOf(Date);

            // LIMPIAR
            await CarritoService.delete(created.id);
        });

        test('should return null for non-existent carrito ID', async () => {
            // PREPARAR
            const nonExistentId = 999999;

            // EJECUTAR
            const result = await CarritoService.findById(nonExistentId);

            // VALIDAR
            expect(result).toBeNull();
        });
    });

    describe('Find Carrito Completo by Usuario ID', () => {
        test('should find complete carrito by usuario ID successfully', async () => {
            // PREPARAR
            const usuarioId = 1;

            // EJECUTAR
            const carritoCompleto = await CarritoService.findCarritoCompletoByUsuarioId(usuarioId);

            // VALIDAR
            // El resultado puede ser null si no existe carrito para ese usuario, eso es válido
            if (carritoCompleto) {
                expect(carritoCompleto).toHaveProperty('usuario_id', usuarioId);
            } else {
                expect(carritoCompleto).toBeNull();
            }
        });
    });

    describe('Create Carrito', () => {
        test('should create carrito with valid data successfully', async () => {
            // PREPARAR
            const validCarritoData = {
                usuario_id: 1,
                fecha_actualizacion: '15-07-2025'
            };

            // EJECUTAR
            const result = await CarritoService.create(validCarritoData);
            
            // VALIDAR
            expect(result).toHaveProperty('id');
            expect(result.usuario_id).toBe(1);
            expect(result.fecha_actualizacion).toBeInstanceOf(Date);

            // LIMPIAR
            await CarritoService.delete(result.id);
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
                .toThrow('El campo usuario_id es requerido');
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
                .toThrow('El campo fecha_actualizacion es requerido');
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
                .toThrow('La fecha debe tener el formato DD-MM-YYYY');
        });

        test('should handle valid edge case dates', async () => {
            const validDates = [
                '01-01-2025',  // primer día del año
                '31-12-2025',  // último día del año
                '29-02-2024',  // año bisiesto
                '31-01-2025',  // último día de enero
                '30-04-2025'   // último día de abril
            ];

            for (const validDate of validDates) {
                const validCarrito = {
                    usuario_id: 1,
                    fecha_actualizacion: validDate
                };

                // EJECUTAR
                const created = await CarritoService.create(validCarrito);
                
                // VALIDAR
                expect(created).toHaveProperty('id');
                expect(created.fecha_actualizacion).toBeInstanceOf(Date);
                
                // LIMPIAR
                await CarritoService.delete(created.id);
            }
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
                    .toThrow(`El campo ${testCase.field} es requerido`);
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
                    .toThrow('La fecha debe tener el formato DD-MM-YYYY');
            }
        });

        test('should pass validation with all valid fields', async () => {
            // PREPARAR
            const validData = {
                usuario_id: 1,
                fecha_actualizacion: '15-07-2025'
            };

            // EJECUTAR - La validación debe pasar y crear el carrito
            const result = await CarritoService.create(validData);
            
            // VALIDAR - No debe lanzar error y debe crear exitosamente
            expect(result).toHaveProperty('id');
            expect(result.usuario_id).toBe(1);
            expect(result.fecha_actualizacion).toBeInstanceOf(Date);

            // LIMPIAR
            await CarritoService.delete(result.id);
        });
    });

    describe('Update Carrito', () => {
        test('should update carrito with valid data successfully', async () => {
            // PREPARAR - Crear primero un carrito
            const originalData = {
                usuario_id: 1,
                fecha_actualizacion: '15-07-2025'
            };
            const created = await CarritoService.create(originalData);

            const updateData = {
                usuario_id: 1,
                fecha_actualizacion: '16-07-2025'
            };

            // EJECUTAR
            const result = await CarritoService.update(created.id, updateData);
            
            // VALIDAR
            expect(result).toBeTruthy();

            // LIMPIAR
            await CarritoService.delete(created.id);
        });

        test('should throw error when updating non-existent carrito', async () => {
            // PREPARAR
            const nonExistentId = 999999;
            const updateData = {
                usuario_id: 1,
                fecha_actualizacion: '15-07-2025'
            };

            // EJECUTAR y VALIDAR
            await expect(CarritoService.update(nonExistentId, updateData))
                .rejects
                .toThrow();
        });
    });

    describe('Delete Carrito', () => {
        test('should delete carrito successfully', async () => {
            // PREPARAR - Crear primero un carrito
            const carritoData = {
                usuario_id: 1,
                fecha_actualizacion: '15-07-2025'
            };
            const created = await CarritoService.create(carritoData);

            // EJECUTAR
            const result = await CarritoService.delete(created.id);
            
            // VALIDAR
            expect(result).toBe(true);
            
            // Verificar que ya no existe
            const deletedCarrito = await CarritoService.findById(created.id);
            expect(deletedCarrito).toBeNull();
        });

        test('should throw error when deleting non-existent carrito', async () => {
            // PREPARAR
            const nonExistentId = 999999;

            // EJECUTAR y VALIDAR
            await expect(CarritoService.delete(nonExistentId))
                .rejects
                .toThrow();
        });
    });
});
