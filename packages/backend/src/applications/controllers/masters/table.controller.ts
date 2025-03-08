import TableRepository from "../../repos/masters/table.repo";

import type { DatatableSchema } from "../../../interfaces/schemas/datatable.schema";
import type { QueryParamsSchema } from "../../../interfaces/schemas/query-params.schema";
import type { RouteContBridgeSchema } from "../../../interfaces/schemas/routecont-bridge.schema";
import type { tableSchema } from "../../../interfaces/schemas/masters/table.schema";
import type { UserPropertySchema } from "../../../interfaces/schemas/user-property.schema";

const tableRepo = new TableRepository();

class TableController {
    KEY_ROLE: string = "superadmin";

    async listTable(params: QueryParamsSchema, user_properties: UserPropertySchema): Promise<RouteContBridgeSchema> {
        const data = await tableRepo.getTableList(params, user_properties);
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

    async tableDetail(id: string, user_properties: UserPropertySchema): Promise<RouteContBridgeSchema> {
        let response: RouteContBridgeSchema = {
            success: false,
            data: null,
            error: "",
        }

        // check if data not found
        let data = await tableRepo.getTableById(id, user_properties);
        if (!data) {
            response.error = "Data not found";
            return response;
        }

        // set response
        response.success = true;
        response.data = data;
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
        const list: RouteContBridgeSchema = await this.listTable(params, user_properties);
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

    async createTable(body: tableSchema, user_properties: UserPropertySchema): Promise<RouteContBridgeSchema> {
        let response: RouteContBridgeSchema = {
            success: false,
            data: [],
            error: []
        }

        let error_tenant: boolean = false;
        if (user_properties.role?.toLowerCase() === this.KEY_ROLE) {
            if (body?.tenant_id === undefined || !body.tenant_id) error_tenant = true;
        } else {
            if (user_properties?.tenant_id === undefined || !user_properties.tenant_id) {
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
            const result = await tableRepo.createTable(body);
            response.success = true;
            response.data = result;
            return response;
        } catch (error: any) {
            response.error = error?.message;
            return response;
        }

    }

    async updateTable(id: string, body: tableSchema | { [key: string]: any }, user_properties: UserPropertySchema): Promise<RouteContBridgeSchema> {
        let response: RouteContBridgeSchema = {
            success: false,
            data: [],
            error: []
        }

        let error_tenant: boolean = false;
        if (user_properties.role?.toLowerCase() === this.KEY_ROLE) {
            if (body?.tenant_id === undefined || !body.tenant_id) error_tenant = true;
        } else {
            if (user_properties?.tenant_id === undefined || !user_properties.tenant_id) {
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
            const result = await tableRepo.updateTable(id, body);
            response.success = true;
            response.data = result;
            return response;
        } catch (error: any) {
            response.error = error?.message;
            return response;
        }
    }

}

export default TableController;