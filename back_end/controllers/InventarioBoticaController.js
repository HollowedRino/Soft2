import InventarioBoticaService from '../services/InventarioBoticaService.js';
import Medicamento from '../models/Medicamento.js';

class InventarioBoticaController {
    async findAll(req, res) {
        try {
            const inventariosBotica = await InventarioBoticaService.findAll();
            res.json(inventariosBotica);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async findById(req, res) {
        try {
            const { id } = req.params;
            const inventarioBotica = await InventarioBoticaService.findById(id);
            res.json(inventarioBotica);
        } catch (error) {
            if (error.message === 'Inventario de la botica no encontrado') {
                res.status(404).json({ error: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }

    async create(req, res) {
    try {
        let medicamentoId = req.body.medicamento_id;

        if (!medicamentoId && req.body.nombre) {
            let medicamento = await Medicamento.findOne({ where: { nombre: req.body.nombre } });
            if (!medicamento) {
                medicamento = await Medicamento.create({
                    nombre: req.body.nombre,
                    descripcion: req.body.descripcion,
                    categoria: req.body.categoria,
                    fabricante: req.body.fabricante,
                    precio: req.body.precio,
                    requiere_receta: req.body.requiere_receta,
                    estado_medicamento: req.body.estado_medicamento,
                    imagen_url: req.body.imagen_url,
                });
            }
            medicamentoId = medicamento.id; 
        }

        const inventarioBotica = await InventarioBoticaService.create({
            botica_id: req.body.botica_id,
            medicamento_id: medicamentoId,
            cantidad_disponible: req.body.cantidad_disponible,
        });

        res.status(201).json(inventarioBotica);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async update(req, res) {
        try {
            const inventarioBotica = await InventarioBoticaService.update(req.params.id, req.body);
            res.status(200).json(inventarioBotica);
        } catch (error) {
            if (error.message === 'Inventario de la botica no encontrado') {
                res.status(404).json({ error: error.message });
            } else {
                res.status(400).json({ error: error.message });
            }
        }
    }

    async delete(req, res) {
        try {
            await InventarioBoticaService.delete(req.params.id);
            res.status(204).send();
        } catch (error) {
            if (error.message === 'Inventario de la botica no encontrado') {
                res.status(404).json({ error: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }



    async findByBoticaId(req, res) {
    try {
        const { boticaId } = req.params;
        const inventario = await InventarioBoticaService.findByBoticaId(boticaId);
        res.json(inventario);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

    

}

export default new InventarioBoticaController();
