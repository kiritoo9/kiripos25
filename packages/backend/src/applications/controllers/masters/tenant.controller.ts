import TenantRepository from "../../repos/masters/tenant.repo";

import type { DatatableSchema } from "../../../interfaces/schemas/datatable.schema";
import type { QueryParamsSchema } from "../../../interfaces/schemas/query-params.schema";
import type { RouteContBridgeSchema } from "../../../interfaces/schemas/routecont-bridge.schema";
import type { tenantSchema } from "../../../interfaces/schemas/masters/tenant.schema";

const tenantRepo = new TenantRepository();

class TenantController {

    async listTenant(params: QueryParamsSchema): Promise<RouteContBridgeSchema> {
        const data = await tenantRepo.getTenantList(params);
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

    async tenantDetail(id: string): Promise<RouteContBridgeSchema> {
        let response: RouteContBridgeSchema = {
            success: false,
            data: null,
            error: "",
        }

        // check if data not found
        let data = await tenantRepo.getTenantById(id);
        if (!data) {
            response.error = "Tenant not found";
            return response;
        }

        // set response
        response.success = true;
        response.data = data;
        return response;
    }

    async getTable(params: QueryParamsSchema): Promise<RouteContBridgeSchema> {
        // define data
        let response: RouteContBridgeSchema = {
            success: true,
            data: [],
            error: "",
        }

        // perform to get list data
        const list: RouteContBridgeSchema = await this.listTenant(params);
        let datatable: DatatableSchema = {
            parameters: params,
            count: {
                total_page: list.data.total_page,
                total_data: list.data.total_data,
            },
            data: list.data
        }

        // set response
        response.data = datatable;
        return response;
    }

    async createTenant(body: tenantSchema): Promise<RouteContBridgeSchema> {
        let response: RouteContBridgeSchema = {
            success: false,
            data: [],
            error: []
        }

        try {
            const result = await tenantRepo.createTenant(body);
            response.success = true;
            response.data = result;
            return response;
        } catch (error: any) {
            response.error = error?.message;
            return response;
        }

    }

    async updateTenant(id: string, body: tenantSchema | { [key: string]: any }): Promise<RouteContBridgeSchema> {
        let response: RouteContBridgeSchema = {
            success: false,
            data: [],
            error: []
        }

        try {
            const result = await tenantRepo.updateTenant(id, body);
            response.success = true;
            response.data = result;
            return response;
        } catch (error: any) {
            response.error = error?.message;
            return response;
        }
    }

}

export default TenantController;