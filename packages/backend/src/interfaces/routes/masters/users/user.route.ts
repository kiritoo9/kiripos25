import { Router, type Request, type Response } from "express";
import response from "../../../../utils/response";

// define necessary global function or variables
const router = Router();

router.get("/", (req: Request, res: Response) => {
    return response(res, {
        status: 200,
        message: "this is user route",
        data: (req as any).user
    });
});

export default router;