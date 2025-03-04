import { Op } from "sequelize";
import type { QueryParamsSchema } from "../../../interfaces/schemas/query-params.schema";

import RoleMenus from "../../models/role_menus.model";
import type { roleMenuSchema } from "../../../interfaces/schemas/masters/role_menu.schema";
import Menus from "../../models/menus.model";
import Roles from "../../models/roles.model";

class RoleMenuRepository {

    async getRoleMenuById(id: string, role_id: string | null = null) {
        let where: { [key: string]: any } = {
            deleted: false,
            id: id
        }
        if (role_id) where["role_id"] = role_id;
        return await RoleMenus.findOne({
            attributes: ["id", "role_id", "menu_id", "act_view", "act_detail", "act_create", "act_update", "act_delete", "created_at"],
            where
        });
    }

    async getRoleMenuList(role_id: string, params: QueryParamsSchema) {
        // prepare data orderBy
        let order: [string, string] = ["created_at", "DESC"]; // default value
        if (params.order) {
            let _order = params.order.split(":");
            if (_order.length >= 2) {
                order = [_order[0], _order[1]?.toUpperCase()];
            }
        }

        // perform to query
        return await RoleMenus.findAndCountAll({
            attributes: ["id", "role_id", "menu_id", "act_view", "act_detail", "act_create", "act_update", "act_delete", "created_at"],
            where: {
                deleted: false,
                role_id
            },
            include: [
                {
                    model: Menus,
                    attributes: ["name", "label"]
                },
                {
                    model: Roles,
                    attributes: ["name"]
                }
            ],
            limit: params.limit,
            offset: (params.page - 1) * params.limit,
            order: [order]
        });
    }

    async createRoleMenu(data: roleMenuSchema) {
        return await RoleMenus.create({ ...data });
    }

    async updateRoleMenu(id: string, data: roleMenuSchema | { [key: string]: any }) {
        return await RoleMenus.update({
            ...data,
            updated_at: new Date()
        }, {
            where: { id }
        });
    }

}

export default RoleMenuRepository;