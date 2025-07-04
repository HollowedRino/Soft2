import MedicamentoService from "../services/MedicamentoService.js";

class MedicamentoController {
    async findAll(req, res) {
        try {
            const medicamentos = await MedicamentoService.findAll();
            res.status(200).json(medicamentos);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async findById(req, res) {
        try {
            const medicamento = await MedicamentoService.findById(req.params.id);
            res.status(200).json(medicamento);
        } catch (error) {
            if (error.message === 'Medicamento no encontrado') {
                res.status(404).json({ error: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }

    async findByIdPlus(req,res) {
        try {
            const detalles = await MedicamentoService.findByIdPlus(req.params.id);
            res.status(200).json(detalles);
        } catch (error) {
            if (error.message === 'Medicamento por Id no encontrado') {
                res.status(404).json({error: error.message});
            } else {
                res.status(500).json({error: error.message});
            }
        }
    }

    async findByCategoriaPlus(req,res) {
        try {
            const detalles = await MedicamentoService.findByCategoriaPlus(req.params.categoria);
            res.status(200).json(detalles);
        } catch (error) {
            if (error.message === 'Medicamentos por categorias no encontrado') {
                res.status(404).json({error: error.message});
            } else {
                res.status(500).json({error: error.message});
            }
        }
    }

    async findByNombreParcial(req, res) {
        try {
          const detalles = await MedicamentoService.findByNombreParcial(req.params.nombre);
          res.status(200).json(detalles);
        } catch (error) {
          if (error.message === 'Medicamento no encontrado') {
            res.status(404).json({error: error.message});
          } else {
            res.status(500).json({error: error.message});
          }
        }
      }

    async findAllWithDetalle(req, res) {
        try {
          const detalles = await MedicamentoService.findAllWithDetalle();
          res.status(200).json(detalles);
        } catch (error) {
          if (error.message === 'Medicamentos no encontrado') {
            res.status(404).json({error: error.message});
          } else {
            res.status(500).json({error: error.message});
          }
        }
      }

    async create(req, res) {
        try {
            const medicamento = await MedicamentoService.create(req.body);
            res.status(201).json(medicamento);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async update(req, res) {
        try {
            const medicamento = await MedicamentoService.update(req.params.id, req.body);
            res.status(200).json(medicamento);
        } catch (error) {
            if (error.message === 'Medicamento no encontrado') {
                res.status(404).json({ error: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }

    async delete(req, res) {
        try {
            await MedicamentoService.delete(req.params.id);
            res.status(204).send();
        } catch (error) {
            if (error.message === 'Medicamento no encontrado') {
                res.status(404).json({ error: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }

    async findDisponibles(req, res) {
        try {
            const medicamentos = await MedicamentoService.findDisponibles();
            res.status(200).json(medicamentos);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default new MedicamentoController();