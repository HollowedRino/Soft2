import {DataTypes} from "sequelize";
import connection from "../configs/connect_database.js";

const MetodoPago = connection.define(
    "MetodoPago", {
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
        freezeTableName: true, //Nose para que es
        timestamps: false
    }
);

export default MetodoPago;