import type { SequelizeOptions } from "sequelize-typescript";
import ENV from "../environ";

const config: SequelizeOptions = {
    username: ENV.DB_USER,
    password: ENV.DB_PASS,
    database: ENV.DB_NAME,
    host: ENV.DB_HOST,
    port: ENV.DB_PORT,
    dialect: "postgres",
    logging: false
}

export default config;