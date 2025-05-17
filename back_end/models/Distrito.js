import {DataTypes} from "sequelize";
import connection from "../configs/connect_database.js";

const Distrito = connection.define(
    "Distrito", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre_distrito: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },{
        freezeTableName: true, //Nose para que es
        timestamps: false
    }
);

export default Distrito;