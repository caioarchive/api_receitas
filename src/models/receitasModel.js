import { DataTypes } from 'sequelize';
import { conn } from '../config/sequelize.js'; 

const receitaModel = conn.define(
  'receitas',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descricao: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ingredientes: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    modoPreparo: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    tempoPreparo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    porcoes: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dificuldade: {
      type: DataTypes.STRING,
      allowNull: false,
    },
        imagemPrato:{
        type: DataTypes.STRING,
        defaultValue: 'filename'
    },
    imagem_url:{
        type: DataTypes.STRING,
        defaultValue: 'caminhoDaImagem'
    }
  },
  {
    tableName: 'receitas',
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  }
);

export default receitaModel;
