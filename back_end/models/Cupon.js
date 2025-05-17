import {DataTypes} from "sequelize";
import connection from "../configs/connect_database.js";

const Cupon = connection.define(
    "Cupon", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        codigo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        descripcion: {
            type: DataTypes.STRING,
            allowNull: false
        },
        descuento: {
            type: DataTypes.REAL,
            allowNull: false
        }
    },{
        freezeTableName: true, //Nose para que es
        timestamps: false
    }
);

export default Cupon;