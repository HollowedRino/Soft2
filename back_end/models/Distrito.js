import {DataTypes} from "sequelize";
import {sequelize} from "../configs/connect_database.js";

const Distrito = sequelize.define(
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
        freezeTableName: true //Nose para que es
    }
);

export default Distrito;