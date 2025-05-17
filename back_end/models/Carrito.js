import {DataTypes} from "sequelize";
import {sequelize} from "../configs/connect_database.js";

const Carrito = sequelize.define(
    "Carrito", {
        id: {
            type: DataTypes,
            primaryKey: true,
            autoIncrement: true
        },
        usuario_id: {
            type: DataTypes,
            allowNull: false,
            references: {
                model: Usuario,
                key: "id"
            },
            onDelete: "CASCADE"
        },
        fecha_actualizacion: {
            type: DataTypes.TIME,
            allowNull: false
        }
    }
);

Usuario.hasMany(Carrito, {foreignKey: "usuario_id"});
Carrito.belongsTo(Carrito, {foreignKey: "usuario_id"});

export default Carrito;