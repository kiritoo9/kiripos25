import { Op } from "sequelize";
import type { QueryParamsSchema } from "../../../interfaces/schemas/query-params.schema";

import Products from "../../models/products.model";
import Tenants from "../../models/tenants.model";
import type { productSchema } from "../../../interfaces/schemas/masters/product.schema";
import type { UserPropertySchema } from "../../../interfaces/schemas/user-property.schema";
import ProductCategories from "../../models/product_categories.model";

class ProductRepository {
    KEY_ROLE: string = "superadmin";

    async getProductById(id: string, user_properties: UserPropertySchema) {
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
        return await Products.findOne({
            attributes: ["id", "code", "name", "capital_price", "sell_price", "description", "details", "images", "status", "tags", "created_at"],
            where: base_conditions,
            include: [
                {
                    model: ProductCategories,
                    attributes: ["name", "description"]
                },
                {
                    model: Tenants,
                    attributes: ["code", "name", "tagline", "description", "remark"]
                }
            ]
        });
    }

    async getProductByCode(code: string, user_properties: UserPropertySchema, id: string | null = null) {
        // define conditions
        let base_conditions: { [key: string]: any } = {
            deleted: false,
            code: code
        };
        if (id) base_conditions["id"] = id;
        if (user_properties.role?.toLowerCase() !== this.KEY_ROLE) {
            if (user_properties?.tenant_id !== undefined && user_properties.tenant_id) {
                base_conditions["tenant_id"] = user_properties.tenant_id;
            } else {
                return null;
            }
        }

        // perform to query
        return await Products.findOne({
            attributes: ["id", "code", "name", "capital_price", "sell_price", "description", "details", "images", "status", "tags", "created_at"],
            where: base_conditions,
            include: [
                {
                    model: ProductCategories,
                    attributes: ["name", "description"]
                },
                {
                    model: Tenants,
                    attributes: ["code", "name", "tagline", "description", "remark"]
                }
            ]
        });
    }

    async getProductList(params: QueryParamsSchema, user_properties: UserPropertySchema) {
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
        return await Products.findAndCountAll({
            attributes: ["id", "code", "name", "capital_price", "sell_price", "description", "status", "created_at"],
            where: {
                [Op.and]: [
                    base_conditions,
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
                    model: ProductCategories,
                    attributes: ["name", "description"]
                },
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

    async createProduct(data: productSchema) {
        return await Products.create({ ...data });
    }

    async updateProduct(id: string, data: productSchema | { [key: string]: any }) {
        return await Products.update({
            ...data,
            updated_at: new Date()
        }, {
            where: { id }
        });
    }

}

export default ProductRepository;