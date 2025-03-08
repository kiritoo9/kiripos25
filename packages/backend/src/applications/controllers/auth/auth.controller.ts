import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import ENV from "../../../infras/environ";
import { type loginSchema } from "../../../interfaces/schemas/auth/login.schema";
import { type RouteContBridgeSchema } from "../../../interfaces/schemas/routecont-bridge.schema";

import UserRepository from "../../repos/masters/user.repo";
import type { refreshTokenSchema } from "../../../interfaces/schemas/auth/refresh-token.schema";

class AuthController {
    private userRepo = new UserRepository();

    async checkUsername(username: string): Promise<RouteContBridgeSchema> {
        let response: RouteContBridgeSchema = {
            success: false,
            data: null,
            error: "",
        }

        // check available username
        const user = await this.userRepo.getUserByUsername(username);
        if (!user) {
            response.error = "Username not found";
            return response;
        }

        response.success = true;
        response.data = user;
        return response;
    }

    async checkPassword(password: string, hashPassword: string): Promise<RouteContBridgeSchema> {
        let response: RouteContBridgeSchema = {
            success: false,
            data: null,
            error: "",
        }

        // check bcrypt password
        const match: boolean = await bcrypt.compare(password, hashPassword);
        if (!match) {
            response.error = "Password not match";
            return response;
        }

        response.success = true;
        return response;
    }

    async refreshToken(payload: refreshTokenSchema): Promise<RouteContBridgeSchema> {
        let response: RouteContBridgeSchema = {
            success: false,
            data: null,
            error: null,
        }

        // check valid refresh token
        try {
            let user: any = jwt.verify(payload.refresh_token, ENV.SECRET_KEY);

            // remove iat and exp from jwt properties
            delete user.iat;
            delete user.exp;

            // generate new access token
            const accessToken: string = jwt.sign(
                user,
                ENV.SECRET_KEY,
                { expiresIn: "1h" }
            );

            const refreshToken: string = jwt.sign(
                user,
                ENV.SECRET_KEY,
                { expiresIn: "7d" }
            );

            // send success response
            response.data = { access_token: accessToken, refresh_token: refreshToken };
            response.success = true;
            return response;
        } catch (_) {
            response.error = "Invalid refresh token";
            return response;
        }
    }

    async login(payload: loginSchema): Promise<RouteContBridgeSchema> {
        let response: RouteContBridgeSchema = {
            success: false,
            data: null,
            error: null,
        }

        // check valid username
        const dataUser = await this.checkUsername(payload.username);
        if (!dataUser.success) {
            response.error = dataUser.error;
            return response;
        }

        // check valid password
        const password = await this.checkPassword(payload.password, dataUser?.data?.password);
        if (!password.success) {
            response.error = password.error;
            return response;
        }

        // generate JWT for token standard
        const dataToken = {
            id: dataUser?.data?.id,
            username: dataUser?.data?.username,
        }
        const accessToken: string = jwt.sign(
            dataToken,
            ENV.SECRET_KEY,
            { expiresIn: "3h" }
        );
        const refreshToken: string = jwt.sign(
            dataToken,
            ENV.SECRET_KEY,
            { expiresIn: "7d" }
        );

        // send success response
        response.data = { access_token: accessToken, refresh_token: refreshToken };
        response.success = true;
        return response;
    }

}

export default AuthController;