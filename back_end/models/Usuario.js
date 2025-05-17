import {DataTypes} from "sequelize";
import {sequelize} from "../configs/connect_database.js";

const Usuario = sequelize.define(
    "Usuario", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        appellido: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        contrasena: {
            type: DataTypes.STRING,
            allowNull: false
        },
        telefono_usuario: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        estado: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        freezeTableName: true
    }
);

export default Usuario;