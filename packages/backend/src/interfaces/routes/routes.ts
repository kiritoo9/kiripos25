import { Router, type Request, type Response, type NextFunction } from "express";

import type { IoResponseSchema } from "../schemas/io-response.schema";
import response from "../../utils/response";
import ENV from "../../infras/environ";
import verifyBearerToken from "../middlewares/verify";
import privateRoute from "../middlewares/private";

// import all routes available
import authRoute from "./auth/auth.route";
import tenantRoute from "./masters/tenants/tenant.route";
import roleRoute from "./masters/roles/role.route";
import branchRoute from "./masters/branches/branch.route";
import userRoute from "./masters/users/user.route";
import menuRoute from "./masters/menus/menu.route";
import roleMenuRoute from "./masters/role_menus/role_menu.route";
import tableRoute from "./masters/tables/table.route";
import customerRoute from "./masters/customers/customer.route";
import productCategoryRoute from "./masters/product_categories/product_category.route";
import productRoute from "./masters/products/product.route";

// define necessary global function or variables
const router = Router();
const asyncHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
    // this function will handle promise response from middleware
    // default response must be <void>
    // since using async-await, the response changed into Promise<void> so this handler is required
    Promise.resolve(fn(req, res, next)).catch(next);
};

// welcome route
router.get("/", (_: Request, res: Response) => {
    const data: IoResponseSchema = {
        code: 200,
        message: "Welcome sir, this is great start for you!",
        data: {
            name: ENV.APP_NAME,
            version: ENV.APP_VER
        }
    } // [optional] define response using model for best practice
    return response(res, data);
});

// define route for authentication
router.use("/auth", authRoute);

// define routes for master
router.use("/tenants", asyncHandler(verifyBearerToken), privateRoute, tenantRoute);
router.use("/roles", asyncHandler(verifyBearerToken), roleRoute);
router.use("/branches", asyncHandler(verifyBearerToken), branchRoute);
router.use("/users", asyncHandler(verifyBearerToken), userRoute);
router.use("/menus", asyncHandler(verifyBearerToken), menuRoute);
router.use("/role_menus", asyncHandler(verifyBearerToken), roleMenuRoute);
router.use("/tables", asyncHandler(verifyBearerToken), tableRoute);
router.use("/customers", asyncHandler(verifyBearerToken), customerRoute);
router.use("/product_categories", asyncHandler(verifyBearerToken), productCategoryRoute);
router.use("/products", asyncHandler(verifyBearerToken), productRoute);

export default router;