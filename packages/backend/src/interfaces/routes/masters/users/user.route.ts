import { Router, type Request, type Response } from "express";
import type { QueryParamsSchema } from "../../../schemas/query-params.schema";

import response from "../../../../utils/response";
import queryParams from "../../../../utils/query-params";
import UserController from "../../../../applications/controllers/masters/user.controller";
import type { RouteContBridgeSchema } from "../../../schemas/routecont-bridge.schema";

// define necessary global function or variables
// such as router, repos, models, and controllers
const router = Router();
const userController = new UserController();

router.get("/", async (req: Request, res: Response) => {
    // get query parameters
    const params: QueryParamsSchema = queryParams(req.query);

    // call controller for list and count
    const listUser: RouteContBridgeSchema = await userController.getTable(params);

    // send to response
    return response(res, {
        code: 200,
        message: "Request success",
        data: listUser.data
    });
});

router.get("/:id", async (req: Request, res: Response) => {
    return response(res, {
        code: 200,
        message: "Request success",
        data: await userController.userDetail(req.params.id)
    });
});

router.post("/", (req: Request, res: Response) => {
    return response(res, {
        code: 201,
        message: "this is user route"
    });
});

export default router;