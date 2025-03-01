import { Router, type Request, type Response } from "express";

import { loginValidation, type loginSchema } from "../../schemas/auth/login.schema";
import { refreshTokenValidation, type refreshTokenSchema } from "../../schemas/auth/refresh-token.schema";
import { type RouteContBridgeSchema } from "../../schemas/routecont-bridge.schema";

import AuthController from "../../../applications/controllers/auth/auth.controller";
import response from "../../../utils/response";

const router = Router();
const authController = new AuthController();

router.post("/login", async (req: Request, res: Response) => {
    // validate request body
    const body: loginSchema = req.body;
    const { error } = loginValidation.validate(body);
    if (error) {
        return response(res, {
            code: 400,
            message: "Error payload format",
            data: body,
            error: error
        });
    }

    // do login process here
    const data: RouteContBridgeSchema = await authController.login(body);
    if (!data.success) {
        return response(res, {
            code: 400,
            message: "Login failed",
            error: data?.error ?? "Something went wrong"
        });
    }

    return response(res, {
        code: 200,
        message: "Login success",
        data: data.data
    });
});

router.post("/refresh-token", async (req: Request, res: Response) => {
    // validate request body
    const body: refreshTokenSchema = req.body;
    const { error } = refreshTokenValidation.validate(body);
    if (error) {
        return response(res, {
            code: 400,
            message: error?.details?.length > 0 ? error.details[0].message : "Bad request",
            data: body
        });
    }

    // do refresh token process here
    const data: RouteContBridgeSchema = await authController.refreshToken(body);
    if (!data.success) {
        return response(res, {
            code: 400,
            message: "Refresh token failed",
            error: data?.error ?? "Something went wrong"
        });
    }

    return response(res, {
        code: 200,
        message: "Refresh token success",
        data: data.data
    });
});

export default router;