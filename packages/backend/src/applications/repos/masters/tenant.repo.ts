import { Op } from "sequelize";
import type { QueryParamsSchema } from "../../../interfaces/schemas/query-params.schema";

import Tenants from "../../models/tenants.model";
import type { tenantSchema } from "../../../interfaces/schemas/masters/tenant.schema";

class TenantRepository {

    async getTenantById(id: string) {
        return await Tenants.findOne({
            attributes: ["id", "name", "code", "slug", "tagline", "description", "status", "photo", "banner", "remark", "created_at"],
            where: {
                deleted: false,
                id: id
            }
        });
    }

    async getTenantList(params: QueryParamsSchema) {
        // prepare data orderBy
        let order: [string, string] = ["created_at", "DESC"]; // default value
        if (params.order) {
            let _order = params.order.split(":");
            if (_order.length >= 2) {
                order = [_order[0], _order[1]?.toUpperCase()];
            }
        }

        // perform to query
        return await Tenants.findAndCountAll({
            attributes: ["id", "name", "code", "slug", "tagline", "description", "status", "remark", "created_at"],
            where: {
                [Op.and]: [
                    { deleted: false },
                    {
                        [Op.or]: [
                            {
                                code: {
                                    [Op.iLike]: `%${params?.search}%`
                                }
                            },
                            {
                                name: {
                                    [Op.iLike]: `%${params?.search}%`
                                }
                            },
                            {
                                tagline: {
                                    [Op.iLike]: `%${params?.search}%`
                                }
                            },
                            {
                                description: {
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

    async createTenant(data: tenantSchema) {
        return await Tenants.create({ ...data });
    }

    async updateTenant(id: string, data: tenantSchema | { [key: string]: any }) {
        return await Tenants.update({
            ...data,
            updated_at: new Date()
        }, {
            where: { id }
        });
    }

}

export default TenantRepository;