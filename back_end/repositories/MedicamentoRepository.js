import Medicamento from '../models/Medicamento.js';
import InventarioBotica from '../models/InventarioBotica.js';
import Botica from '../models/Botica.js';
import Distrito from '../models/Distrito.js';
import { Op } from 'sequelize';
class MedicamentoRepository {
    async findAll() {
        try {
            return await Medicamento.findAll();
        } catch (error) {
            throw new Error(`Error al obtener todos los medicamentos: ${error.message}`);
        }
    }

    async findById(id) {
        try {
            return await Medicamento.findByPk(id);
        } catch (error) {
            throw new Error(`Error al obtener el medicamento: ${error.message}`);
        }
    }

    async findByIdPlus(id) {
        try {
            const medicamento = await Medicamento.findByPk(id, {
                attributes: [
                    "id",
                    "nombre",
                    "descripcion",
                    "fabricante",
                    "categoria",
                    "precio",
                    "requiere_receta",
                    "estado_medicamento",
                    "imagen_url"
                ],
                include: [
                    {
                        model: InventarioBotica,
                        attributes: ["cantidad_disponible", "fecha_actualizacion"],
                        include: [
                            {
                                model: Botica,
                                attributes: [
                                    "id",
                                    "nombre",
                                    "direccion",
                                    "telefono_botica",
                                    "horario_apertura",
                                    "horario_cierre"
                                ],
                                include: [
                                    {
                                        model: Distrito,
                                        attributes: ["id", "nombre_distrito"]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            });
            const { InventarioBoticas, ...medicamentoData } = medicamento.toJSON();

            const boticas = InventarioBoticas.map(inv => {
                const botica = inv.Botica;
                return {
                    id: botica.id,
                    nombre: botica.nombre,
                    direccion: botica.direccion,
                    telefono_botica: botica.telefono_botica,
                    horario_apertura: botica.horario_apertura,
                    horario_cierre: botica.horario_cierre,
                    distrito: botica.Distrito,
                    inventario: {
                        cantidad_disponible: inv.cantidad_disponible,
                        fecha_actualizacion: inv.fecha_actualizacion
                    }
                };
            });
            return {
                ...medicamentoData,
                boticas
            };
        } catch (error) {
            throw new Error(`Error al obtener detalles del medicamentoF: ${error.message}`);
        }
    }

    async findByCategoriaPlus(categoria) {
        try {
            
            const medicamentos = await Medicamento.findAll({
                where: { categoria: categoria },
                attributes: [
                    "id",
                    "nombre",
                    "descripcion",
                    "fabricante",
                    "categoria",
                    "precio",
                    "requiere_receta",
                    "estado_medicamento",
                    "imagen_url"
                ],
                include: [
                    {
                        model: InventarioBotica,
                        attributes: ["cantidad_disponible", "fecha_actualizacion"],
                        include: [
                            {
                                model: Botica,
                                attributes: [
                                    "id",
                                    "nombre",
                                    "direccion",
                                    "telefono_botica",
                                    "horario_apertura",
                                    "horario_cierre"
                                ],
                                include: [
                                    {
                                        model: Distrito,
                                        attributes: ["id", "nombre_distrito"]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            });

            // Mapear todos los medicamentos con su estructura enriquecida
            return medicamentos.map(medicamento => {
                const { InventarioBoticas, ...medicamentoData } = medicamento.toJSON();

                const boticas = InventarioBoticas.map(inv => {
                    const botica = inv.Botica;
                    return {
                        id: botica.id,
                        nombre: botica.nombre,
                        direccion: botica.direccion,
                        telefono_botica: botica.telefono_botica,
                        horario_apertura: botica.horario_apertura,
                        horario_cierre: botica.horario_cierre,
                        distrito: botica.Distrito,
                        inventario: {
                            cantidad_disponible: inv.cantidad_disponible,
                            fecha_actualizacion: inv.fecha_actualizacion
                        }
                    };
                });

                return {
                    ...medicamentoData,
                    boticas
                };
            });
        } catch (error) {
            throw new Error(`Error al obtener medicamentos por categoría: ${error.message}`);
        }
    }


    async findByNombreParcial(nombre) {
        try {
            const whereClause = nombre
                ? { nombre: { [Op.like]: `%${nombre}%` } }
                : undefined;

            const medicamentos = await Medicamento.findAll({
                where: whereClause,
                attributes: [
                    "id",
                    "nombre",
                    "descripcion",
                    "fabricante",
                    "categoria",
                    "precio",
                    "requiere_receta",
                    "estado_medicamento",
                    "imagen_url"
                ],
                include: [
                    {
                        model: InventarioBotica,
                        attributes: ["cantidad_disponible", "fecha_actualizacion"],
                        include: [
                            {
                                model: Botica,
                                attributes: [
                                    "id",
                                    "nombre",
                                    "direccion",
                                    "telefono_botica",
                                    "horario_apertura",
                                    "horario_cierre"
                                ],
                                include: [
                                    {
                                        model: Distrito,
                                        attributes: ["id", "nombre_distrito"]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            });

            if (!medicamentos || medicamentos.length === 0) {
                throw new Error("Medicamento no encontrado");
            }

            // Estructura estandarizada
            return medicamentos.map(medicamento => {
                const { InventarioBoticas, ...medicamentoData } = medicamento.toJSON();

                const boticas = InventarioBoticas.map(inv => {
                    const botica = inv.Botica;
                    return {
                        id: botica.id,
                        nombre: botica.nombre,
                        direccion: botica.direccion,
                        telefono_botica: botica.telefono_botica,
                        horario_apertura: botica.horario_apertura,
                        horario_cierre: botica.horario_cierre,
                        distrito: botica.Distrito,
                        inventario: {
                            cantidad_disponible: inv.cantidad_disponible,
                            fecha_actualizacion: inv.fecha_actualizacion
                        }
                    };
                });

                return {
                    ...medicamentoData,
                    boticas
                };
            });

        } catch (error) {
            throw new Error(`Error al buscar medicamentos por nombre: ${error.message}`);
        }
    }

    async findAllWithDetalle() { 
        try {
            const medicamentos = await Medicamento.findAll({
                attributes: [
                    "id",
                    "nombre",
                    "descripcion",
                    "fabricante",
                    "categoria",
                    "precio",
                    "requiere_receta",
                    "estado_medicamento",
                    "imagen_url"
                ],
                include: [
                    {
                        model: InventarioBotica,
                        attributes: ["cantidad_disponible", "fecha_actualizacion"],
                        include: [
                            {
                                model: Botica,
                                attributes: [
                                    "id",
                                    "nombre",
                                    "direccion",
                                    "telefono_botica",
                                    "horario_apertura",
                                    "horario_cierre"
                                ],
                                include: [
                                    {
                                        model: Distrito,
                                        attributes: ["id", "nombre_distrito"]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            });

            if (!medicamentos || medicamentos.length === 0) {
                throw new Error("No hay medicamentos disponibles");
            }

            // Mismo formato que findByCategoriaPlus
            return medicamentos.map(medicamento => {
                const { InventarioBoticas, ...medicamentoData } = medicamento.toJSON();

                const boticas = InventarioBoticas.map(inv => {
                    const botica = inv.Botica;
                    return {
                        id: botica.id,
                        nombre: botica.nombre,
                        direccion: botica.direccion,
                        telefono_botica: botica.telefono_botica,
                        horario_apertura: botica.horario_apertura,
                        horario_cierre: botica.horario_cierre,
                        distrito: botica.Distrito,
                        inventario: {
                            cantidad_disponible: inv.cantidad_disponible,
                            fecha_actualizacion: inv.fecha_actualizacion
                        }
                    };
                });

                return {
                    ...medicamentoData,
                    boticas
                };
            });

        } catch (error) {
            throw new Error(`Error al obtener medicamentos con detalle: ${error.message}`);
        }
    }

    // Para el chatbot
    async findByNombre(nombreParcial) {
        try {
            const medicamento = await Medicamento.findOne({
            where: {
                nombre: {
                [Op.like]: `%${nombreParcial}%`
                }
            },
            attributes: [
                "id",
                "nombre",
                "descripcion",
                "fabricante",
                "categoria",
                "precio",
                "requiere_receta",
                "estado_medicamento",
                "imagen_url"
            ],
            include: [
                {
                model: InventarioBotica,
                attributes: ["cantidad_disponible", "fecha_actualizacion"],
                include: [
                    {
                    model: Botica,
                    attributes: [
                        "id",
                        "nombre",
                        "direccion",
                        "telefono_botica",
                        "horario_apertura",
                        "horario_cierre"
                    ],
                    include: [
                        {
                        model: Distrito,
                        attributes: ["id", "nombre_distrito"]
                        }
                    ]
                    }
                ]
                }
            ]
            });

            if (!medicamento) {
            return null; // o lanzar un error si prefieres
            }

            const { InventarioBoticas, ...medicamentoData } = medicamento.toJSON();

            const boticas = InventarioBoticas.map(inv => {
                const botica = inv.Botica;
                return {
                    id: botica.id,
                    nombre: botica.nombre,
                    direccion: botica.direccion,
                    telefono_botica: botica.telefono_botica,
                    horario_apertura: botica.horario_apertura,
                    horario_cierre: botica.horario_cierre,
                    distrito: botica.Distrito,
                    inventario: {
                    cantidad_disponible: inv.cantidad_disponible,
                    fecha_actualizacion: inv.fecha_actualizacion
                    }
                };
            });

            // boticasJson = boticas.map(botica => botica.toJSON())

            return {
            ...medicamentoData,
            boticas
            };
        } catch (error) {
            throw new Error(`Error al buscar medicamento por nombre: ${error.message}`);
        }
    }

    async create(medicamento) {
        try {
            return await Medicamento.create(medicamento);
        } catch (error) {
            throw new Error(`Error al crear el medicamento: ${error.message}`);
        }
    }

    async update(id, medicamento) {
        try {
            const medicamento = await this.findById(id);
            return await medicamento.update(medicamento);
        } catch (error) {
            throw new Error(`Error al actualizar el medicamento: ${error.message}`);
        }
    }

    async delete(id) {
        try {
            const medicamento = await this.findById(id);
            await medicamento.destroy();
            return true;
        } catch (error) {
            throw new Error(`Error al eliminar el medicamento: ${error.message}`);
        }
    }

    async findDisponibles() {
        try {
            // Devuelve solo medicamentos que están en inventario de alguna botica
            return await Medicamento.findAll({
                include: [{
                    model: InventarioBotica,
                    required: true, // Solo los que tienen inventario
                }]
            });
        } catch (error) {
            throw new Error(`Error al obtener medicamentos disponibles: ${error.message}`);
        }
    }
}

export default new MedicamentoRepository();
