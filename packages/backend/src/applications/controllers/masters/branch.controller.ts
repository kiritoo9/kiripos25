import BranchRepository from "../../repos/masters/branch.repo";

import type { DatatableSchema } from "../../../interfaces/schemas/datatable.schema";
import type { QueryParamsSchema } from "../../../interfaces/schemas/query-params.schema";
import type { RouteContBridgeSchema } from "../../../interfaces/schemas/routecont-bridge.schema";
import type { branchSchema } from "../../../interfaces/schemas/masters/branch.schema";

const branchRepo = new BranchRepository();

class BranchController {

    async listBranch(params: QueryParamsSchema): Promise<RouteContBridgeSchema> {
        const data = await branchRepo.getBranchList(params);
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

    async branchDetail(id: string): Promise<RouteContBridgeSchema> {
        let response: RouteContBridgeSchema = {
            success: false,
            data: null,
            error: "",
        }

        // check if data not found
        let branch = await branchRepo.getBranchById(id);
        if (!branch) {
            response.error = "Branch not found";
            return response;
        }

        // set response
        response.success = true;
        response.data = branch;
        return response;
    }

    async getTable(params: QueryParamsSchema): Promise<RouteContBridgeSchema> {
        // define data
        let response: RouteContBridgeSchema = {
            success: true,
            data: [],
            error: "",
        }

        // perform to get list data
        const listBranch: RouteContBridgeSchema = await this.listBranch(params);
        let datatable: DatatableSchema = {
            parameters: params,
            count: {
                total_page: listBranch.data.total_page,
                total_data: listBranch.data.total_data,
            },
            data: listBranch.data
        }

        // set response
        response.data = datatable;
        return response;
    }

    async createBranch(body: branchSchema): Promise<RouteContBridgeSchema> {
        let response: RouteContBridgeSchema = {
            success: false,
            data: [],
            error: []
        }

        try {
            const result = await branchRepo.createBranch(body);
            response.success = true;
            response.data = result;
            return response;
        } catch (error: any) {
            response.error = error?.message;
            return response;
        }

    }

    async updateBranch(id: string, body: branchSchema | { [key: string]: any }): Promise<RouteContBridgeSchema> {
        let response: RouteContBridgeSchema = {
            success: false,
            data: [],
            error: []
        }

        try {
            const result = await branchRepo.updateBranch(id, body);
            response.success = true;
            response.data = result;
            return response;
        } catch (error: any) {
            response.error = error?.message;
            return response;
        }
    }

}

export default BranchController;