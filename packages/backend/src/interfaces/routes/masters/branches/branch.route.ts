import { Router, type Request, type Response } from "express";
import type { QueryParamsSchema } from "../../../schemas/query-params.schema";

import type { RouteContBridgeSchema } from "../../../schemas/routecont-bridge.schema";

import response from "../../../../utils/response";
import queryParams from "../../../../utils/query-params";
import BranchController from "../../../../applications/controllers/masters/branch.controller";
import { branchValidation, type branchSchema } from "../../../schemas/masters/branch.schema";

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
    const result: RouteContBridgeSchema = await branchController.branchDetail(req.params.id);
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
});

router.post("/", async (req: Request, res: Response) => {
    // validate payload-body
    const body: branchSchema = req.body;
    const { error } = branchValidation.validate(body);
    if (error) {
        return response(res, {
            code: 400,
            message: "Error payload format",
            data: body,
            error: error
        });
    }

    // do create branch
    const result: RouteContBridgeSchema = await branchController.createBranch(body);
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
});

router.put("/:id", async (req: Request, res: Response) => {
    // validate payload-body
    const body: branchSchema = req.body;
    const { error } = branchValidation.validate(body);
    if (error) {
        return response(res, {
            code: 400,
            message: "Error payload format",
            data: body,
            error: error
        });
    }

    // check existing data
    const branch: RouteContBridgeSchema = await branchController.branchDetail(req.params.id);
    if (!branch.success) {
        return response(res, {
            code: 404,
            message: "Request failure",
            error: branch.error
        });
    }

    // do update branch
    const result: RouteContBridgeSchema = await branchController.updateBranch(req.params.id, body);
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
        message: "Data is succssfully updated",
        data: result.data
    });
});

router.delete("/:id", async (req: Request, res: Response) => {
    // check existing data
    const branch: RouteContBridgeSchema = await branchController.branchDetail(req.params.id);
    if (!branch.success) {
        return response(res, {
            code: 404,
            message: "Request failure",
            error: branch.error
        });
    }

    // do (soft)delete branch
    const result: RouteContBridgeSchema = await branchController.updateBranch(req.params.id, { deleted: true });
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
        message: "Data is succssfully deleted",
        data: result.data
    });
});

export default router;