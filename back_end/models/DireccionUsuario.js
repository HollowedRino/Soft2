import {DataTypes} from "sequelize";
import { Model } from "sequelize";
import connection from "../configs/connect_database.js";
import Usuario from "./Usuario.js";
import Distrito from "./Distrito.js";

class DireccionUsuario extends Model {}
DireccionUsuario.init(
    {
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
        sequelize: connection,
        modelName: "DireccionUsuario",
        tableName: "direccion_usuario",
        freezeTableName: true,
        timestamps: false,
        underscored: true
    }
);

Usuario.hasMany(DireccionUsuario, {foreignKey: "usuario_id"});
DireccionUsuario.belongsTo(Usuario, {foreignKey: "usuario_id"});

Distrito.hasMany(DireccionUsuario, {foreignKey: "distrito_id"});
DireccionUsuario.belongsTo(Distrito, {foreignKey: "distrito_id"});

export default DireccionUsuario;