import PedidoService from '../../services/PedidoService.js';
import PedidoRepository from '../../repositories/PedidoRepository.js';

// Mock del repositorio
jest.mock('../../repositories/PedidoRepository.js');

describe('PedidoService', () => {
    beforeEach(() => {
        // Limpiar todos los mocks antes de cada test
        jest.clearAllMocks();
    });

    describe('Get Pedido by ID', () => {
        test('should get pedido by valid ID successfully', async () => {
            // PREPARAR
            const mockPedido = {
                id: 1,
                fecha_pedido: '2025-07-03',
                estado_pedido: 'pendiente',
                usuario_id: 14,
                botica_id: 2,
                metodo_pago_id: 1,
                direccion_usuario_id: null,
                repartidor_id: 4
            };
            PedidoRepository.findById.mockResolvedValue(mockPedido);

            // EJECUTAR
            const result = await PedidoService.getPedidoById(mockPedido.id);

            // VALIDAR
            expect(result).toEqual(mockPedido);
            expect(result.estado_pedido).toBeDefined();
            expect(PedidoRepository.findById).toHaveBeenCalledWith(mockPedido.id);
        });

        test('should throw error when pedido is not found', async () => {
            // PREPARAR
            PedidoRepository.findById.mockRejectedValue(new Error('Pedido no encontrado'));

            // EJECUTAR y VALIDAR
            await expect(PedidoService.getPedidoById(999))
                .rejects
                .toThrow('Error en el servicio al obtener pedido: Pedido no encontrado');
        });
    });

    describe('Get Pedidos by Usuario', () => {
        test('should get pedidos by valid usuario ID successfully', async () => {
            // PREPARAR
            const mockPedidos = [
                {
                    id: 1,
                    fecha_pedido: '2025-07-03',
                    estado_pedido: 'pendiente',
                    usuario_id: 14,
                    botica_id: 2,
                    metodo_pago_id: 1,
                    repartidor_id: 4
                },
                {
                    id: 2,
                    fecha_pedido: '2025-07-02',
                    estado_pedido: 'entregado',
                    usuario_id: 14,
                    botica_id: 1,
                    metodo_pago_id: 2,
                    repartidor_id: 3
                }
            ];
            PedidoRepository.findByUsuarioId.mockResolvedValue(mockPedidos);

            // EJECUTAR
            const result = await PedidoService.getPedidosByUsuario(14);

            // VALIDAR
            expect(result).toEqual(mockPedidos);
            expect(result).toHaveLength(2);
            expect(result[0].usuario_id).toBe(14);
            expect(PedidoRepository.findByUsuarioId).toHaveBeenCalledWith(14);
        });

        test('should throw error when usuario ID is not provided', async () => {
            // EJECUTAR y VALIDAR
            await expect(PedidoService.getPedidosByUsuario(null))
                .rejects
                .toThrow('Error en el servicio al obtener pedidos del usuario: El ID del usuario es requerido');

            await expect(PedidoService.getPedidosByUsuario(undefined))
                .rejects
                .toThrow('Error en el servicio al obtener pedidos del usuario: El ID del usuario es requerido');

            await expect(PedidoService.getPedidosByUsuario(''))
                .rejects
                .toThrow('Error en el servicio al obtener pedidos del usuario: El ID del usuario es requerido');
        });

        test('should throw error when repository fails', async () => {
            // PREPARAR
            PedidoRepository.findByUsuarioId.mockRejectedValue(new Error('Error de base de datos'));

            // EJECUTAR y VALIDAR
            await expect(PedidoService.getPedidosByUsuario(14))
                .rejects
                .toThrow('Error en el servicio al obtener pedidos del usuario: Error de base de datos');
        });
    });

    describe('Create Pedido', () => {
        test('should create pedido with valid data successfully', async () => {
            // PREPARAR
            const validPedidoData = {
                fecha_pedido: '2025-07-03',
                estado_pedido: 'pendiente',
                usuario_id: 14,
                botica_id: 2,
                metodo_pago_id: 1,
                repartidor_id: 4
            };
            const mockCreatedPedido = { id: 1, ...validPedidoData };
            PedidoRepository.create.mockResolvedValue(mockCreatedPedido);

            // EJECUTAR
            const result = await PedidoService.createPedido(validPedidoData);

            // VALIDAR
            expect(result).toEqual(mockCreatedPedido);
            expect(result.id).toBeDefined();
            expect(PedidoRepository.create).toHaveBeenCalledWith(validPedidoData);
        });

        test('should throw error when required fields are missing', async () => {
            // PREPARAR datos inválidos (faltan campos requeridos)
            const invalidPedidoData = {
                fecha_pedido: '2025-07-03',
                estado_pedido: 'pendiente'
                // Faltan: usuario_id, botica_id, metodo_pago_id, repartidor_id
            };

            // EJECUTAR y VALIDAR
            await expect(PedidoService.createPedido(invalidPedidoData))
                .rejects
                .toThrow('Error en el servicio al crear pedido: El campo usuario_id es requerido');
        });

        test('should validate all required fields', async () => {
            // PREPARAR casos de prueba para cada campo requerido
            const requiredFields = ['fecha_pedido', 'estado_pedido', 'usuario_id', 'botica_id', 'metodo_pago_id', 'repartidor_id'];
            
            for (const field of requiredFields) {
                const incompleteData = {
                    fecha_pedido: '2025-07-03',
                    estado_pedido: 'pendiente',
                    usuario_id: 14,
                    botica_id: 2,
                    metodo_pago_id: 1,
                    repartidor_id: 4
                };
                delete incompleteData[field];

                // EJECUTAR y VALIDAR
                await expect(PedidoService.createPedido(incompleteData))
                    .rejects
                    .toThrow(`Error en el servicio al crear pedido: El campo ${field} es requerido`);
            }
        });
    });

    describe('Update Pedido', () => {
        test('should update pedido with valid data successfully', async () => {
            // PREPARAR
            const pedidoId = 1;
            const updateData = {
                fecha_pedido: '2025-07-03',
                estado_pedido: 'en_camino',
                usuario_id: 14,
                botica_id: 2,
                metodo_pago_id: 1,
                repartidor_id: 4
            };
            const mockUpdatedPedido = { id: pedidoId, ...updateData };
            PedidoRepository.update.mockResolvedValue(mockUpdatedPedido);

            // EJECUTAR
            const result = await PedidoService.updatePedido(pedidoId, updateData);

            // VALIDAR
            expect(result).toEqual(mockUpdatedPedido);
            expect(result.estado_pedido).toBe('en_camino');
            expect(PedidoRepository.update).toHaveBeenCalledWith(pedidoId, updateData);
        });

        test('should throw error when update data is invalid', async () => {
            // PREPARAR
            const invalidUpdateData = {
                estado_pedido: 'en_camino'
                // Faltan campos requeridos
            };

            // EJECUTAR y VALIDAR
            await expect(PedidoService.updatePedido(1, invalidUpdateData))
                .rejects
                .toThrow('Error en el servicio al actualizar pedido: El campo fecha_pedido es requerido');
        });
    });

    describe('Delete Pedido', () => {
        test('should delete pedido successfully', async () => {
            // PREPARAR
            const pedidoId = 1;
            PedidoRepository.delete.mockResolvedValue(true);

            // EJECUTAR
            const result = await PedidoService.deletePedido(pedidoId);

            // VALIDAR
            expect(result).toBe(true);
            expect(PedidoRepository.delete).toHaveBeenCalledWith(pedidoId);
        });

        test('should throw error when delete fails', async () => {
            // PREPARAR
            PedidoRepository.delete.mockRejectedValue(new Error('Pedido no encontrado'));

            // EJECUTAR y VALIDAR
            await expect(PedidoService.deletePedido(999))
                .rejects
                .toThrow('Error en el servicio al eliminar pedido: Pedido no encontrado');
        });
    });

    describe('Get All Pedidos', () => {
        test('should get all pedidos successfully', async () => {
            // PREPARAR
            const mockPedidos = [
                {
                    id: 1,
                    fecha_pedido: '2025-07-03',
                    estado_pedido: 'pendiente',
                    usuario_id: 14
                },
                {
                    id: 2,
                    fecha_pedido: '2025-07-02',
                    estado_pedido: 'entregado',
                    usuario_id: 15
                }
            ];
            PedidoRepository.findAll.mockResolvedValue(mockPedidos);

            // EJECUTAR
            const result = await PedidoService.getAllPedidos();

            // VALIDAR
            expect(result).toEqual(mockPedidos);
            expect(result).toHaveLength(2);
            expect(PedidoRepository.findAll).toHaveBeenCalled();
        });

        test('should throw error when repository fails', async () => {
            // PREPARAR
            PedidoRepository.findAll.mockRejectedValue(new Error('Error de conexión'));

            // EJECUTAR y VALIDAR
            await expect(PedidoService.getAllPedidos())
                .rejects
                .toThrow('Error en el servicio al obtener pedidos: Error de conexión');
        });
    });
});
