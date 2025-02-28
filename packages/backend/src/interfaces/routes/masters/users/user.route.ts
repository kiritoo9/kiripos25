import { Router, type Request, type Response } from "express";
import type { QueryParamsSchema } from "../../../schemas/query-params.schema";
import type { RouteContBridgeSchema } from "../../../schemas/routecont-bridge.schema";

import response from "../../../../utils/response";
import queryParams from "../../../../utils/query-params";
import UserController from "../../../../applications/controllers/masters/user.controller";
import { userValidation, type userSchema } from "../../../schemas/masters/user.schema";

// define necessary global function or variables
// such as router, repos, models, and controllers
const router = Router();
const userController = new UserController();

router.get("/", async (req: Request, res: Response) => {
    try {
        // get query parameters
        const params: QueryParamsSchema = queryParams(req.query);

        // call controller for list and count
        const list: RouteContBridgeSchema = await userController.getTable(params);

        // send to response
        return response(res, {
            code: 200,
            message: "Request success",
            data: list.data
        });
    } catch (error: any) {
        return response(res, {
            code: 400,
            message: "Something went wrong",
            error: error?.message
        });
    }
});

router.get("/:id", async (req: Request, res: Response) => {
    try {
        const result = await userController.userDetail(req.params.id);
        let data: any = {
            code: 200,
            message: "Request success",
            data: null
        }

        if (!result.success) {
            data.code = 404;
            data.message = result.error;
            return response(res, data);
        }

        // success condition
        data.data = result.data;
        return response(res, data);
    } catch (error: any) {
        return response(res, {
            code: 400,
            message: "Something went wrong",
            error: error?.message
        });
    }
});

router.post("/", async (req: Request, res: Response) => {
    try {
        // validate payload-body
        const body: userSchema = req.body;
        const { error } = userValidation.validate(body);
        if (error) {
            return response(res, {
                code: 400,
                message: "Error payload body format",
                error: error
            });
        }

        // perform to create user
        const result: RouteContBridgeSchema = await userController.createUser(body);
        if (!result.success) {
            return response(res, {
                code: 400,
                message: "Something went wrong",
                error: result.error
            });
        }

        // success condition
        return response(res, {
            code: 201,
            message: "Data is successfully created",
            data: result.data
        });
    } catch (error: any) {
        return response(res, {
            code: 400,
            message: "Something went wrong",
            error: error?.message
        });
    }
});

router.put("/:id", async (req: Request, res: Response) => {
    try {
        // validate payload-body
        const body: userSchema = req.body;
        const { error } = userValidation.validate(body);
        if (error) {
            return response(res, {
                code: 400,
                message: "Error payload body format",
                error: error
            });
        }

        // perform to update user
        const result: RouteContBridgeSchema = await userController.updateUser(req.params.id, body);
        if (!result.success) {
            return response(res, {
                code: result?.code === undefined ? 400 : result.code, // handle multiple error code
                message: "Something went wrong",
                error: result.error
            });
        }

        // success condition
        return response(res, {
            code: 204,
            message: "Data is successfully updated"
        });
    } catch (error: any) {
        return response(res, {
            code: 400,
            message: "Something went wrong",
            error: error?.message
        });
    }
});

router.delete("/:id", async (req: Request, res: Response) => {
    try {
        const result: RouteContBridgeSchema = await userController.deleteUser(req.params.id);
        if (!result.success) {
            return response(res, {
                code: 400,
                message: "Something went wrong",
                error: result.error
            });
        }

        // success condition
        return response(res, {
            code: 204,
            message: "Data is succesfully deleted"
        });
    } catch (error: any) {
        return response(res, {
            code: 400,
            message: "Something went wrong",
            error: error?.message
        });
    }
});

export default router;