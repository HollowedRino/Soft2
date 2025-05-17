import {DataTypes} from "sequelize";
import connection from "../configs/connect_database.js";

const Repartidor = connection.define(
    "Repartidor", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        numero: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        freezeTableName: true,
        timestamps: false
    }
);

export default Repartidor;