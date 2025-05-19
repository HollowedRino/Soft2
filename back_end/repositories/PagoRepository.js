import Pago from '../models/Pago.js';

class PagoRepository {
    async findAll() {
        try {
            return await Pago.findAll({
                include: ['Usuario','DetallePedido', 'MetodoPago', 'Cupon']
            });
        } catch (error) {
            throw new Error(`Error al obtener todos los pagos: ${error.message}`);
        }
    }

    async findById(id) {
        try {
            const pago = await Pago.findByPk(id, {
                include: ['Usuario','DetallePedido', 'MetodoPago', 'Cupon']
            });
            if (!pago) {
                throw new Error('Pago no encontrado');
            }
            return pago;
        } catch (error) {
            throw new Error(`Error al obtener el pago: ${error.message}`);
        }
    }

    async create(pago) {
        try {
            return await Pago.create(pago);
        } catch (error) {
            throw new Error(`Error al crear el pago: ${error.message}`);
        }
    }

    async update(id, pago) {
        try {
            const pago = await this.findById(id);
            return await pago.update(pago);
        } catch (error) {
            throw new Error(`Error al actualizar el pago: ${error.message}`);
        }
    }

    async delete(id) {
        try {
            const pago = await this.findById(id);
            await pago.destroy();
            return true;
        } catch (error) {
            throw new Error(`Error al eliminar el pago: ${error.message}`);
        }
    }
}

export default new PagoRepository();
