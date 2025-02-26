import RoleRepository from "../../repos/masters/role.repo";

import type { DatatableSchema } from "../../../interfaces/schemas/datatable.schema";
import type { QueryParamsSchema } from "../../../interfaces/schemas/query-params.schema";
import type { RouteContBridgeSchema } from "../../../interfaces/schemas/routecont-bridge.schema";

const roleRepo = new RoleRepository();

class RoleController {

    async listRole(params: QueryParamsSchema): Promise<RouteContBridgeSchema> {
        const data = await roleRepo.getRoleList(params);
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

    async roleDetail(id: string): Promise<RouteContBridgeSchema> {
        let response: RouteContBridgeSchema = {
            success: false,
            data: null,
            error: "",
        }

        // check if data not found
        let role = await roleRepo.getRoleById(id);
        if (!role) {
            response.error = "Role not found";
            return response;
        }

        // set response
        response.success = true;
        response.data = role;
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
        const listRole: RouteContBridgeSchema = await this.listRole(params);
        let datatable: DatatableSchema = {
            parameters: params,
            count: {
                total_page: listRole.data.total_page,
                total_data: listRole.data.total_data,
            },
            data: listRole.data
        }

        // set response
        response.data = datatable;
        return response;
    }

}

export default RoleController;