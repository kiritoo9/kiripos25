import { Op } from "sequelize";
import type { QueryParamsSchema } from "../../../interfaces/schemas/query-params.schema";

import Tables from "../../models/tables.model";
import Tenants from "../../models/tenants.model";
import type { tableSchema } from "../../../interfaces/schemas/masters/table.schema";
import type { UserPropertySchema } from "../../../interfaces/schemas/user-property.schema";

class TableRepository {
    KEY_ROLE: string = "superadmin";

    async getTableById(id: string, user_properties: UserPropertySchema) {
        // define conditions
        let base_conditions: { [key: string]: any } = {
            deleted: false,
            id: id
        };
        if (user_properties.role?.toLowerCase() !== this.KEY_ROLE) {
            if (user_properties?.tenant_id !== undefined && user_properties.tenant_id) {
                base_conditions["tenant_id"] = user_properties.tenant_id;
            } else {
                return null;
            }
        }

        // perform to query
        return await Tables.findOne({
            attributes: ["id", "table_no", "max_person", "remark", "created_at"],
            where: base_conditions,
            include: [
                {
                    model: Tenants,
                    attributes: ["code", "name", "tagline", "description", "remark"]
                }
            ]
        });
    }

    async getTableList(params: QueryParamsSchema, user_properties: UserPropertySchema) {
        // prepare data orderBy
        let order: [string, string] = ["created_at", "DESC"]; // default value
        if (params.order) {
            let _order = params.order.split(":");
            if (_order.length >= 2) {
                order = [_order[0], _order[1]?.toUpperCase()];
            }
        }

        // define conditions
        let base_conditions: { [key: string]: any } = { deleted: false };
        if (user_properties.role?.toLowerCase() !== this.KEY_ROLE) {
            if (user_properties?.tenant_id !== undefined && user_properties.tenant_id) {
                base_conditions["tenant_id"] = user_properties.tenant_id;
            } else {
                return { count: 0, rows: [] };
            }
        }

        // perform to query
        return await Tables.findAndCountAll({
            attributes: ["id", "table_no", "max_person", "remark", "created_at"],
            where: {
                [Op.and]: [
                    base_conditions,
                    {
                        [Op.or]: [
                            {
                                table_no: {
                                    [Op.iLike]: `%${params?.search}%`
                                }
                            },
                            {
                                remark: {
                                    [Op.iLike]: `%${params?.search}%`
                                }
                            }
                        ]
                    }
                ]
            },
            include: [
                {
                    model: Tenants,
                    attributes: ["code", "name", "tagline"]
                }
            ],
            limit: params.limit,
            offset: (params.page - 1) * params.limit,
            order: [order]
        });
    }

    async createTable(data: tableSchema) {
        return await Tables.create({ ...data });
    }

    async updateTable(id: string, data: tableSchema | { [key: string]: any }) {
        return await Tables.update({
            ...data,
            updated_at: new Date()
        }, {
            where: { id }
        });
    }

}

export default TableRepository;