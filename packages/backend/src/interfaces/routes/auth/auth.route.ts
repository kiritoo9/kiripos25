import { Router, type Request, type Response } from "express";

import { loginValidation, type loginSchema } from "../../schemas/auth/login.schema";
import { refreshTokenValidation, type refreshTokenSchema } from "../../schemas/auth/refresh-token.schema";
import { type RouteContBridgeSchema } from "../../schemas/routecont-bridge.schema";

import AuthController from "../../../applications/controllers/auth/auth.controller";
import response from "../../../utils/response";

const router = Router();
const authController = new AuthController();

/**
 * @swagger
 * /auth/login:
 *  post:
 *    summary: Login user
 *    description: Login user with username and password
 *    tags: 
 *      - Auth
 *    requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  required:
 *                    - username
 *                    - password  
 *                  properties:
 *                      username:
 *                         type: string
 *                         example: admin
 *                      password:
 *                        type: string
 *                        example: kiripos123
 *                        format: password
 *    responses:
 *      200:
 *        description: Login success
 *      400:
 *        description: Bad request
 */
router.post("/login", async (req: Request, res: Response) => {
    // validate request body
    const body: loginSchema = req.body;
    const { error } = loginValidation.validate(body);
    if (error) {
        return response(res, {
            status: 400,
            message: error?.details?.length > 0 ? error.details[0].message : "Bad request",
            data: body
        });
    }

    // do login process here
    const data: RouteContBridgeSchema = await authController.login(body);
    if (!data.success) {
        return response(res, {
            status: 400,
            message: data.error
        });
    }

    return response(res, {
        status: 200,
        message: "Login success",
        data: data.data
    });
});

/**
 * @swagger
 * /auth/refresh-token:
 *  post:
 *    summary: Refresh your token
 *    description: Refresh your token with refresh token
 *    tags: 
 *      - Auth
 *    requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  required:
 *                    - refresh_token
 *                  properties:
 *                      refresh_token:
 *                         type: string
 *                         example: your-token-here
 *    responses:
 *      200:
 *        description: Login success
 *      400:
 *        description: Bad request
 */
router.post("/refresh-token", async (req: Request, res: Response) => {
    // validate request body
    const body: refreshTokenSchema = req.body;
    const { error } = refreshTokenValidation.validate(body);
    if (error) {
        return response(res, {
            status: 400,
            message: error?.details?.length > 0 ? error.details[0].message : "Bad request",
            data: body
        });
    }

    // do refresh token process here
    const data: RouteContBridgeSchema = await authController.refreshToken(body);
    if (!data.success) {
        return response(res, {
            status: 400,
            message: data.error
        });
    }

    return response(res, {
        status: 200,
        message: "Refresh token success",
        data: data.data
    });
});

export default router;