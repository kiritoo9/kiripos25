import ProductCategoryRepository from "../../repos/masters/product_category.repo";

import type { DatatableSchema } from "../../../interfaces/schemas/datatable.schema";
import type { QueryParamsSchema } from "../../../interfaces/schemas/query-params.schema";
import type { RouteContBridgeSchema } from "../../../interfaces/schemas/routecont-bridge.schema";
import type { productCategorySchema } from "../../../interfaces/schemas/masters/product_category.schema";
import type { UserPropertySchema } from "../../../interfaces/schemas/user-property.schema";

const pcRepo = new ProductCategoryRepository();

class ProductCategoryController {
    KEY_ROLE: string = "superadmin";

    async listProductCategory(params: QueryParamsSchema, user_properties: UserPropertySchema): Promise<RouteContBridgeSchema> {
        const data = await pcRepo.getProductCategoryList(params, user_properties);
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

    async productCategoryDetail(id: string, user_properties: UserPropertySchema): Promise<RouteContBridgeSchema> {
        let response: RouteContBridgeSchema = {
            success: false,
            data: null,
            error: "",
        }

        // check if data not found
        let data = await pcRepo.getProductCategoryById(id, user_properties);
        if (!data) {
            response.error = "Data not found";
            return response;
        }

        // set response
        response.success = true;
        response.data = data;
        return response;
    }

    async getTable(params: QueryParamsSchema, user_properties: UserPropertySchema): Promise<RouteContBridgeSchema> {
        // define data
        let response: RouteContBridgeSchema = {
            success: true,
            data: [],
            error: "",
        }

        // perform to get list data
        const list: RouteContBridgeSchema = await this.listProductCategory(params, user_properties);
        let datatable: DatatableSchema = {
            parameters: params,
            count: {
                total_page: list.data.total_page,
                total_data: list.data.total_data,
            },
            data: list.data
        }

        // set response
        response.data = datatable;
        return response;
    }

    async createProductCategory(body: productCategorySchema, user_properties: UserPropertySchema): Promise<RouteContBridgeSchema> {
        let response: RouteContBridgeSchema = {
            success: false,
            data: [],
            error: []
        }

        let error_tenant: boolean = false;
        if (user_properties.role?.toLowerCase() === this.KEY_ROLE) {
            if (body?.tenant_id === undefined || !body.tenant_id) error_tenant = true;
        } else {
            if (user_properties?.tenant_id === undefined || !user_properties.tenant_id) {
                error_tenant = true;
            } else {
                body.tenant_id = user_properties.tenant_id;
            }
        }

        if (error_tenant) {
            response.error = "TenantID is missing, please check your input";
            return response;
        }

        try {
            delete body.icon; // do not insert this field for now
            const result = await pcRepo.createProductCategory(body);
            response.success = true;
            response.data = result;
            return response;
        } catch (error: any) {
            response.error = error?.message;
            return response;
        }

    }

    async updateProductCategory(id: string, body: productCategorySchema | { [key: string]: any }, user_properties: UserPropertySchema): Promise<RouteContBridgeSchema> {
        let response: RouteContBridgeSchema = {
            success: false,
            data: [],
            error: []
        }

        let error_tenant: boolean = false;
        if (user_properties.role?.toLowerCase() === this.KEY_ROLE) {
            if (body?.tenant_id === undefined || !body.tenant_id) error_tenant = true;
        } else {
            if (user_properties?.tenant_id === undefined || !user_properties.tenant_id) {
                error_tenant = true;
            } else {
                body.tenant_id = user_properties.tenant_id;
            }
        }

        if (error_tenant) {
            response.error = "TenantID is missing, please check your input";
            return response;
        }

        try {
            delete body.icon; // do not update this field for now
            const result = await pcRepo.updateProductCategory(id, body);
            response.success = true;
            response.data = result;
            return response;
        } catch (error: any) {
            response.error = error?.message;
            return response;
        }
    }

}

export default ProductCategoryController;