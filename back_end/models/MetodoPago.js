import {DataTypes} from "sequelize";
import {sequelize} from "../configs/connect_database.js";

const MetodoPago = sequelize.define(
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
        freezeTableName: true //Nose para que es
    }
);

export default MetodoPago;