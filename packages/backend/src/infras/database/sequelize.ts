import { Sequelize } from "sequelize-typescript";
import config from "./config";

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
import Tenants from "../../applications/models/tenants.model";
import TenantBills from "../../applications/models/tenant_bills.model";
import UserTenants from "../../applications/models/user_tenants.model";
import Packages from "../../applications/models/packages.model";

const sequelize = new Sequelize(config);
sequelize.addModels([
    Roles, Users, Branches,
    Menus, RoleMenus, Packages,
    UserProfiles, UserBranches, UserRoles, UserTenants,
    Customers, Vouchers, VoucherCodes,
    ProductCategories, Products,
    StockMovements, Purchases, PurchaseItems,
    Orders, OrderItems, OrderVouchers,
    Tenants, TenantBills,
    Logs
]);

/**
 * Below here is the weird rule for initiating foreign_key
 * Specifically for backfowrad process, e.g children -> join to parent
 * Other wise for case parent -> join to children, it can be handled using @BelongsTo() in model files
 * 
 * @date 2025-02-27
 */
Users.hasOne(UserProfiles, { foreignKey: "user_id" });
Users.hasOne(UserRoles, { foreignKey: "user_id" });
Users.hasOne(UserTenants, { foreignKey: "user_id" });
Users.hasOne(UserBranches, { foreignKey: "user_id" });

export default sequelize;

export const ensureConnection = async () => {
    try {
        await sequelize.authenticate();
    } catch (error) {
        console.error(new Date(), "Unable to connect to the database:", error);
    }
}