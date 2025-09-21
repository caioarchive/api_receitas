import { DataTypes } from "sequelize";
import { conn } from "../config/sequelize.js";

const ReceitasFavoritasModel = conn.define(
  "favoritosReceitas",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    usuarioId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    receitaId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    dataAdicionada: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    categoria: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    observacoes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    prioridade: {
      type: DataTypes.ENUM("baixa", "media", "alta"),
      allowNull: false,
      defaultValue: "media",
    },
    tentativasPreparo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    tableName: "favoritosReceitas",
    timestamps: true,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
  }
);

export default ReceitasFavoritasModel;






