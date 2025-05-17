import {DataTypes} from "sequelize";
import { Model } from "sequelize";
import connection from "../configs/connect_database.js";

class Cupon extends Model {}
Cupon.init(
    {
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
        sequelize: connection,
        modelName: "Cupon",
        freezeTableName: true,
        timestamps: false
    }
);

export default Cupon;