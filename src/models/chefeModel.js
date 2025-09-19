import { DataTypes } from "sequelize";
import { conn } from "../config/sequelize.js";

const chefeModel = conn.define(
  "chefes",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    biografia: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    especialidade: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    experiencia: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    nacionalidade: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "chefes",
    timestamps: true,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
  }
);

export default chefeModel;



