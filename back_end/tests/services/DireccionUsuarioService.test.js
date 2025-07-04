import DireccionUsuarioService from '../../services/DireccionUsuarioService.js';

describe('DireccionUsuarioService', () => {
    
    describe('Get All Direcciones', () => {
        test('should get all direcciones successfully', async () => {
            // EJECUTAR
            const direcciones = await DireccionUsuarioService.getAllDirecciones();

            // VALIDAR
            expect(Array.isArray(direcciones)).toBe(true);
        });
    });

    describe('Get Direccion by ID', () => {
        test('should get direccion by valid ID successfully', async () => {
            // PREPARAR - Crear primero una dirección para buscar
            const newDireccion = {
                direccion: 'Av. Test 123',
                alias: 'Casa Test',
                usuario_id: 1,
                distrito_id: 5
            };
            const created = await DireccionUsuarioService.createDireccion(newDireccion);

            // EJECUTAR
            const result = await DireccionUsuarioService.getDireccionById(created.id);
            
            // VALIDAR
            expect(result).toHaveProperty('id', created.id);
            expect(result.direccion).toBe('Av. Test 123');
            expect(result.alias).toBe('Casa Test');

            // LIMPIAR
            await DireccionUsuarioService.deleteDireccion(created.id);
        });

        test('should throw error when direccion is not found', async () => {
            // PREPARAR
            const nonExistentId = 999999;

            // EJECUTAR y VALIDAR
            await expect(DireccionUsuarioService.getDireccionById(nonExistentId))
                .rejects
                .toThrow();
        });
    });

    describe('Create Direccion', () => {
        test('should create direccion with valid data successfully', async () => {
            // PREPARAR
            const validDireccionData = {
                direccion: 'Av. Larco 456, Miraflores',
                alias: 'Casa',
                usuario_id: 1,
                distrito_id: 5
            };

            // EJECUTAR
            const result = await DireccionUsuarioService.createDireccion(validDireccionData);
            
            // VALIDAR
            expect(result).toHaveProperty('id');
            expect(result.direccion).toBe('Av. Larco 456, Miraflores');
            expect(result.alias).toBe('Casa');
            expect(result.usuario_id).toBe(1);
            expect(result.distrito_id).toBe(5);

            // LIMPIAR
            await DireccionUsuarioService.deleteDireccion(result.id);
        });

        test('should throw error when required fields are missing', async () => {
            // PREPARAR datos inválidos (faltan campos requeridos)
            const invalidDireccionData = {
                alias: 'Casa',
                usuario_id: 1
                // faltan direccion y distrito_id
            };

            // EJECUTAR y VALIDAR
            await expect(DireccionUsuarioService.createDireccion(invalidDireccionData))
                .rejects
                .toThrow('El campo direccion es requerido');
        });

        test('should validate all required fields', async () => {
            // PREPARAR casos de prueba para cada campo requerido
            const requiredFields = ['direccion', 'alias', 'usuario_id', 'distrito_id'];
            
            for (const field of requiredFields) {
                const incompleteData = {
                    direccion: 'Av. Test 123',
                    alias: 'Casa',
                    usuario_id: 1,
                    distrito_id: 5
                };
                delete incompleteData[field];

                // EJECUTAR y VALIDAR
                await expect(DireccionUsuarioService.createDireccion(incompleteData))
                    .rejects
                    .toThrow(`El campo ${field} es requerido`);
            }
        });

        test('should throw error with null/undefined values', async () => {
            // PREPARAR
            const invalidDireccionData = {
                direccion: null,
                alias: 'Casa',
                usuario_id: 1,
                distrito_id: 5
            };

            // EJECUTAR y VALIDAR
            await expect(DireccionUsuarioService.createDireccion(invalidDireccionData))
                .rejects
                .toThrow('El campo direccion es requerido');
        });

        test('should throw error with empty strings', async () => {
            // PREPARAR
            const invalidDireccionData = {
                direccion: '',
                alias: 'Casa',
                usuario_id: 1,
                distrito_id: 5
            };

            // EJECUTAR y VALIDAR
            await expect(DireccionUsuarioService.createDireccion(invalidDireccionData))
                .rejects
                .toThrow('El campo direccion es requerido');
        });
    });

    describe('Validation (validatedireccionUsuarioData)', () => {
        test('should validate all required fields through create', async () => {
            // PREPARAR casos de prueba para cada campo requerido
            const testCases = [
                { field: 'direccion', data: { alias: 'Casa', usuario_id: 1, distrito_id: 5 } },
                { field: 'alias', data: { direccion: 'Av. Test 123', usuario_id: 1, distrito_id: 5 } },
                { field: 'usuario_id', data: { direccion: 'Av. Test 123', alias: 'Casa', distrito_id: 5 } },
                { field: 'distrito_id', data: { direccion: 'Av. Test 123', alias: 'Casa', usuario_id: 1 } }
            ];

            for (const testCase of testCases) {
                // EJECUTAR y VALIDAR
                await expect(DireccionUsuarioService.createDireccion(testCase.data))
                    .rejects
                    .toThrow(`El campo ${testCase.field} es requerido`);
            }
        });

        test('should validate all required fields through update', async () => {
            // PREPARAR casos de prueba para cada campo requerido
            const testCases = [
                { field: 'direccion', data: { alias: 'Casa', usuario_id: 1, distrito_id: 5 } },
                { field: 'alias', data: { direccion: 'Av. Test 123', usuario_id: 1, distrito_id: 5 } },
                { field: 'usuario_id', data: { direccion: 'Av. Test 123', alias: 'Casa', distrito_id: 5 } },
                { field: 'distrito_id', data: { direccion: 'Av. Test 123', alias: 'Casa', usuario_id: 1 } }
            ];

            for (const testCase of testCases) {
                // EJECUTAR y VALIDAR
                await expect(DireccionUsuarioService.updateDireccion(1, testCase.data))
                    .rejects
                    .toThrow(`El campo ${testCase.field} es requerido`);
            }
        });

        test('should validate against null values', async () => {
            // PREPARAR casos con valores null
            const nullTestCases = [
                { direccion: null, alias: 'Casa', usuario_id: 1, distrito_id: 5 },
                { direccion: 'Av. Test 123', alias: null, usuario_id: 1, distrito_id: 5 },
                { direccion: 'Av. Test 123', alias: 'Casa', usuario_id: null, distrito_id: 5 },
                { direccion: 'Av. Test 123', alias: 'Casa', usuario_id: 1, distrito_id: null }
            ];

            for (const invalidData of nullTestCases) {
                // EJECUTAR y VALIDAR
                await expect(DireccionUsuarioService.createDireccion(invalidData))
                    .rejects
                    .toThrow('es requerido');
            }
        });

        test('should validate against undefined values', async () => {
            // PREPARAR casos con valores undefined
            const undefinedTestCases = [
                { direccion: undefined, alias: 'Casa', usuario_id: 1, distrito_id: 5 },
                { direccion: 'Av. Test 123', alias: undefined, usuario_id: 1, distrito_id: 5 },
                { direccion: 'Av. Test 123', alias: 'Casa', usuario_id: undefined, distrito_id: 5 },
                { direccion: 'Av. Test 123', alias: 'Casa', usuario_id: 1, distrito_id: undefined }
            ];

            for (const invalidData of undefinedTestCases) {
                // EJECUTAR y VALIDAR
                await expect(DireccionUsuarioService.createDireccion(invalidData))
                    .rejects
                    .toThrow('es requerido');
            }
        });

        test('should validate against empty strings', async () => {
            // PREPARAR casos con strings vacíos
            const emptyStringTestCases = [
                { direccion: '', alias: 'Casa', usuario_id: 1, distrito_id: 5 },
                { direccion: 'Av. Test 123', alias: '', usuario_id: 1, distrito_id: 5 }
            ];

            for (const invalidData of emptyStringTestCases) {
                // EJECUTAR y VALIDAR
                await expect(DireccionUsuarioService.createDireccion(invalidData))
                    .rejects
                    .toThrow('es requerido');
            }
        });

        test('should pass validation with all valid fields', async () => {
            // PREPARAR
            const validData = {
                direccion: 'Av. Validación 123',
                alias: 'Casa Válida',
                usuario_id: 1,
                distrito_id: 5
            };

            // EJECUTAR - La validación debe pasar y crear la dirección
            const result = await DireccionUsuarioService.createDireccion(validData);
            
            // VALIDAR - No debe lanzar error y debe crear exitosamente
            expect(result).toHaveProperty('id');
            expect(result.direccion).toBe('Av. Validación 123');
            expect(result.alias).toBe('Casa Válida');

            // LIMPIAR
            await DireccionUsuarioService.deleteDireccion(result.id);
        });
    });

    describe('Update Direccion', () => {
        test('should update direccion with valid data successfully', async () => {
            // PREPARAR - Crear primero una dirección
            const originalData = {
                direccion: 'Av. Original 123',
                alias: 'Casa Original',
                usuario_id: 1,
                distrito_id: 5
            };
            const created = await DireccionUsuarioService.createDireccion(originalData);

            const updateData = {
                direccion: 'Av. Actualizada 456',
                alias: 'Casa Actualizada',
                usuario_id: 1,
                distrito_id: 3
            };

            // EJECUTAR
            const result = await DireccionUsuarioService.updateDireccion(created.id, updateData);
            
            // VALIDAR
            expect(result).toBeTruthy();

            // LIMPIAR
            await DireccionUsuarioService.deleteDireccion(created.id);
        });

        test('should throw error when updating non-existent direccion', async () => {
            // PREPARAR
            const nonExistentId = 999999;
            const updateData = {
                direccion: 'Av. Test 123',
                alias: 'Test',
                usuario_id: 1,
                distrito_id: 1
            };

            // EJECUTAR y VALIDAR
            await expect(DireccionUsuarioService.updateDireccion(nonExistentId, updateData))
                .rejects
                .toThrow();
        });

        test('should throw error when update data is invalid', async () => {
            // PREPARAR
            const invalidUpdateData = {
                alias: 'Casa Nueva'
                // faltan campos requeridos
            };

            // EJECUTAR y VALIDAR
            await expect(DireccionUsuarioService.updateDireccion(1, invalidUpdateData))
                .rejects
                .toThrow('El campo direccion es requerido');
        });
    });

    describe('Delete Direccion', () => {
        test('should delete direccion successfully', async () => {
            // PREPARAR - Crear primero una dirección
            const direccionData = {
                direccion: 'Av. Para Eliminar 123',
                alias: 'Casa Temporal',
                usuario_id: 1,
                distrito_id: 5
            };
            const created = await DireccionUsuarioService.createDireccion(direccionData);

            // EJECUTAR
            const result = await DireccionUsuarioService.deleteDireccion(created.id);
            
            // VALIDAR
            expect(result).toBe(true);
            
            // Verificar que ya no existe
            await expect(DireccionUsuarioService.getDireccionById(created.id))
                .rejects
                .toThrow();
        });

        test('should throw error when deleting non-existent direccion', async () => {
            // PREPARAR
            const nonExistentId = 999999;

            // EJECUTAR y VALIDAR
            await expect(DireccionUsuarioService.deleteDireccion(nonExistentId))
                .rejects
                .toThrow();
        });
    });
});
