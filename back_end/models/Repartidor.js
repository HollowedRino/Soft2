import {DataTypes} from "sequelize";
import { Model } from "sequelize";
import connection from "../configs/connect_database.js";

class Repartidor extends Model {}
Repartidor.init(
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
        numero: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        sequelize: connection,
        modelName: "Repartidor",
        freezeTableName: true,
        timestamps: false
    }
);

export default Repartidor;