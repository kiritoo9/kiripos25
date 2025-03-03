import { Router, type Request, type Response } from "express";

import type { IoResponseSchema } from "../schemas/io-response.schema";
import response from "../../utils/response";
import ENV from "../../infras/environ";
import verifyBearerToken from "../middlewares/verify";

// import all routes available
import authRoute from "./auth/auth.route";
import roleRoute from "./masters/roles/role.route";
import branchRoute from "./masters/branches/branch.route";
import userRoute from "./masters/users/user.route";
import menuRoute from "./masters/menus/menu.route";
import roleMenuRoute from "./masters/role_menus/role_menu.route";

// define necessary global function or variables
const router = Router();

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
router.use("/roles", verifyBearerToken, roleRoute);
router.use("/branches", verifyBearerToken, branchRoute);
router.use("/users", verifyBearerToken, userRoute);
router.use("/menus", verifyBearerToken, menuRoute);
router.use("/role_menus", verifyBearerToken, roleMenuRoute);

export default router;