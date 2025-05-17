import {DataTypes} from "sequelize";
import connection from "../configs/connect_database.js";

const Medicamento = connection.define(
    "Medicamento", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        descripcion: {
            type: DataTypes.STRING,
            allowNull: false
        },
        fabricante: {
            type: DataTypes.STRING,
            allowNull: false
        },
        precio: {
            type: DataTypes.REAL,
            allowNull: false
        },
        requiere_receta: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        estado_medicamento: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        imagen_url: {
            type: DataTypes.TEXT,
        }
    },{
        freezeTableName: true,
        timestamps: false
    }
);

export default Cupon;