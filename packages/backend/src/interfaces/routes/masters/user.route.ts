import { Router, type Request, type Response } from "express";
import response from "../../../utils/response";

// define necessary global function or variables
const router = Router();

// Register your whole routes for this section below
router.get("/", (req: Request, res: Response) => {
    return response(res, {
        status: 200,
        message: "this is user route",
    });
});

export default router;