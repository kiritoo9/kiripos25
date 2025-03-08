import { Op } from "sequelize";
import type { QueryParamsSchema } from "../../../interfaces/schemas/query-params.schema";

import Customers from "../../models/customers.model";
import Tenants from "../../models/tenants.model";
import type { customerSchema } from "../../../interfaces/schemas/masters/customer.schema";
import type { UserPropertySchema } from "../../../interfaces/schemas/user-property.schema";

class CustomerRepository {
    KEY_ROLE: string = "superadmin";

    async getCustomerById(id: string, user_properties: UserPropertySchema) {
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
        return await Customers.findOne({
            attributes: ["id", "name", "phone", "email", "address", "gender", "range_of_age", "remark", "created_at"],
            where: base_conditions,
            include: [
                {
                    model: Tenants,
                    attributes: ["code", "name", "tagline", "description", "remark"]
                }
            ]
        });
    }

    async getCustomerList(params: QueryParamsSchema, user_properties: UserPropertySchema) {
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
        return await Customers.findAndCountAll({
            attributes: ["id", "name", "phone", "email", "address", "remark", "created_at"],
            where: {
                [Op.and]: [
                    base_conditions,
                    {
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
                                email: {
                                    [Op.iLike]: `%${params?.search}%`
                                }
                            },
                            {
                                address: {
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

    async createCustomer(data: customerSchema) {
        return await Customers.create({ ...data });
    }

    async updateCustomer(id: string, data: customerSchema | { [key: string]: any }) {
        return await Customers.update({
            ...data,
            updated_at: new Date()
        }, {
            where: { id }
        });
    }

}

export default CustomerRepository;