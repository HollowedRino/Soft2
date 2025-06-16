import {DataTypes} from "sequelize";
import { Model } from "sequelize";
import Pedido from "./Pedido.js";
import connection from "../configs/connect_database.js";

class Chat extends Model {}
Chat.init(
    {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    pedido_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    estado: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "activo"
    }
  },
  {
    sequelize: connection,
    modelName: "Chat",
    tableName: "chat",
    timestamps: true
  }
);

Pedido.hasOne(Chat, { foreignKey: "pedido_id" });
Chat.belongsTo(Pedido, { foreignKey: "pedido_id" });

export default Chat;