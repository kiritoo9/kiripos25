import type { DatatableSchema } from "../../../interfaces/schemas/datatable.schema";
import type { menuSchema } from "../../../interfaces/schemas/masters/menu.schema";
import type { QueryParamsSchema } from "../../../interfaces/schemas/query-params.schema";
import type { RouteContBridgeSchema } from "../../../interfaces/schemas/routecont-bridge.schema";
import MenuRepository from "../../repos/masters/menu.repo";

const menuRepo = new MenuRepository();

class MenuController {

    async listMenu(params: QueryParamsSchema): Promise<RouteContBridgeSchema> {
        const data = await menuRepo.getMenuList(params);
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

    async menuDetail(id: string): Promise<RouteContBridgeSchema> {
        let response: RouteContBridgeSchema = {
            success: false,
            data: null,
            error: "",
        }

        // check if data not found
        let menu = await menuRepo.getMenuById(id);
        if (!menu) {
            response.error = "Menu not found";
            return response;
        }

        // set response
        response.success = true;
        response.data = menu;
        return response;
    }

    async getTable(params: QueryParamsSchema): Promise<RouteContBridgeSchema> {
        // define data
        let response: RouteContBridgeSchema = {
            success: false,
            data: [],
            error: []
        }

        // perform to get list data
        const listMenu: RouteContBridgeSchema = await this.listMenu(params);
        let datatable: DatatableSchema = {
            parameters: params,
            count: {
                total_page: listMenu.data.total_page,
                total_data: listMenu.data.total_data,
            },
            data: listMenu.data
        }

        // set response
        response.data = datatable;
        return response;
    }

    async createMenu(body: menuSchema): Promise<RouteContBridgeSchema> {
        let response: RouteContBridgeSchema = {
            success: false,
            data: [],
            error: []
        }

        try {
            const result = await menuRepo.createMenu(body);
            response.success = true;
            response.data = result;
            return response;
        } catch (error: any) {
            response.error = error?.message;
            return response;
        }

    }

    async updateMenu(id: string, body: menuSchema | { [key: string]: any }): Promise<RouteContBridgeSchema> {
        let response: RouteContBridgeSchema = {
            success: false,
            data: [],
            error: []
        }

        try {
            const result = await menuRepo.updateMenu(id, body);
            response.success = true;
            response.data = result;
            return response;
        } catch (error: any) {
            response.error = error?.message;
            return response;
        }
    }
}

export default MenuController;