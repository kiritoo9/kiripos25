import sequelize from "./sequelize";

/**
 * Import necessary seeders
 */
import { create as createRole } from "./seeders/roles";
import { create as createBranch } from "./seeders/branches";
import { create as createMenu } from "./seeders/menus";
import { create as createUser } from "./seeders/users";

async function syncModels() {
    try {
        // this options to alter table whenever there is an update
        await sequelize.sync({
            force: false,
            alter: true
        });

        // start to perform seeder operation
        const branchResponse = await createBranch();
        const roleResponse = await createRole();
        await createMenu(roleResponse);
        await createUser(branchResponse, roleResponse);

        // stop process with no error
        console.info(new Date(), `Database is successfully migrated`);
        process.exit(0);
    } catch (error: any) {
        console.error(`Error while migrating database: `, error);
        process.exit(1);
    }
}
syncModels();