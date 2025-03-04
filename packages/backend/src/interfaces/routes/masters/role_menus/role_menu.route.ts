import { Router, type Request, type Response } from "express";
import response from "../../../../utils/response";
import type { QueryParamsSchema } from "../../../schemas/query-params.schema";
import queryParams from "../../../../utils/query-params";
import type { RouteContBridgeSchema } from "../../../schemas/routecont-bridge.schema";
import RoleMenuController from "../../../../applications/controllers/masters/role_menu.controller";
import { roleMenuValidation, type roleMenuSchema } from "../../../schemas/masters/role_menu.schema";

// define necessary global function or variables
// such as router, repos, models, and controllers
const router = Router();
const roleMenuController = new RoleMenuController();

router.get("/:role_id", async (req: Request, res: Response) => {
    try {
        // get query parameters
        const params: QueryParamsSchema = queryParams(req.query);

        // call controller for list and count
        const list: RouteContBridgeSchema = await roleMenuController.getTable(req.params.role_id, params);

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

router.get("/:role_id/:id", async (req: Request, res: Response) => {
    try {
        const result: RouteContBridgeSchema = await roleMenuController.roleMenuDetail(req.params.id, req.params.role_id);
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

        // success response
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

router.post("/:role_id", async (req: Request, res: Response) => {
    try {
        // validate payload-body
        const body: roleMenuSchema = { ...req.body, role_id: req.params.role_id };
        const { error } = roleMenuValidation.validate(body);
        if (error) {
            return response(res, {
                code: 400,
                message: "Error payload format",
                data: body,
                error: error
            });
        }

        // do create data
        const result: RouteContBridgeSchema = await roleMenuController.createRoleMenu(body);
        if (!result.success) {
            return response(res, {
                code: 400,
                message: "Something went wrong",
                error: result.error
            });
        }

        // success response
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

router.put("/:role_id/:id", async (req: Request, res: Response) => {
    try {
        // validate payload-body
        const body: roleMenuSchema = { ...req.body, role_id: req.params.role_id };
        const { error } = roleMenuValidation.validate(body);
        if (error) {
            return response(res, {
                code: 400,
                message: "Error payload format",
                data: body,
                error: error
            });
        }

        // check existing data
        const data: RouteContBridgeSchema = await roleMenuController.roleMenuDetail(req.params.id, req.params.role_id);
        if (!data.success) {
            return response(res, {
                code: 404,
                message: "Request failure",
                error: data.error
            });
        }

        // do update data
        const result: RouteContBridgeSchema = await roleMenuController.updateRoleMenu(req.params.id, body);
        if (!result.success) {
            return response(res, {
                code: 400,
                message: "Something went wrong",
                error: result.error
            });
        }

        // success response
        return response(res, {
            code: 204,
            message: "Data is succssfully updated"
        });
    } catch (error: any) {
        return response(res, {
            code: 400,
            message: "Something went wrong",
            error: error?.message
        });
    }
});

router.delete("/:role_id/:id", async (req: Request, res: Response) => {
    try {
        // check existing data
        const data: RouteContBridgeSchema = await roleMenuController.roleMenuDetail(req.params.id, req.params.role_id);
        if (!data.success) {
            return response(res, {
                code: 404,
                message: "Request failure",
                error: data.error
            });
        }

        // do (soft)delete data
        const updated_data = {
            deleted: true,
            updated_at: new Date()
        }
        const result: RouteContBridgeSchema = await roleMenuController.updateRoleMenu(req.params.id, updated_data);
        if (!result.success) {
            return response(res, {
                code: 400,
                message: "Something went wrong",
                error: result.error
            });
        }

        // success response
        return response(res, {
            code: 204,
            message: "Data is succssfully deleted"
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