import { Sequelize } from "sequelize-typescript";
import config from "./config";

const sequelize = new Sequelize({
    ...config,
    models: [],
    logging: false
});

export default sequelize;