import { Router, type Request, type Response } from "express";
import type { IoResponseSchema } from "../schemas/io-response.schema";
import response from "../../utils/response";
import ENV from "../../infras/environ";

// import all routes available
import authRoute from "./auth/auth.route";
import userRoute from "./masters/user.route";

// define necessary global function or variables
const router = Router();

// welcome route
/**
 * @swagger
 * /:
 *  get:
 *      summary: Welcome page
 *      tags:
 *          - Welcome
 *      description: Welcome page to check if server is run well
 *      responses:
 *          200:
 *              description: Request success
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status: 
 *                                  type: integer
 *                              message:
 *                                  type: string
 *                              data:
 *                                  type: object
 *                                  properties:
 *                                      name:
 *                                          type: string
 *                                      version:
 *                                          type: string
 *          400:
 *              description: Bad request
 */
router.get("/", (_: Request, res: Response) => {
    const data: IoResponseSchema = {
        status: 200,
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
router.use("/users", userRoute);

export default router;