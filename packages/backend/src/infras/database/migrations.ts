import { Sequelize } from "sequelize-typescript";
import config from "./config";

/**
 * Import necessary seeders
 */
import { insertRole } from "./seeders/roles";

/**
 * You need to import all models here for migartions
 * You can actually make it dynamic, but there is pro cons you need to consider
 * Timeline for instance
 */
import Roles from "../../applications/models/roles.model";
import Users from "../../applications/models/users.model";
import Branches from "../../applications/models/branches.model";
import Menus from "../../applications/models/menus.model";
import RoleMenus from "../../applications/models/role_menus.model";

const sequelize = new Sequelize(config);
sequelize.addModels([
    Roles, Users, Branches,
    Menus, RoleMenus
]);

async function syncModels() {
    try {
        await sequelize.sync({
            force: false,
            alter: true
        });

        // start to perform seeder operation
        await insertRole();

        // stop process with no error
        console.info(new Date(), `Database is successfully migrated`);
        process.exit(0);
    } catch (error: any) {
        console.error(`Error while migrating database: `, error);
        process.exit(1);
    }
}
syncModels();