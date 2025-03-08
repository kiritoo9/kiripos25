import BranchRepository from "../../repos/masters/branch.repo";

import type { DatatableSchema } from "../../../interfaces/schemas/datatable.schema";
import type { QueryParamsSchema } from "../../../interfaces/schemas/query-params.schema";
import type { RouteContBridgeSchema } from "../../../interfaces/schemas/routecont-bridge.schema";
import type { branchSchema } from "../../../interfaces/schemas/masters/branch.schema";
import type { UserPropertySchema } from "../../../interfaces/schemas/user-property.schema";

const branchRepo = new BranchRepository();

class BranchController {
    KEY_ROLE: string = "superadmin";

    async listBranch(params: QueryParamsSchema, user_properties: UserPropertySchema): Promise<RouteContBridgeSchema> {
        const data = await branchRepo.getBranchList(params, user_properties);
        let response: RouteContBridgeSchema = {
            success: true,
            data: {
                total_data: data.count,
                total_page: data.count > 0 ? Math.ceil(data.count / params.limit) : 1,
                rows: data.rows
            },
            error: "",
        }
        return response;
    }

    async branchDetail(id: string, user_properties: UserPropertySchema): Promise<RouteContBridgeSchema> {
        let response: RouteContBridgeSchema = {
            success: false,
            data: null,
            error: "",
        }

        // check if data not found
        let branch = await branchRepo.getBranchById(id, user_properties);
        if (!branch) {
            response.error = "Branch not found";
            return response;
        }

        // set response
        response.success = true;
        response.data = branch;
        return response;
    }

    async getTable(params: QueryParamsSchema, user_properties: UserPropertySchema): Promise<RouteContBridgeSchema> {
        // define data
        let response: RouteContBridgeSchema = {
            success: true,
            data: [],
            error: "",
        }

        // perform to get list data
        const listBranch: RouteContBridgeSchema = await this.listBranch(params, user_properties);
        let datatable: DatatableSchema = {
            parameters: params,
            count: {
                total_page: listBranch.data.total_page,
                total_data: listBranch.data.total_data,
            },
            data: listBranch.data
        }

        // set response
        response.data = datatable;
        return response;
    }

    async createBranch(body: branchSchema, user_properties: UserPropertySchema): Promise<RouteContBridgeSchema> {
        let response: RouteContBridgeSchema = {
            success: false,
            data: [],
            error: []
        }

        let error_tenant: boolean = false;
        if (user_properties.role?.toLowerCase() === this.KEY_ROLE) {
            if (body?.tenant_id === undefined || !body.tenant_id) error_tenant = true;
        } else {
            if (user_properties?.tenant_id === undefined || !body.tenant_id) {
                error_tenant = true;
            } else {
                body.tenant_id = user_properties.tenant_id;
            }
        }

        if (error_tenant) {
            response.error = "TenantID is missing, please check your input";
            return response;
        }

        try {
            const result = await branchRepo.createBranch(body);
            response.success = true;
            response.data = result;
            return response;
        } catch (error: any) {
            response.error = error?.message;
            return response;
        }

    }

    async updateBranch(id: string, body: branchSchema | { [key: string]: any }, user_properties: UserPropertySchema): Promise<RouteContBridgeSchema> {
        let response: RouteContBridgeSchema = {
            success: false,
            data: [],
            error: []
        }

        let error_tenant: boolean = false;
        if (user_properties.role?.toLowerCase() === this.KEY_ROLE) {
            if (body?.tenant_id === undefined || !body.tenant_id) error_tenant = true;
        } else {
            if (user_properties?.tenant_id === undefined || !body.tenant_id) {
                error_tenant = true;
            } else {
                body.tenant_id = user_properties.tenant_id;
            }
        }

        if (error_tenant) {
            response.error = "TenantID is missing, please check your input";
            return response;
        }

        try {
            const result = await branchRepo.updateBranch(id, body);
            response.success = true;
            response.data = result;
            return response;
        } catch (error: any) {
            response.error = error?.message;
            return response;
        }
    }

}

export default BranchController;