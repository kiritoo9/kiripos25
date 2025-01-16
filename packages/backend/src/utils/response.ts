import type { Response } from "express";
import type { IoResponse } from "../interfaces/schemas/io-response";

const response = (res: Response, data: IoResponse) => {
    let body: { [key: string]: any } = {
        "message": data.message,
    }
    if (data?.data !== undefined) body["data"] = data.data;
    if (data?.error !== undefined) body["error"] = data.error;
    res.status(data.status).json(body);
}
export default response;