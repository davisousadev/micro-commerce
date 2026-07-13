import { DataTypes } from "sequelize";
import { sequelize } from "../config/database";

export const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  produtoId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  quantidade: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  precoTotal: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'PAGO'
  }
});