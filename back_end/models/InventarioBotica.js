import {DataTypes} from "sequelize";
import { Model } from "sequelize";
import connection from "../configs/connect_database.js";
import Botica from "./Botica.js";
import Medicamento from "./Medicamento.js";

class InventarioBotica extends Model {}
InventarioBotica.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        cantidad_disponible: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        fecha_actualizacion: {
            type: DataTypes.DATE,
            allowNull: false
        },
        botica_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Botica,
                key: "id"
            },
            onDelete: "CASCADE"
        },
        medicamento_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Medicamento,
                key: "id"
            },
            onDelete: "CASCADE"
        }
    }, {
        sequelize: connection,
        modelName: "InventarioBotica",
        freezeTableName: true,
        indexes: [
            {
                unique: true,
                fields: ["botica_id","medicamento_id"]
            }
        ],
        timestamps: false
    }
);

Botica.hasMany(InventarioBotica, {foreignKey: "botica_id"});
InventarioBotica.belongsTo(Botica,{foreignKey: "botica_id"});

Medicamento.hasMany(InventarioBotica, {foreignKey: "medicamento_id"});
InventarioBotica.belongsTo(Medicamento, {foreignKey: "medicamento_id"});

export default InventarioBotica;