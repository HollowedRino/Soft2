import {DataTypes} from "sequelize";
import { Model } from "sequelize";
import connection from "../configs/connect_database.js";
import Carrito from "./Carrito.js";
import Medicamento from "./Medicamento.js";

class ItemCarrito extends Model {}
ItemCarrito.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        carrito_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Carrito,
                key: "id"
            },
            onDelete: "CASCADE"
        },
        medicamento_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Medicamento,
                key: "id"
            },
            onDelete: "CASCADE"
        },
        cantidad: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        sequelize: connection,
        modelName: "ItemCarrito",
        freezeTableName: true,
        timestamps: false
    }
);

Carrito.hasMany(ItemCarrito, {foreignKey: "carrito_id"});
ItemCarrito.belongsTo(Carrito, {foreignKey: "carrito_id"});
Medicamento.hasMany(ItemCarrito, {foreignKey: "medicamento_id"});
ItemCarrito.belongsTo(Medicamento, {foreignKey: "medicamento_id"});
