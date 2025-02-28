import type { Response } from "express";
import type { IoResponseSchema } from "../interfaces/schemas/io-response.schema";

const response = (res: Response, data: IoResponseSchema) => {
    let body: { [key: string]: any } = {
        "message": data.message,
    }
    if (data?.data !== undefined) body["data"] = data.data;
    if (data?.error !== undefined) body["error"] = data.error;
    res.status(data?.code === undefined ? 400 : data.code).json(body);
}
export default response;