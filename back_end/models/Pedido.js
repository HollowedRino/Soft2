import {DataTypes} from "sequelize";
import { Model } from "sequelize";
import connection from "../configs/connect_database.js";
import Usuario from "./Usuario.js";
import Botica from "./Botica.js";
import MetodoPago from "./MetodoPago.js";
import DireccionUsuario from "./DireccionUsuario.js";
import Repartidor from "./Repartidor.js";
//import { FOREIGNKEYS } from "sequelize/lib/query-types";

class Pedido extends Model {}
Pedido.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        fecha_pedido: {
            type: DataTypes.DATE,
            allowNull: false
        },
        estado_pedido: {
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
        botica_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Botica,
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
        direccion_usuario_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: DireccionUsuario,
                key: "id"
            },
            onDelete: "CASCADE"
        },
        repartidor_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Repartidor,
                key: "id"
            },
            onDelete: "CASCADE"
        }
    }, {
        sequelize: connection,
        modelName: "Pedido",
        freezeTableName: true,
        timestamps: false
    }
);

Usuario.hasMany(Pedido, {foreignKey: "usuario_id"});
Pedido.belongsTo(Usuario, {foreignKey: "usuario_id"});
Botica.hasMany(Pedido, {foreignKey: "botica_id"});
Pedido.belongsTo(Botica, {foreignKey: "botica_id"});
MetodoPago.hasMany(Pedido, {foreignKey: "metodo_pago_id"});
Pedido.belongsTo(MetodoPago, {foreignKey: "metodo_pago_id"});
DireccionUsuario.hasMany(Pedido, {foreignKey: "direccion_usuario_id"});
Pedido.belongsTo(DireccionUsuario, {foreignKey: "direccion_usuario_id"});
Repartidor.hasMany(Pedido, {foreignKey: "repartidor_id"});
Pedido.belongsTo(Repartidor, {foreignKey: "repartidor_id"});


export default Pedido;