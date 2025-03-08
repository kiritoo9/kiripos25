import ProductRepository from "../../repos/masters/product.repo";

import type { DatatableSchema } from "../../../interfaces/schemas/datatable.schema";
import type { QueryParamsSchema } from "../../../interfaces/schemas/query-params.schema";
import type { RouteContBridgeSchema } from "../../../interfaces/schemas/routecont-bridge.schema";
import type { productSchema } from "../../../interfaces/schemas/masters/product.schema";
import type { UserPropertySchema } from "../../../interfaces/schemas/user-property.schema";
import { upload, pop } from "../../../utils/upload";
import type { UploadOptionSchema } from "../../../interfaces/schemas/upload.schema";

const productRepo = new ProductRepository();

class ProductController {
    KEY_ROLE: string = "superadmin";

    async listProduct(params: QueryParamsSchema, user_properties: UserPropertySchema): Promise<RouteContBridgeSchema> {
        const data = await productRepo.getProductList(params, user_properties);
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

    async productDetail(id: string, user_properties: UserPropertySchema): Promise<RouteContBridgeSchema> {
        let response: RouteContBridgeSchema = {
            success: false,
            data: null,
            error: "",
        }

        // check if data not found
        let data: any = await productRepo.getProductById(id, user_properties);
        if (!data) {
            response.error = "Data not found";
            return response;
        }

        // add full path of image
        if (data.images) {
            let images: string[] = JSON.parse(data.images);
            for (let i = 0; i < images.length; i++) {
                images[i] = pop("products", images[i]);
            }
            data.images = images;
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
        const list: RouteContBridgeSchema = await this.listProduct(params, user_properties);
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

    async createProduct(body: productSchema, user_properties: UserPropertySchema): Promise<RouteContBridgeSchema> {
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
            // check existing product code
            const product = await productRepo.getProductByCode(body.code, user_properties);
            if (product) {
                response.error = "Code is already taken, please try another one";
                return response;
            }

            // upload images
            let images: string[] | string | null | undefined = body.images;
            if (images === undefined || !images) {
                delete body.images; // remove from inserting process
            } else if (Array.isArray(images)) {
                let image_strings: string[] = [];
                const upload_options: UploadOptionSchema = {
                    dir: "products",
                    file_name: body.code
                }
                for (let i = 0; i < images.length; i++) {
                    const file_name: string = upload(images[i], upload_options);
                    image_strings.push(file_name);
                }
                if (image_strings.length > 0) body.images = JSON.stringify(image_strings);
            }

            // perform to insert product
            const result = await productRepo.createProduct(body);
            response.success = true;
            response.data = result;
            return response;
        } catch (error: any) {
            response.error = error?.message;
            return response;
        }

    }

    async updateProduct(id: string, body: productSchema | { [key: string]: any }, user_properties: UserPropertySchema): Promise<RouteContBridgeSchema> {
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
            // check existing product code
            let product = await productRepo.getProductByCode(body.code, user_properties, id);
            if (!product) {
                product = await productRepo.getProductByCode(body.code, user_properties);
                if (product) {
                    response.error = "Code is already taken, please try another one";
                    return response;
                }
            }

            const result = await productRepo.updateProduct(id, body);
            response.success = true;
            response.data = result;
            return response;
        } catch (error: any) {
            response.error = error?.message;
            return response;
        }
    }

    async deleteProduct(id: string): Promise<RouteContBridgeSchema> {
        let response: RouteContBridgeSchema = {
            success: false,
            data: [],
            error: []
        }

        try {
            const result = await productRepo.updateProduct(id, {
                deleted: true,
                updated_at: new Date()
            });
            response.success = true;
            response.data = result;
            return response;
        } catch (error: any) {
            response.error = error?.message;
            return response;
        }
    }

}

export default ProductController;