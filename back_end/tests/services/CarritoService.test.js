import CarritoService from '../../services/CarritoService.js';

describe('CarritoService', () => {
    
    // Happy Path: Obtener todos los carritos
    test('should get all carritos successfully (Happy Path)', async () => {
        // EJECUTAR
        const carritos = await CarritoService.findAll();

        // VALIDAR
        expect(Array.isArray(carritos)).toBe(true);
    });

    // Happy Path: Crear, buscar, actualizar y eliminar un carrito
    test('should create, find, update and delete a carrito successfully (Happy Path)', async () => {
        // PREPARAR
        const newCarrito = {
            usuario_id: 1,
            fecha_actualizacion: '15-07-2025'
        };

        const updatedData = {
            usuario_id: 1,
            fecha_actualizacion: '16-07-2025'
        };

        // EJECUTAR - Crear
        const created = await CarritoService.create(newCarrito);
        
        // VALIDAR - Crear
        expect(created).toHaveProperty('id');
        expect(created.usuario_id).toBe(1);
        expect(created.fecha_actualizacion).toBeInstanceOf(Date);

        // EJECUTAR - Buscar por ID
        const found = await CarritoService.findById(created.id);
        
        // VALIDAR - Buscar
        expect(found).toHaveProperty('id', created.id);
        expect(found.usuario_id).toBe(1);

        // EJECUTAR - Actualizar
        const updated = await CarritoService.update(created.id, updatedData);
        
        // VALIDAR - Actualizar
        expect(updated).toBeTruthy();

        // EJECUTAR - Eliminar
        const deleted = await CarritoService.delete(created.id);
        
        // VALIDAR - Eliminar
        expect(deleted).toBe(true);
        
        // Verificar que ya no existe
        const deletedCarrito = await CarritoService.findById(created.id);
        expect(deletedCarrito).toBeNull();
    });

    // Happy Path: Buscar carrito completo por usuario ID
    it('should find complete carrito by usuario ID successfully (Happy Path)', async () => {
        // PREPARAR
        const usuarioId = 1;

        // EJECUTAR
        const carritoCompleto = await CarritoService.findCarritoCompletoByUsuarioId(usuarioId);

        // VALIDAR
        // El resultado puede ser null si no existe carrito para ese usuario, eso es válido
        if (carritoCompleto) {
            expect(carritoCompleto).toHaveProperty('usuario_id', usuarioId);
        }
    });

    // Unhappy Path: Crear carrito sin campos requeridos
    it('should fail to create carrito without required fields (Unhappy Path)', async () => {
        // PREPARAR
        const invalidCarrito = {
            fecha_actualizacion: '15-07-2025'
            // falta usuario_id
        };

        // EJECUTAR y VALIDAR
        await expect(CarritoService.create(invalidCarrito)).rejects.toThrow('El campo usuario_id es requerido');
    });

    // Unhappy Path: Crear carrito sin fecha de actualización
    it('should fail to create carrito without fecha_actualizacion (Unhappy Path)', async () => {
        // PREPARAR
        const invalidCarrito = {
            usuario_id: 1
            // falta fecha_actualizacion
        };

        // EJECUTAR y VALIDAR
        await expect(CarritoService.create(invalidCarrito)).rejects.toThrow('El campo fecha_actualizacion es requerido');
    });

    // Unhappy Path: Crear carrito con formato de fecha inválido
    it('should fail to create carrito with invalid date format (Unhappy Path)', async () => {
        // PREPARAR
        const invalidCarrito = {
            usuario_id: 1,
            fecha_actualizacion: '2025-07-15' // formato incorrecto (YYYY-MM-DD en lugar de DD-MM-YYYY)
        };

        // EJECUTAR y VALIDAR
        await expect(CarritoService.create(invalidCarrito)).rejects.toThrow('La fecha debe tener el formato DD-MM-YYYY');
    });

    // Unhappy Path: Buscar carrito por ID inexistente
    it('should return null for non-existent carrito ID (Unhappy Path)', async () => {
        // PREPARAR
        const nonExistentId = 999999;

        // EJECUTAR
        const result = await CarritoService.findById(nonExistentId);

        // VALIDAR
        expect(result).toBeNull();
    });

    // Unhappy Path: Actualizar carrito inexistente
    it('should fail to update non-existent carrito (Unhappy Path)', async () => {
        // PREPARAR
        const nonExistentId = 999999;
        const updateData = {
            usuario_id: 1,
            fecha_actualizacion: '15-07-2025'
        };

        // EJECUTAR y VALIDAR
        await expect(CarritoService.update(nonExistentId, updateData)).rejects.toThrow();
    });

    // Unhappy Path: Eliminar carrito inexistente
    it('should fail to delete non-existent carrito (Unhappy Path)', async () => {
        // PREPARAR
        const nonExistentId = 999999;

        // EJECUTAR y VALIDAR
        await expect(CarritoService.delete(nonExistentId)).rejects.toThrow();
    });

    // Edge Case: Validar diferentes formatos de fecha inválidos
    it('should fail with various invalid date formats (Edge Case)', async () => {
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

            await expect(CarritoService.create(invalidCarrito)).rejects.toThrow('La fecha debe tener el formato DD-MM-YYYY');
        }
    });

    // Edge Case: Validar fecha válida en límites
    it('should accept valid edge case dates (Edge Case)', async () => {
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
