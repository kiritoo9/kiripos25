import { Router, type Request, type Response } from "express";
import type { QueryParamsSchema } from "../../../schemas/query-params.schema";

import type { RouteContBridgeSchema } from "../../../schemas/routecont-bridge.schema";

import response from "../../../../utils/response";
import queryParams from "../../../../utils/query-params";
import CustomerController from "../../../../applications/controllers/masters/customer.controller";
import { customerValidation, type customerSchema } from "../../../schemas/masters/customer.schema";
import type { LoggedRequest, UserPropertySchema } from "../../../schemas/user-property.schema";

// define necessary global function or variables
// such as router, repos, models, and controllers
const router = Router();
const customerController = new CustomerController();

router.get("/", async (req: Request, res: Response) => {
    try {
        // get query parameters
        const params: QueryParamsSchema = queryParams(req.query);

        // call controller for list and count
        const user_properties: UserPropertySchema = (req as LoggedRequest).user_properties;
        const list: RouteContBridgeSchema = await customerController.getTable(params, user_properties);

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
        const user_properties: UserPropertySchema = (req as LoggedRequest).user_properties;
        const result: RouteContBridgeSchema = await customerController.customerDetail(req.params.id, user_properties);
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
        const body: customerSchema = req.body;
        const { error } = customerValidation.validate(body);
        if (error) {
            return response(res, {
                code: 400,
                message: "Error payload format",
                data: body,
                error: error
            });
        }
        const user_properties: UserPropertySchema = (req as LoggedRequest).user_properties;

        // do create data
        const result: RouteContBridgeSchema = await customerController.createCustomer(body, user_properties);
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
        const body: customerSchema = req.body;
        const { error } = customerValidation.validate(body);
        if (error) {
            return response(res, {
                code: 400,
                message: "Error payload format",
                data: body,
                error: error
            });
        }
        const user_properties: UserPropertySchema = (req as LoggedRequest).user_properties;

        // check existing data
        const data: RouteContBridgeSchema = await customerController.customerDetail(req.params.id, user_properties);
        if (!data.success) {
            return response(res, {
                code: 404,
                message: "Request failure",
                error: data.error
            });
        }

        // do update data
        const result: RouteContBridgeSchema = await customerController.updateCustomer(req.params.id, body, user_properties);
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
        const user_properties: UserPropertySchema = (req as LoggedRequest).user_properties;
        const data: RouteContBridgeSchema = await customerController.customerDetail(req.params.id, user_properties);
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
        const result: RouteContBridgeSchema = await customerController.updateCustomer(req.params.id, updated_data, user_properties);
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