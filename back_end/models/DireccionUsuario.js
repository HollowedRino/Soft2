import {DataTypes} from "sequelize";
import connection from "../configs/connect_database.js";
import Usuario from "./Usuario.js";
import Distrito from "./Distrito.js";

const DireccionUsuario = connection.define(
    "DireccionUsuario", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        direccion: {
            type: DataTypes.STRING,
            allowNull: false
        },
        alias: {
            type: DataTypes.STRING,
            allowNull: false
        },
        usuario_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Usuario,
                key: "id"
            },
            onDelete: "CASCADE"
        },
        distrito_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Distrito,
                key: "id"
            },
            onDelete: "CASCADE"
        }
    }, {
        freezeTableName: true,
        timestamps: false
    }
);

Usuario.hasMany(DireccionUsuario, {foreignKey: "usuario_id"});
DireccionUsuario.belongsTo(Usuario, {foreignKey: "usuario_id"});

Distrito.hasMany(DireccionUsuario, {foreignKey: "distrito_id"});
DireccionUsuario.belongsTo(Distrito, {foreignKey: "distrito_id"});

export default DireccionUsuario;