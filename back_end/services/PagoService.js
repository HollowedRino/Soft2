import PagoRepository from '../repositories/PagoRepository.js';

class PagoService {
    async findAll() {
        try {
            return await PagoRepository.findAll();
        } catch (error) {
            throw new Error(`Error al obtener los pagos: ${error.message}`);
        }
    }

    async findById(id) {
        try {
            return await PagoRepository.findById(id);
        } catch (error) {
            throw new Error(`Error al obtener el pago: ${error.message}`);
        }
    }

    async create(pagoData) {
        try {
            // Validaciones
            this.validatePagoData(pagoData);
            return await PagoRepository.create(pagoData);
        } catch (error) {
            throw new Error(`Error en el servicio al crear el pago: ${error.message}`);
        }
    }

    async update(id, pagoData) {
        try {
            // Validaciones 
            this.validatePagoData(pagoData);
            return await PagoRepository.update(id, pagoData);
        } catch (error) {
            throw new Error(`Error en el servicio al actualizar el pago: ${error.message}`);
        }
    }

    async delete(id) {
        try {
            return await PagoRepository.delete(id);
        } catch (error) {
            throw new Error(`Error en el servicio al eliminar el pago: ${error.message}`);
        }
    }

    // Método privado para validaciones
    validatePagoData(pagoData) {
        const requiredFields = ['monto_total', 'fecha_pago', 'estado_pago', 'usuario_id', 'detalle_pedido_id', 'metodo_pago_id', 'cupon_id'];
        
        for (const field of requiredFields) {
            if (!pagoData[field]) {
                throw new Error(`El campo ${field} es requerido`);
            }
        }

        // Validar formato de fecha (DD-MM-YYYY)
        const dateRegex = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/;
        if (!dateRegex.test(pagoData.fecha_pago)) {
            throw new Error('La fecha debe tener el formato DD-MM-YYYY');
        }
    }
}

export default new PagoService(); 