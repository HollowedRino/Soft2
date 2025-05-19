import {DataTypes} from "sequelize";
import { Model } from "sequelize";
import connection from "../configs/connect_database.js";

class MetodoPago extends Model {}
MetodoPago.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre_metodo_pago: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },{
        sequelize: connection,
        modelName: "MetodoPago",
        tableName: "metodo_pago",
        freezeTableName: true,
        timestamps: false
    }
);

export default MetodoPago;