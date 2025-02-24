import { Sequelize } from "sequelize-typescript";
import config from "./config";

/**
 * Import necessary seeders
 */
import { create as createRole } from "./seeders/roles";
import { create as createBranch } from "./seeders/branches";
import { create as createMenu } from "./seeders/menus";

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
import UserProfiles from "../../applications/models/user_profiles.model";
import UserBranches from "../../applications/models/user_branches.model";
import UserRoles from "../../applications/models/user_roles_model";
import Customers from "../../applications/models/customers.model";
import Vouchers from "../../applications/models/vouchers.model";
import VoucherCodes from "../../applications/models/voucher_codes.model";
import ProductCategories from "../../applications/models/product_categories.model";
import Products from "../../applications/models/products.model";
import StockMovements from "../../applications/models/stock_movements.model";
import Purchases from "../../applications/models/purchases.model";
import PurchaseItems from "../../applications/models/purchase_items.model";
import Orders from "../../applications/models/orders.model";
import OrderItems from "../../applications/models/order_items.model";
import OrderVouchers from "../../applications/models/order_vouchers.model";
import Logs from "../../applications/models/logs.model";

const sequelize = new Sequelize(config);
sequelize.addModels([
    Roles, Users, Branches,
    Menus, RoleMenus,
    UserProfiles, UserBranches, UserRoles,
    Customers, Vouchers, VoucherCodes,
    ProductCategories, Products,
    StockMovements, Purchases, PurchaseItems,
    Orders, OrderItems, OrderVouchers,
    Logs
]);

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

        // stop process with no error
        console.info(new Date(), `Database is successfully migrated`);
        process.exit(0);
    } catch (error: any) {
        console.error(`Error while migrating database: `, error);
        process.exit(1);
    }
}
syncModels();