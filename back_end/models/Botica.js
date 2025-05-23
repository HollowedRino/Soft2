import {DataTypes} from "sequelize";
import { Model } from "sequelize";
import connection from "../configs/connect_database.js";
import Distrito from "./Distrito.js";
class Botica extends Model {}
Botica.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        direccion: {
            type: DataTypes.STRING,
            allowNull: false
        },
        telefono_botica: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        horario_apertura: {
            type: DataTypes.STRING,
            allowNull: false
        },
        horario_cierre: {
            type: DataTypes.STRING,
            allowNull: false
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
        modelName: "Botica",
        freezeTableName: true,
        timestamps: false
    }
);

Distrito.hasMany(Botica, {foreignKey: "distrito_id"});
Botica.belongsTo(Distrito, {foreignKey: "distrito_id"});

export default Botica;