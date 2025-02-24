import { Router, type Request, type Response } from "express";
import response from "../../../utils/response";

// define necessary global function or variables
const router = Router();

/**
 * @swagger
 * /users:
 *  get:
 *      summary: List user
 *      tags:
 *          - Masters
 *      description: List of users available in database
 *      responses:
 *          200:
 *              description: Request success
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status: 
 *                                  type: integer
 *                              message:
 *                                  type: string
 *                              data:
 *                                  type: object
 *                                  properties:
 *                                      name:
 *                                          type: string
 *                                      version:
 *                                          type: string
 *          400:
 *              description: Bad request
 */
router.get("/", (req: Request, res: Response) => {
    return response(res, {
        status: 200,
        message: "this is user route",
    });
});

export default router;