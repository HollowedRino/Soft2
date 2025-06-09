import {DataTypes} from "sequelize";
import { Model } from "sequelize";
import Chat from "./Chat.js";
import Usuario from "./Usuario.js";
import connection from "../configs/connect_database.js";

class Mensaje extends Model {}
Mensaje.init(
    {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    chat_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    emisor_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    texto: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  },
  {
    sequelize: connection,
    modelName: "Mensaje",
    tableName: "mensajes",
    timestamps: true
  }
);

Chat.hasMany(Mensaje, { foreignKey: "chat_id" });
Mensaje.belongsTo(Chat, { foreignKey: "chat_id" });

Usuario.hasMany(Mensaje, { foreignKey: "emisor_id" });
Mensaje.belongsTo(Usuario, { foreignKey: "emisor_id" });

export default Mensaje;
