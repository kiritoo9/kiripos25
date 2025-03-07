import type { Request } from "express";

interface UserPropertySchema {
    role: string;
    tenant: string;
    branch: string;
}

interface LoggedRequest extends Request {
    user_properties: UserPropertySchema
}

export type {
    LoggedRequest,
    UserPropertySchema
}