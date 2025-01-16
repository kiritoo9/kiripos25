import { Router, type Request, type Response } from "express";
import type { IoResponse } from "../schemas/io-response";
import response from "../../utils/response";
import ENV from "../../infras/environ";

// import all routes available
import userRoute from "./masters/userRoutes";

// define necessary global function or variables
const router = Router();

// welcome route
router.get("/", (_: Request, res: Response) => {
    const data: IoResponse = {
        status: 200,
        message: "Welcome sir, this is great start for you!",
        data: {
            name: ENV.APP_NAME,
            version: ENV.APP_VER
        }
    } // [optional] define response using model for best practice
    return response(res, data);
});

// define routes for master
router.use("/user", userRoute);

export default router;