import { Op } from "sequelize";
import type { QueryParamsSchema } from "../../../interfaces/schemas/query-params.schema";

import Branches from "../../models/branches.model";

class RoleRepository {

    async getBranchById(id: string) {
        return await Branches.findOne({
            attributes: ["id", "name", "phone", "address", "remark", "created_at"],
            where: {
                deleted: false,
                id: id
            }
        });
    }

    async getBranchList(params: QueryParamsSchema) {
        // prepare data order
        let order: [string, string] = ["created_at", "DESC"]; // default value
        if (params.order) {
            let _order = params.order.split(":");
            if (_order.length >= 2) {
                order = [_order[0], _order[1]?.toUpperCase()];
            }
        }

        // perform to query
        return await Branches.findAndCountAll({
            attributes: ["id", "name", "phone", "address", "remark", "created_at"],
            where: {
                [Op.or]: [
                    {
                        name: {
                            [Op.iLike]: `%${params?.search}%`
                        }
                    },
                    {
                        phone: {
                            [Op.iLike]: `%${params?.search}%`
                        }
                    },
                    {
                        address: {
                            [Op.iLike]: `%${params?.search}%`
                        }
                    },
                    {
                        remark: {
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