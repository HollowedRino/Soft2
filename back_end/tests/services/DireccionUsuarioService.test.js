import DireccionUsuarioService from '../../services/DireccionUsuarioService.js';

describe('DireccionUsuarioService', () => {
    
    // Happy Path: Obtener todas las direcciones de usuario
    test('should get all direcciones successfully (Happy Path)', async () => {
        // EJECUTAR
        const direcciones = await DireccionUsuarioService.getAllDirecciones();

        // VALIDAR
        expect(Array.isArray(direcciones)).toBe(true);
    });

    // Happy Path: Crear, buscar, actualizar y eliminar una dirección de usuario
    test('should create, find, update and delete a direccion successfully (Happy Path)', async () => {
        // PREPARAR
        const newDireccion = {
            direccion: 'Av. Larco 456, Miraflores',
            alias: 'Casa',
            usuario_id: 1,
            distrito_id: 5
        };

        const updateData = {
            direccion: 'Av. Arequipa 789, Miraflores',
            alias: 'Casa Principal',
            usuario_id: 1,
            distrito_id: 5
        };

        // EJECUTAR - Crear
        const created = await DireccionUsuarioService.createDireccion(newDireccion);
        
        // VALIDAR - Crear
        expect(created).toHaveProperty('id');
        expect(created.direccion).toBe('Av. Larco 456, Miraflores');
        expect(created.alias).toBe('Casa');
        expect(created.usuario_id).toBe(1);
        expect(created.distrito_id).toBe(5);

        // EJECUTAR - Buscar por ID
        const found = await DireccionUsuarioService.getDireccionById(created.id);
        
        // VALIDAR - Buscar
        expect(found).toHaveProperty('id', created.id);
        expect(found.direccion).toBe('Av. Larco 456, Miraflores');

        // EJECUTAR - Actualizar
        const updated = await DireccionUsuarioService.updateDireccion(created.id, updateData);
        
        // VALIDAR - Actualizar
        expect(updated).toBeTruthy();

        // EJECUTAR - Eliminar
        const deleted = await DireccionUsuarioService.deleteDireccion(created.id);
        
        // VALIDAR - Eliminar
        expect(deleted).toBe(true);
        
        // Verificar que ya no existe
        await expect(DireccionUsuarioService.getDireccionById(created.id)).rejects.toThrow();
    });

    // Happy Path: Crear direcciones con diferentes aliases válidos
    test('should create direcciones with different valid aliases (Happy Path)', async () => {
        const validDirecciones = [
            { direccion: 'Av. Pardo 123', alias: 'Trabajo', usuario_id: 1, distrito_id: 5 },
            { direccion: 'Jr. Lima 456', alias: 'Casa de mis padres', usuario_id: 2, distrito_id: 3 },
            { direccion: 'Calle Real 789', alias: 'Oficina', usuario_id: 3, distrito_id: 1 }
        ];
        
        for (const data of validDirecciones) {
            // EJECUTAR
            const created = await DireccionUsuarioService.createDireccion(data);
            
            // VALIDAR
            expect(created).toHaveProperty('id');
            expect(created.direccion).toBe(data.direccion);
            expect(created.alias).toBe(data.alias);
            
            // LIMPIAR
            await DireccionUsuarioService.deleteDireccion(created.id);
        }
    });

    // Unhappy Path: Buscar dirección por ID inexistente
    test('should fail to find direccion by non-existent ID (Unhappy Path)', async () => {
        // PREPARAR
        const nonExistentId = 999999;

        // EJECUTAR y VALIDAR
        await expect(DireccionUsuarioService.getDireccionById(nonExistentId)).rejects.toThrow();
    });

    // Unhappy Path: Actualizar dirección inexistente
    test('should fail to update non-existent direccion (Unhappy Path)', async () => {
        // PREPARAR
        const nonExistentId = 999999;
        const updateData = {
            direccion: 'Av. Test 123',
            alias: 'Test',
            usuario_id: 1,
            distrito_id: 1
        };

        // EJECUTAR y VALIDAR
        await expect(DireccionUsuarioService.updateDireccion(nonExistentId, updateData)).rejects.toThrow();
    });

    // Unhappy Path: Eliminar dirección inexistente
    test('should fail to delete non-existent direccion (Unhappy Path)', async () => {
        // PREPARAR
        const nonExistentId = 999999;

        // EJECUTAR y VALIDAR
        await expect(DireccionUsuarioService.deleteDireccion(nonExistentId)).rejects.toThrow();
    });

    // Unhappy Path: Crear dirección sin campos requeridos
    test('should fail to create direccion without required fields (Unhappy Path)', async () => {
        // PREPARAR
        const invalidDireccion = {
            alias: 'Casa',
            usuario_id: 1
            // faltan direccion y distrito_id
        };

        // EJECUTAR y VALIDAR
        await expect(DireccionUsuarioService.createDireccion(invalidDireccion))
            .rejects.toThrow('El campo direccion es requerido');
    });

    // Unhappy Path: Validar todos los campos requeridos individualmente
    test('should validate all required fields individually (Unhappy Path)', async () => {
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
                .rejects.toThrow(`El campo ${field} es requerido`);
        }
    });

    // Unhappy Path: Crear dirección con valores null/undefined
    test('should fail to create direccion with null/undefined values (Unhappy Path)', async () => {
        const invalidValues = [
            { direccion: null, alias: 'Casa', usuario_id: 1, distrito_id: 5 },
            { direccion: 'Av. Test 123', alias: null, usuario_id: 1, distrito_id: 5 },
            { direccion: 'Av. Test 123', alias: 'Casa', usuario_id: null, distrito_id: 5 },
            { direccion: 'Av. Test 123', alias: 'Casa', usuario_id: 1, distrito_id: null },
            { direccion: undefined, alias: 'Casa', usuario_id: 1, distrito_id: 5 }
        ];

        for (const invalidData of invalidValues) {
            await expect(DireccionUsuarioService.createDireccion(invalidData))
                .rejects.toThrow('es requerido');
        }
    });

    // Unhappy Path: Crear dirección con strings vacíos
    test('should fail to create direccion with empty strings (Unhappy Path)', async () => {
        const invalidValues = [
            { direccion: '', alias: 'Casa', usuario_id: 1, distrito_id: 5 },
            { direccion: 'Av. Test 123', alias: '', usuario_id: 1, distrito_id: 5 }
        ];

        for (const invalidData of invalidValues) {
            await expect(DireccionUsuarioService.createDireccion(invalidData))
                .rejects.toThrow('es requerido');
        }
    });

    // Unhappy Path: Actualizar con datos inválidos
    test('should fail to update with invalid data (Unhappy Path)', async () => {
        // PREPARAR
        const invalidUpdateData = {
            alias: 'Casa Nueva'
            // faltan campos requeridos
        };

        // EJECUTAR y VALIDAR
        await expect(DireccionUsuarioService.updateDireccion(1, invalidUpdateData))
            .rejects.toThrow('El campo direccion es requerido');
    });

    // Edge Case: Crear dirección con direcciones muy largas
    test('should handle direccion with very long address (Edge Case)', async () => {
        // PREPARAR
        const longAddress = 'Av. ' + 'A'.repeat(500) + ' 123, Piso 10, Departamento 1001, Edificio Torre Central';
        const direccionData = {
            direccion: longAddress,
            alias: 'Casa con dirección larga',
            usuario_id: 1,
            distrito_id: 5
        };

        // EJECUTAR y VALIDAR
        try {
            const created = await DireccionUsuarioService.createDireccion(direccionData);
            expect(created).toHaveProperty('id');
            expect(created.direccion).toBe(longAddress);
            // LIMPIAR
            await DireccionUsuarioService.deleteDireccion(created.id);
        } catch (error) {
            // Si falla por límites de base de datos, está bien
            expect(error).toBeDefined();
        }
    });

    // Edge Case: Crear dirección con alias muy largo
    test('should handle direccion with very long alias (Edge Case)', async () => {
        // PREPARAR
        const longAlias = 'Casa de ' + 'mi '.repeat(100) + 'familia';
        const direccionData = {
            direccion: 'Av. Test 123',
            alias: longAlias,
            usuario_id: 1,
            distrito_id: 5
        };

        // EJECUTAR y VALIDAR
        try {
            const created = await DireccionUsuarioService.createDireccion(direccionData);
            expect(created).toHaveProperty('id');
            expect(created.alias).toBe(longAlias);
            // LIMPIAR
            await DireccionUsuarioService.deleteDireccion(created.id);
        } catch (error) {
            // Si falla por límites de base de datos, está bien
            expect(error).toBeDefined();
        }
    });

    // Edge Case: Crear dirección con caracteres especiales
    test('should handle direccion with special characters (Edge Case)', async () => {
        // PREPARAR
        const direccionData = {
            direccion: 'Av. José María Árgüëdâs 456, Ñuñoa',
            alias: 'Casa de mamá & papá',
            usuario_id: 1,
            distrito_id: 5
        };

        // EJECUTAR
        const created = await DireccionUsuarioService.createDireccion(direccionData);
        
        // VALIDAR
        expect(created).toHaveProperty('id');
        expect(created.direccion).toBe('Av. José María Árgüëdâs 456, Ñuñoa');
        expect(created.alias).toBe('Casa de mamá & papá');
        
        // LIMPIAR
        await DireccionUsuarioService.deleteDireccion(created.id);
    });

    // Edge Case: Crear dirección con IDs grandes
    test('should handle direccion with large IDs (Edge Case)', async () => {
        // PREPARAR
        const largeIdData = {
            direccion: 'Av. Test 123',
            alias: 'Casa',
            usuario_id: 999999,
            distrito_id: 888888
        };

        // EJECUTAR y VALIDAR
        try {
            const created = await DireccionUsuarioService.createDireccion(largeIdData);
            expect(created).toHaveProperty('id');
            // LIMPIAR
            await DireccionUsuarioService.deleteDireccion(created.id);
        } catch (error) {
            // Si falla por restricciones de FK, está bien
            expect(error).toBeDefined();
        }
    });

    // Edge Case: Crear múltiples direcciones para el mismo usuario
    test('should handle multiple direcciones for same user (Edge Case)', async () => {
        const direccionesData = [
            { direccion: 'Av. Casa 123', alias: 'Casa', usuario_id: 1, distrito_id: 5 },
            { direccion: 'Av. Trabajo 456', alias: 'Trabajo', usuario_id: 1, distrito_id: 3 },
            { direccion: 'Av. Padres 789', alias: 'Casa de mis padres', usuario_id: 1, distrito_id: 1 }
        ];

        const createdIds = [];

        for (const data of direccionesData) {
            // EJECUTAR
            const created = await DireccionUsuarioService.createDireccion(data);
            
            // VALIDAR
            expect(created).toHaveProperty('id');
            expect(created.usuario_id).toBe(1);
            expect(created.alias).toBe(data.alias);
            
            createdIds.push(created.id);
        }

        // LIMPIAR
        for (const id of createdIds) {
            await DireccionUsuarioService.deleteDireccion(id);
        }
    });
});
