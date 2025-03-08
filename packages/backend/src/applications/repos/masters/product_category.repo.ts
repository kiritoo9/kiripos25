import { Op } from "sequelize";
import type { QueryParamsSchema } from "../../../interfaces/schemas/query-params.schema";

import ProductCategories from "../../models/product_categories.model";
import Tenants from "../../models/tenants.model";
import type { productCategorySchema } from "../../../interfaces/schemas/masters/product_category.schema";
import type { UserPropertySchema } from "../../../interfaces/schemas/user-property.schema";

class ProductCategoryRepository {
    KEY_ROLE: string = "superadmin";

    async getProductCategoryById(id: string, user_properties: UserPropertySchema) {
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
        return await ProductCategories.findOne({
            attributes: ["id", "name", "description", "icon", "created_at"],
            where: base_conditions,
            include: [
                {
                    model: Tenants,
                    attributes: ["code", "name", "tagline", "description", "remark"]
                }
            ]
        });
    }

    async getProductCategoryList(params: QueryParamsSchema, user_properties: UserPropertySchema) {
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
        return await ProductCategories.findAndCountAll({
            attributes: ["id", "name", "description", "icon", "created_at"],
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
                                description: {
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

    async createProductCategory(data: productCategorySchema) {
        return await ProductCategories.create({ ...data });
    }

    async updateProductCategory(id: string, data: productCategorySchema | { [key: string]: any }) {
        return await ProductCategories.update({
            ...data,
            updated_at: new Date()
        }, {
            where: { id }
        });
    }

}

export default ProductCategoryRepository;