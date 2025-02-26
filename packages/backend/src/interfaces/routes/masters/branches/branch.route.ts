import { Router, type Request, type Response } from "express";
import type { QueryParamsSchema } from "../../../schemas/query-params.schema";

import type { RouteContBridgeSchema } from "../../../schemas/routecont-bridge.schema";

import response from "../../../../utils/response";
import queryParams from "../../../../utils/query-params";
import BranchController from "../../../../applications/controllers/masters/branch.controller";

// define necessary global function or variables
// such as router, repos, models, and controllers
const router = Router();
const branchController = new BranchController();

router.get("/", async (req: Request, res: Response) => {
    // get query parameters
    const params: QueryParamsSchema = queryParams(req.query);

    // call controller for list and count
    const list: RouteContBridgeSchema = await branchController.getTable(params);

    // send to response
    return response(res, {
        code: 200,
        message: "Request success",
        data: list.data
    });
});

router.get("/:id", async (req: Request, res: Response) => {
    const result = await branchController.branchDetail(req.params.id);
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
});

export default router;