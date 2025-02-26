import { Op } from "sequelize";
import type { QueryParamsSchema } from "../../../interfaces/schemas/query-params.schema";

import Roles from "../../models/roles.model";

class RoleRepository {

    async getRoleById(id: string) {
        return await Roles.findOne({
            attributes: ["id", "name", "description", "created_at"],
            where: {
                id: id
            }
        });
    }

    async getRoleList(params: QueryParamsSchema) {
        // prepare data order
        let order: [string, string] = ["created_at", "DESC"]; // default value
        if (params.order) {
            let _order = params.order.split(":");
            if (_order.length >= 2) {
                order = [_order[0], _order[1]?.toUpperCase()];
            }
        }

        // perform to query
        return await Roles.findAndCountAll({
            attributes: ["id", "name", "description", "created_at"],
            where: {
                [Op.or]: [
                    {
                        name: {
                            [Op.iLike]: `%${params?.search}%`
                        }
                    },
                    {
                        description: {
                            [Op.iLike]: `%${params?.search}%`
                        }
                    }
                ]
            },
            limit: params.limit,
            offset: (params.page - 1) * params.limit,
            order: [order]
        });
    }

}

export default RoleRepository;