import DetallePedidoService from '../../services/DetallePedidoService.js';

describe('DetallePedidoService', () => {
    
    describe('Get All Detalle Pedidos', () => {
        test('should get all detalle pedidos successfully', async () => {
            // EJECUTAR
            const detallePedidos = await DetallePedidoService.getAllDetallePedidos();

            // VALIDAR
            expect(Array.isArray(detallePedidos)).toBe(true);
        });
    });

    describe('Get Detalle Pedido by ID', () => {
        test('should get detalle pedido by valid ID successfully', async () => {
            // PREPARAR - Crear primero un detalle para buscar
            const newDetallePedido = {
                cantidad: 2,
                precio_unitario: 15.50,
                pedido_id: 1,
                medicamento_id: 1
            };
            const created = await DetallePedidoService.createDetallePedido(newDetallePedido);

            // EJECUTAR
            const result = await DetallePedidoService.getDetallePedidoById(created.id);
            
            // VALIDAR
            expect(result).toHaveProperty('id', created.id);
            expect(result.cantidad).toBe(2);
            expect(result.precio_unitario).toBe(15.50);

            // LIMPIAR
            await DetallePedidoService.deleteDetallePedido(created.id);
        });

        test('should throw error when detalle pedido is not found', async () => {
            // PREPARAR
            const nonExistentId = 999999;

            // EJECUTAR y VALIDAR
            await expect(DetallePedidoService.getDetallePedidoById(nonExistentId))
                .rejects
                .toThrow();
        });
    });

    describe('Create Detalle Pedido', () => {
        test('should create detalle pedido with valid data successfully', async () => {
            // PREPARAR
            const validDetallePedidoData = {
                cantidad: 2,
                precio_unitario: 15.50,
                pedido_id: 1,
                medicamento_id: 1
            };

            // EJECUTAR
            const result = await DetallePedidoService.createDetallePedido(validDetallePedidoData);
            
            // VALIDAR
            expect(result).toHaveProperty('id');
            expect(result.cantidad).toBe(2);
            expect(result.precio_unitario).toBe(15.50);
            expect(result.pedido_id).toBe(1);
            expect(result.medicamento_id).toBe(1);

            // LIMPIAR
            await DetallePedidoService.deleteDetallePedido(result.id);
        });

        test('should throw error when required fields are missing', async () => {
            // PREPARAR datos inválidos (faltan campos requeridos)
            const invalidDetallePedidoData = {
                precio_unitario: 15.50,
                pedido_id: 1
                // faltan cantidad y medicamento_id
            };

            // EJECUTAR y VALIDAR
            await expect(DetallePedidoService.createDetallePedido(invalidDetallePedidoData))
                .rejects
                .toThrow('El campo cantidad es requerido');
        });

        test('should validate all required fields', async () => {
            // PREPARAR casos de prueba para cada campo requerido
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
                    .rejects
                    .toThrow(`El campo ${field} es requerido`);
            }
        });

        test('should throw error with null/undefined values', async () => {
            // PREPARAR
            const invalidDetallePedidoData = {
                cantidad: null,
                precio_unitario: 15.50,
                pedido_id: 1,
                medicamento_id: 1
            };

            // EJECUTAR y VALIDAR
            await expect(DetallePedidoService.createDetallePedido(invalidDetallePedidoData))
                .rejects
                .toThrow('El campo cantidad es requerido');
        });

        test('should handle extreme valid values', async () => {
            // PREPARAR
            const extremeData = {
                cantidad: 999,
                precio_unitario: 9999.99,
                pedido_id: 1,
                medicamento_id: 1
            };

            // EJECUTAR
            const result = await DetallePedidoService.createDetallePedido(extremeData);
            
            // VALIDAR
            expect(result).toHaveProperty('id');
            expect(result.cantidad).toBe(999);
            expect(result.precio_unitario).toBe(9999.99);

            // LIMPIAR
            await DetallePedidoService.deleteDetallePedido(result.id);
        });
    });

    describe('Validation (validateDetallePedidoData)', () => {
        test('should validate all required fields through create', async () => {
            // PREPARAR casos de prueba para cada campo requerido
            const testCases = [
                { field: 'cantidad', data: { precio_unitario: 15.50, pedido_id: 1, medicamento_id: 1 } },
                { field: 'precio_unitario', data: { cantidad: 2, pedido_id: 1, medicamento_id: 1 } },
                { field: 'pedido_id', data: { cantidad: 2, precio_unitario: 15.50, medicamento_id: 1 } },
                { field: 'medicamento_id', data: { cantidad: 2, precio_unitario: 15.50, pedido_id: 1 } }
            ];

            for (const testCase of testCases) {
                // EJECUTAR y VALIDAR
                await expect(DetallePedidoService.createDetallePedido(testCase.data))
                    .rejects
                    .toThrow(`El campo ${testCase.field} es requerido`);
            }
        });

        test('should validate all required fields through update', async () => {
            // PREPARAR casos de prueba para cada campo requerido
            const testCases = [
                { field: 'cantidad', data: { precio_unitario: 15.50, pedido_id: 1, medicamento_id: 1 } },
                { field: 'precio_unitario', data: { cantidad: 2, pedido_id: 1, medicamento_id: 1 } },
                { field: 'pedido_id', data: { cantidad: 2, precio_unitario: 15.50, medicamento_id: 1 } },
                { field: 'medicamento_id', data: { cantidad: 2, precio_unitario: 15.50, pedido_id: 1 } }
            ];

            for (const testCase of testCases) {
                // EJECUTAR y VALIDAR
                await expect(DetallePedidoService.updateDetallePedido(1, testCase.data))
                    .rejects
                    .toThrow(`El campo ${testCase.field} es requerido`);
            }
        });

        test('should pass validation with all valid fields', async () => {
            // PREPARAR
            const validData = {
                cantidad: 5,
                precio_unitario: 25.75,
                pedido_id: 1,
                medicamento_id: 1
            };

            // EJECUTAR - La validación debe pasar y crear el detalle
            const result = await DetallePedidoService.createDetallePedido(validData);
            
            // VALIDAR - No debe lanzar error y debe crear exitosamente
            expect(result).toHaveProperty('id');
            expect(result.cantidad).toBe(5);
            expect(result.precio_unitario).toBe(25.75);

            // LIMPIAR
            await DetallePedidoService.deleteDetallePedido(result.id);
        });
    });

    describe('Update Detalle Pedido', () => {
        test('should update detalle pedido with valid data successfully', async () => {
            // PREPARAR - Crear primero un detalle
            const originalData = {
                cantidad: 2,
                precio_unitario: 15.50,
                pedido_id: 1,
                medicamento_id: 1
            };
            const created = await DetallePedidoService.createDetallePedido(originalData);

            const updateData = {
                cantidad: 3,
                precio_unitario: 18.00,
                pedido_id: 1,
                medicamento_id: 1
            };

            // EJECUTAR
            const result = await DetallePedidoService.updateDetallePedido(created.id, updateData);
            
            // VALIDAR
            expect(result).toBeTruthy();

            // LIMPIAR
            await DetallePedidoService.deleteDetallePedido(created.id);
        });

        test('should throw error when updating non-existent detalle pedido', async () => {
            // PREPARAR
            const nonExistentId = 999999;
            const updateData = {
                cantidad: 5,
                precio_unitario: 20.00,
                pedido_id: 1,
                medicamento_id: 1
            };

            // EJECUTAR y VALIDAR
            await expect(DetallePedidoService.updateDetallePedido(nonExistentId, updateData))
                .rejects
                .toThrow();
        });

        test('should throw error when update data is invalid', async () => {
            // PREPARAR
            const invalidUpdateData = {
                precio_unitario: 20.00,
                pedido_id: 1
                // faltan campos requeridos
            };

            // EJECUTAR y VALIDAR
            await expect(DetallePedidoService.updateDetallePedido(1, invalidUpdateData))
                .rejects
                .toThrow('El campo cantidad es requerido');
        });
    });

    describe('Delete Detalle Pedido', () => {
        test('should delete detalle pedido successfully', async () => {
            // PREPARAR - Crear primero un detalle
            const detallePedidoData = {
                cantidad: 1,
                precio_unitario: 10.00,
                pedido_id: 1,
                medicamento_id: 1
            };
            const created = await DetallePedidoService.createDetallePedido(detallePedidoData);

            // EJECUTAR
            const result = await DetallePedidoService.deleteDetallePedido(created.id);
            
            // VALIDAR
            expect(result).toBe(true);
            
            // Verificar que ya no existe
            await expect(DetallePedidoService.getDetallePedidoById(created.id))
                .rejects
                .toThrow();
        });

        test('should throw error when deleting non-existent detalle pedido', async () => {
            // PREPARAR
            const nonExistentId = 999999;

            // EJECUTAR y VALIDAR
            await expect(DetallePedidoService.deleteDetallePedido(nonExistentId))
                .rejects
                .toThrow();
        });
    });
});
