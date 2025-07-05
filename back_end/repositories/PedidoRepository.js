import Pedido from '../models/Pedido.js';
import Usuario from '../models/Usuario.js';
import Botica from '../models/Botica.js';
import MetodoPago from '../models/MetodoPago.js';
import DireccionUsuario from '../models/DireccionUsuario.js';
import DetallePedido from '../models/DetallePedido.js';
import Medicamento from '../models/Medicamento.js';

class PedidoRepository {
    async findAll() {
        try {
            return await Pedido.findAll({
                include: [
                    {
                        model: Usuario,
                        as: 'cliente'
                    },
                    {
                        model: Botica
                    },
                    {
                        model: MetodoPago
                    },
                    {
                        model: DireccionUsuario
                    },
                    {
                        model: Usuario,
                        as: 'repartidor'
                    },
                    {
                        model: DetallePedido,
                        include: [{
                            model: Medicamento
                        }]
                    }
                ]
            });
        } catch (error) {
            throw new Error(`Error al obtener todas los pedidos: ${error.message}`);
        }
    }

    async findById(id) {
        try {
            const pedido = await Pedido.findByPk(id, {
                include: [
                    {
                        model: Usuario,
                        as: 'cliente'
                    },
                    {
                        model: Botica
                    },
                    {
                        model: MetodoPago
                    },
                    {
                        model: DireccionUsuario
                    },
                    {
                        model: Usuario,
                        as: 'repartidor'
                    },
                    {
                        model: DetallePedido,
                        include: [{
                            model: Medicamento
                        }]
                    }
                ]
            });
            if (!pedido) {
                throw new Error('Pedido no encontrada');
            }
            return pedido;
        } catch (error) {
            throw new Error(`Error al obtener el pedido: ${error.message}`);
        }
    }

    async create(pedidoData) {
        try {
            return await Pedido.create(pedidoData);
        } catch (error) {
            throw new Error(`Error al crear el pedido: ${error.message}`);
        }
    }

    async update(id, pedidoData) {
        try {
            const pedido = await Pedido.findByPk(id);
            if (!pedido) {
                throw new Error('Pedido no encontrado');
            }
            const updatedPedido = await pedido.update(pedidoData);
            
            // Return the updated pedido with all relationships
            return await this.findById(id);
        } catch (error) {
            throw new Error(`Error al actualizar el pedido: ${error.message}`);
        }
    }

    async delete(id) {
        try {
            const pedido = await this.findById(id);
            await pedido.destroy();
            return true;
        } catch (error) {
            throw new Error(`Error al eliminar el pedido: ${error.message}`);
        }
    }

    async findByUsuarioId(usuarioId) {
        try {
            return await Pedido.findAll({
                where: { usuario_id: usuarioId },
                include: [
                    {
                        model: Usuario,
                        as: 'cliente'
                    },
                    {
                        model: Botica
                    },
                    {
                        model: MetodoPago
                    },
                    {
                        model: DireccionUsuario
                    },
                    {
                        model: Usuario,
                        as: 'repartidor'
                    },
                    {
                        model: DetallePedido,
                        include: [{
                            model: Medicamento
                        }]
                    }
                ],
                order: [['fecha_pedido', 'DESC']]
            });
        } catch (error) {
            console.error('Error en findByUsuarioId:', error);
            throw new Error(`Error al obtener los pedidos del usuario: ${error.message}`);
        }
    }

    async findByRepartidorId(repartidorId) {
        try {
            return await Pedido.findAll({
                where: { repartidor_id: repartidorId },
                include: [
                    {
                        model: Usuario,
                        as: 'cliente'
                    },
                    {
                        model: Botica
                    },
                    {
                        model: MetodoPago
                    },
                    {
                        model: DireccionUsuario
                    },
                    {
                        model: Usuario,
                        as: 'repartidor'
                    },
                    {
                        model: DetallePedido,
                        include: [{
                            model: Medicamento
                        }]
                    }
                ],
                order: [['fecha_pedido', 'DESC']]
            });
        } catch (error) {
            console.error('Error en findByRepartidorId:', error);
            throw new Error(`Error al obtener los pedidos del repartidor: ${error.message}`);
        }
    }
}

export default new PedidoRepository();
