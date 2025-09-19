import { Sequelize } from "sequelize";

export const conn = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite"
});

  