import {DataTypes} from "sequelize";
import { Model } from "sequelize";
import connection from "../configs/connect_database.js";
import Pedido from "./Pedido.js";
import Medicamento from "./Medicamento.js";

class DetallePedido extends Model {}
DetallePedido.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        cantidad: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        precio_unitario: {
            type: DataTypes.REAL,
            allowNull: true
        },
        subtotal: {
            type: DataTypes.REAL,
            allowNull: true
            //generado automaticamente en la bd
        },
        pedido_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Pedido,
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
        }
    }, {
        sequelize: connection,
        modelName: "DetallePedido",
        tableName: "detalle_pedido",
        freezeTableName: true,
        timestamps: false
    }
);

Pedido.hasMany(DetallePedido, {foreignKey: "pedido_id"});
DetallePedido.belongsTo(Pedido, {foreignKey: "pedido_id"});
Medicamento.hasMany(DetallePedido, {foreignKey: "medicamento_id"});
//DetallePedido.hasMany(Medicamento, {foreignKey: "medicamento_id"});
DetallePedido.belongsTo(Medicamento, {foreignKey: "medicamento_id"});

export default DetallePedido;