import { Router, type Request, type Response } from "express";
import type { QueryParamsSchema } from "../../../schemas/query-params.schema";

import type { RouteContBridgeSchema } from "../../../schemas/routecont-bridge.schema";

import response from "../../../../utils/response";
import queryParams from "../../../../utils/query-params";
import RoleController from "../../../../applications/controllers/masters/role.controller";

// define necessary global function or variables
// such as router, repos, models, and controllers
const router = Router();
const roleController = new RoleController();

router.get("/", async (req: Request, res: Response) => {
    // get query parameters
    const params: QueryParamsSchema = queryParams(req.query);

    // call controller for list and count
    const list: RouteContBridgeSchema = await roleController.getTable(params);

    // send to response
    return response(res, {
        code: 200,
        message: "Request success",
        data: list.data
    });
});

export default router;