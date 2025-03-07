import { Router, type Request, type Response } from "express";
import type { QueryParamsSchema } from "../../../schemas/query-params.schema";

import type { RouteContBridgeSchema } from "../../../schemas/routecont-bridge.schema";

import response from "../../../../utils/response";
import queryParams from "../../../../utils/query-params";
import TenantController from "../../../../applications/controllers/masters/tenant.controller";
import { tenantValidation, type tenantSchema } from "../../../schemas/masters/tenant.schema";

// define necessary global function or variables
// such as router, repos, models, and controllers
const router = Router();
const tenantController = new TenantController();

router.get("/", async (req: Request, res: Response) => {
    try {
        // get query parameters
        const params: QueryParamsSchema = queryParams(req.query);

        // call controller for list and count
        const list: RouteContBridgeSchema = await tenantController.getTable(params);

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
        const result: RouteContBridgeSchema = await tenantController.tenantDetail(req.params.id);
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

router.post("/", async (req: Request, res: Response) => {
    try {
        // validate payload-body
        const body: tenantSchema = req.body;
        const { error } = tenantValidation.validate(body);
        if (error) {
            return response(res, {
                code: 400,
                message: "Error payload format",
                data: body,
                error: error
            });
        }

        // do create data
        const result: RouteContBridgeSchema = await tenantController.createTenant(body);
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

router.put("/:id", async (req: Request, res: Response) => {
    try {
        // validate payload-body
        const body: tenantSchema = req.body;
        const { error } = tenantValidation.validate(body);
        if (error) {
            return response(res, {
                code: 400,
                message: "Error payload format",
                data: body,
                error: error
            });
        }

        // check existing data
        const data: RouteContBridgeSchema = await tenantController.tenantDetail(req.params.id);
        if (!data.success) {
            return response(res, {
                code: 404,
                message: "Request failure",
                error: data.error
            });
        }

        // do update data
        const result: RouteContBridgeSchema = await tenantController.updateTenant(req.params.id, body);
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

router.delete("/:id", async (req: Request, res: Response) => {
    try {
        // check existing data
        const data: RouteContBridgeSchema = await tenantController.tenantDetail(req.params.id);
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
        const result: RouteContBridgeSchema = await tenantController.updateTenant(req.params.id, updated_data);
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