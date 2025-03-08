import type { Request } from "express";

interface UserPropertySchema {
    role: string;
    role_id: string;
    tenant?: string;
    tenant_id?: string;
    branch?: string;
    branch_id?: string;
}

interface LoggedRequest extends Request {
    user_properties: UserPropertySchema
}

export type {
    LoggedRequest,
    UserPropertySchema
}