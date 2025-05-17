import {DataTypes} from "sequelize";
import { Model } from "sequelize";
import connection from "../configs/connect_database.js";

class Distrito extends Model {}
Distrito.init(
    {
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
        sequelize: connection,
        modelName: "Distrito",
        freezeTableName: true,
        timestamps: false
    }
);

export default Distrito;