import {DataTypes} from "sequelize";
import {sequelize} from "../configs/connect_database.js";

const Repartidor = sequelize.define(
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
        freezeTableName: true
    }
);

export default Repartidor;