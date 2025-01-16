import { Sequelize } from "sequelize-typescript";
import config from "./config";
import User from "../../applications/models/user.model";

const sequelize = new Sequelize(config);
sequelize.addModels([
    User
]);

async function syncModels() {
    try {
        await sequelize.sync({ 
            force: false,
            alter: true
        });
        console.info(new Date(), `Database is successfully migrated`);
    } catch (error: any) {
        console.error(`Error while migrating database: `, error);
    }
}
syncModels();