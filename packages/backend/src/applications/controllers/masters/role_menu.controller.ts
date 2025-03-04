import type { DatatableSchema } from "../../../interfaces/schemas/datatable.schema";
import type { roleMenuSchema } from "../../../interfaces/schemas/masters/role_menu.schema";
import type { QueryParamsSchema } from "../../../interfaces/schemas/query-params.schema";
import type { RouteContBridgeSchema } from "../../../interfaces/schemas/routecont-bridge.schema";
import RoleMenuRepository from "../../repos/masters/role_menu.repo";

const roleMenuRepo = new RoleMenuRepository();

class RoleMenuController {

    async listRoleMenu(role_id: string, params: QueryParamsSchema): Promise<RouteContBridgeSchema> {
        const data = await roleMenuRepo.getRoleMenuList(role_id, params);
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

    async roleMenuDetail(id: string, role_id: string | null = null): Promise<RouteContBridgeSchema> {
        let response: RouteContBridgeSchema = {
            success: false,
            data: null,
            error: "",
        }

        // check if data not found
        let role_menu = await roleMenuRepo.getRoleMenuById(id, role_id);
        if (!role_menu) {
            response.error = "Menu not found";
            return response;
        }

        // set response
        response.success = true;
        response.data = role_menu;
        return response;
    }

    async getTable(role_id: string, params: QueryParamsSchema): Promise<RouteContBridgeSchema> {
        // define data
        let response: RouteContBridgeSchema = {
            success: false,
            data: [],
            error: []
        }

        // perform to get list data
        const listRoleMenu: RouteContBridgeSchema = await this.listRoleMenu(role_id, params);
        let datatable: DatatableSchema = {
            parameters: params,
            count: {
                total_page: listRoleMenu.data.total_page,
                total_data: listRoleMenu.data.total_data,
            },
            data: listRoleMenu.data
        }

        // set response
        response.data = datatable;
        return response;
    }

    async createRoleMenu(body: roleMenuSchema): Promise<RouteContBridgeSchema> {
        let response: RouteContBridgeSchema = {
            success: false,
            data: [],
            error: []
        }

        try {
            const result = await roleMenuRepo.createRoleMenu(body);
            response.success = true;
            response.data = result;
            return response;
        } catch (error: any) {
            response.error = error?.message;
            return response;
        }

    }

    async updateRoleMenu(id: string, body: roleMenuSchema | { [key: string]: any }): Promise<RouteContBridgeSchema> {
        let response: RouteContBridgeSchema = {
            success: false,
            data: [],
            error: []
        }

        try {
            const result = await roleMenuRepo.updateRoleMenu(id, body);
            response.success = true;
            response.data = result;
            return response;
        } catch (error: any) {
            response.error = error?.message;
            return response;
        }
    }
}

export default RoleMenuController;