import { Op } from "sequelize";
import type { QueryParamsSchema } from "../../../interfaces/schemas/query-params.schema";

import Menus from "../../models/menus.model";
import type { menuSchema } from "../../../interfaces/schemas/masters/menu.schema";

class MenuRepository {

    async getMenuById(id: string) {
        return await Menus.findOne({
            attributes: ["id", "parent_id", "name", "label", "url", "icon", "created_at"],
            where: {
                deleted: false,
                id: id
            }
        });
    }

    async getMenuList(params: QueryParamsSchema) {
        // prepare data orderBy
        let order: [string, string] = ["created_at", "DESC"]; // default value
        if (params.order) {
            let _order = params.order.split(":");
            if (_order.length >= 2) {
                order = [_order[0], _order[1]?.toUpperCase()];
            }
        }

        // perform to query
        return await Menus.findAndCountAll({
            attributes: ["id", "parent_id", "name", "label", "url", "icon", "created_at"],
            where: {
                [Op.and]: [
                    { deleted: false },
                    {
                        [Op.or]: [
                            {
                                name: {
                                    [Op.iLike]: `%${params?.search}%`
                                }
                            },
                            {
                                label: {
                                    [Op.iLike]: `%${params?.search}%`
                                }
                            },
                            {
                                url: {
                                    [Op.iLike]: `%${params?.search}%`
                                }
                            }
                        ]
                    }
                ]
            },
            limit: params.limit,
            offset: (params.page - 1) * params.limit,
            order: [order]
        });
    }

    async createMenu(data: menuSchema) {
        return await Menus.create({ ...data });
    }

    async updateMenu(id: string, data: menuSchema | { [key: string]: any }) {
        return await Menus.update({
            ...data,
            updated_at: new Date()
        }, {
            where: { id }
        });
    }

}

export default MenuRepository;