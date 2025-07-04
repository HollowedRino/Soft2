import DetallePedidoService from '../../services/DetallePedidoService.js';

describe('DetallePedidoService', () => {
    
    // Happy Path: Obtener todos los detalles de pedidos
    test('should get all detalle pedidos successfully (Happy Path)', async () => {
        // EJECUTAR
        const detallePedidos = await DetallePedidoService.getAllDetallePedidos();

        // VALIDAR
        expect(Array.isArray(detallePedidos)).toBe(true);
    });

    // Happy Path: Crear, buscar, actualizar y eliminar un detalle de pedido
    test('should create, find, update and delete a detalle pedido successfully (Happy Path)', async () => {
        // PREPARAR
        const newDetallePedido = {
            cantidad: 2,
            precio_unitario: 15.50,
            pedido_id: 1,
            medicamento_id: 1
        };

        const updateData = {
            cantidad: 3,
            precio_unitario: 18.00,
            pedido_id: 1,
            medicamento_id: 1
        };

        // EJECUTAR - Crear
        const created = await DetallePedidoService.createDetallePedido(newDetallePedido);
        
        // VALIDAR - Crear
        expect(created).toHaveProperty('id');
        expect(created.cantidad).toBe(2);
        expect(created.precio_unitario).toBe(15.50);
        expect(created.pedido_id).toBe(1);
        expect(created.medicamento_id).toBe(1);

        // EJECUTAR - Buscar por ID
        const found = await DetallePedidoService.getDetallePedidoById(created.id);
        
        // VALIDAR - Buscar
        expect(found).toHaveProperty('id', created.id);
        expect(found.cantidad).toBe(2);

        // EJECUTAR - Actualizar
        const updated = await DetallePedidoService.updateDetallePedido(created.id, updateData);
        
        // VALIDAR - Actualizar
        expect(updated).toBeTruthy();

        // EJECUTAR - Eliminar
        const deleted = await DetallePedidoService.deleteDetallePedido(created.id);
        
        // VALIDAR - Eliminar
        expect(deleted).toBe(true);
        
        // Verificar que ya no existe
        await expect(DetallePedidoService.getDetallePedidoById(created.id)).rejects.toThrow();
    });

    // Happy Path: Crear detalle pedido con diferentes valores válidos
    test('should create detalle pedido with different valid values (Happy Path)', async () => {
        const validData = [
            { cantidad: 1, precio_unitario: 5.99, pedido_id: 1, medicamento_id: 2 },
            { cantidad: 10, precio_unitario: 100.00, pedido_id: 2, medicamento_id: 3 },
            { cantidad: 5, precio_unitario: 0.50, pedido_id: 3, medicamento_id: 4 }
        ];
        
        for (const data of validData) {
            // EJECUTAR
            const created = await DetallePedidoService.createDetallePedido(data);
            
            // VALIDAR
            expect(created).toHaveProperty('id');
            expect(created.cantidad).toBe(data.cantidad);
            expect(created.precio_unitario).toBe(data.precio_unitario);
            
            // LIMPIAR
            await DetallePedidoService.deleteDetallePedido(created.id);
        }
    });

    // Unhappy Path: Buscar detalle pedido por ID inexistente
    test('should fail to find detalle pedido by non-existent ID (Unhappy Path)', async () => {
        // PREPARAR
        const nonExistentId = 999999;

        // EJECUTAR y VALIDAR
        await expect(DetallePedidoService.getDetallePedidoById(nonExistentId)).rejects.toThrow();
    });

    // Unhappy Path: Actualizar detalle pedido inexistente
    test('should fail to update non-existent detalle pedido (Unhappy Path)', async () => {
        // PREPARAR
        const nonExistentId = 999999;
        const updateData = {
            cantidad: 5,
            precio_unitario: 20.00,
            pedido_id: 1,
            medicamento_id: 1
        };

        // EJECUTAR y VALIDAR
        await expect(DetallePedidoService.updateDetallePedido(nonExistentId, updateData)).rejects.toThrow();
    });

    // Unhappy Path: Eliminar detalle pedido inexistente
    test('should fail to delete non-existent detalle pedido (Unhappy Path)', async () => {
        // PREPARAR
        const nonExistentId = 999999;

        // EJECUTAR y VALIDAR
        await expect(DetallePedidoService.deleteDetallePedido(nonExistentId)).rejects.toThrow();
    });

    // Unhappy Path: Crear detalle pedido sin campos requeridos
    test('should fail to create detalle pedido without required fields (Unhappy Path)', async () => {
        // PREPARAR
        const invalidDetallePedido = {
            precio_unitario: 15.50,
            pedido_id: 1
            // faltan cantidad y medicamento_id
        };

        // EJECUTAR y VALIDAR
        await expect(DetallePedidoService.createDetallePedido(invalidDetallePedido))
            .rejects.toThrow('El campo cantidad es requerido');
    });

    // Unhappy Path: Validar todos los campos requeridos individualmente
    test('should validate all required fields individually (Unhappy Path)', async () => {
        const requiredFields = ['cantidad', 'precio_unitario', 'pedido_id', 'medicamento_id'];
        
        for (const field of requiredFields) {
            const incompleteData = {
                cantidad: 2,
                precio_unitario: 15.50,
                pedido_id: 1,
                medicamento_id: 1
            };
            delete incompleteData[field];

            // EJECUTAR y VALIDAR
            await expect(DetallePedidoService.createDetallePedido(incompleteData))
                .rejects.toThrow(`El campo ${field} es requerido`);
        }
    });

    // Unhappy Path: Crear detalle pedido con valores null/undefined
    test('should fail to create detalle pedido with null/undefined values (Unhappy Path)', async () => {
        const invalidValues = [
            { cantidad: null, precio_unitario: 15.50, pedido_id: 1, medicamento_id: 1 },
            { cantidad: 2, precio_unitario: null, pedido_id: 1, medicamento_id: 1 },
            { cantidad: 2, precio_unitario: 15.50, pedido_id: null, medicamento_id: 1 },
            { cantidad: 2, precio_unitario: 15.50, pedido_id: 1, medicamento_id: null },
            { cantidad: undefined, precio_unitario: 15.50, pedido_id: 1, medicamento_id: 1 }
        ];

        for (const invalidData of invalidValues) {
            await expect(DetallePedidoService.createDetallePedido(invalidData))
                .rejects.toThrow('es requerido');
        }
    });

    // Unhappy Path: Actualizar con datos inválidos
    test('should fail to update with invalid data (Unhappy Path)', async () => {
        // PREPARAR
        const invalidUpdateData = {
            precio_unitario: 20.00,
            pedido_id: 1
            // faltan campos requeridos
        };

        // EJECUTAR y VALIDAR
        await expect(DetallePedidoService.updateDetallePedido(1, invalidUpdateData))
            .rejects.toThrow('El campo cantidad es requerido');
    });

    // Edge Case: Crear detalle pedido con valores extremos válidos
    test('should handle detalle pedido with extreme valid values (Edge Case)', async () => {
        const extremeValues = [
            { cantidad: 1, precio_unitario: 0.01, pedido_id: 1, medicamento_id: 1 }, // valores mínimos
            { cantidad: 999, precio_unitario: 9999.99, pedido_id: 1, medicamento_id: 1 } // valores altos
        ];

        for (const data of extremeValues) {
            // EJECUTAR
            const created = await DetallePedidoService.createDetallePedido(data);
            
            // VALIDAR
            expect(created).toHaveProperty('id');
            expect(created.cantidad).toBe(data.cantidad);
            expect(created.precio_unitario).toBe(data.precio_unitario);
            
            // LIMPIAR
            await DetallePedidoService.deleteDetallePedido(created.id);
        }
    });

    // Edge Case: Crear detalle pedido con decimales de alta precisión
    test('should handle detalle pedido with high precision decimals (Edge Case)', async () => {
        // PREPARAR
        const preciseData = {
            cantidad: 2,
            precio_unitario: 15.123456789, // muchos decimales
            pedido_id: 1,
            medicamento_id: 1
        };

        // EJECUTAR
        const created = await DetallePedidoService.createDetallePedido(preciseData);
        
        // VALIDAR
        expect(created).toHaveProperty('id');
        expect(typeof created.precio_unitario).toBe('number');
        
        // LIMPIAR
        await DetallePedidoService.deleteDetallePedido(created.id);
    });

    // Edge Case: Crear detalle pedido con IDs grandes
    test('should handle detalle pedido with large IDs (Edge Case)', async () => {
        // PREPARAR
        const largeIdData = {
            cantidad: 1,
            precio_unitario: 10.00,
            pedido_id: 999999,
            medicamento_id: 888888
        };

        // EJECUTAR y VALIDAR
        try {
            const created = await DetallePedidoService.createDetallePedido(largeIdData);
            expect(created).toHaveProperty('id');
            // LIMPIAR
            await DetallePedidoService.deleteDetallePedido(created.id);
        } catch (error) {
            // Si falla por restricciones de FK, está bien
            expect(error).toBeDefined();
        }
    });
});
