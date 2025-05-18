import {DataTypes} from "sequelize";
import { Model } from "sequelize";
import connection from "../configs/connect_database.js";
import Usuario from "./Usuario.js";

class Carrito extends Model {}
Carrito.init(
    {
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
    },
    {
        sequelize: connection,
        modelName: "Carrito",
        freezeTableName: true,
        timestamps: false
    }
);

Usuario.hasMany(Carrito, {foreignKey: "usuario_id"});
Carrito.belongsTo(Carrito, {foreignKey: "usuario_id"});

export default Carrito;