import {DataTypes} from "sequelize";
import { Model } from "sequelize";
import connection from "../configs/connect_database.js";
import Usuario from "./Usuario.js";
import DetallePedido from "./DetallePedido.js";
import MetodoPago from "./MetodoPago.js";
import Cupon from "./Cupon.js";

class Pago extends Model {}
Pago.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        monto_total: {
            type: DataTypes.REAL,
            allowNull: false
        },
        fecha_pago: {
            type: DataTypes.DATE,
            allowNull: false
        },
        estado_pago: {
            type: DataTypes.STRING,
            allowNull: false
        },
        usuario_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Usuario,
                key: "id"
            },
            onDelete: "CASCADE"
        },
        detalle_pedido_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: DetallePedido,
                key: "id"
            },
            onDelete: "CASCADE"
        },
        metodo_pago_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: MetodoPago,
                key: "id"
            },
            onDelete: "CASCADE"
        },
        cupon_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Cupon,
                key: "id"
            },
            onDelete: "CASCADE"
        }
    }, {
        sequelize: connection,
        modelName: "Pago",
        freezeTableName: true,
        timestamps: false
    }
);

Usuario.hasMany(Pago, {foreignKey: "usuario_id"});
Pago.belongsTo(Usuario, {foreignKey: "usuario_id"});
DetallePedido.hasMany(Pago, {foreignKey: "detalle_pedido_id"});
Pago.belongsTo(DetallePedido, {foreignKey: "detalle_pedido_id"});
MetodoPago.hasMany(Pago, {foreignKey: "metodo_pago_id"});
Pago.belongsTo(MetodoPago, {foreignKey: "metodo_pago_id"});
Cupon.hasMany(Pago, {foreignKey: "cupon_id"});
Pago.hasMany(Cupon, {foreignKey: "cupon_id"});