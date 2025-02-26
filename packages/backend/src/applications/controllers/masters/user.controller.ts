import UserRepository from "../../repos/masters/user.repo";

import type { DatatableSchema } from "../../../interfaces/schemas/datatable.schema";
import type { QueryParamsSchema } from "../../../interfaces/schemas/query-params.schema";
import type { RouteContBridgeSchema } from "../../../interfaces/schemas/routecont-bridge.schema";

const userRepo = new UserRepository();

class UserController {

    async listUser(params: QueryParamsSchema): Promise<RouteContBridgeSchema> {
        const data = await userRepo.getUserList(params);
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

    async userDetail(id: string): Promise<RouteContBridgeSchema> {
        let response: RouteContBridgeSchema = {
            success: false,
            data: null,
            error: "",
        }

        // check if user not found
        let user = await userRepo.getUserById(id);
        if (!user) {
            response.error = "User not found";
            return response;
        }

        // set response
        response.success = true;
        response.data = {
            user: user,
            user_profile: await userRepo.getUserProfile(id),
            user_role: await userRepo.getUserRole(id),
            user_branch: await userRepo.getUserBranch(id),
        }
        return response;
    }

    async createUser() {

    }

    async updateUser() {

    }

    async deleteUser() {

    }

    async getTable(params: QueryParamsSchema): Promise<RouteContBridgeSchema> {
        // define data
        let response: RouteContBridgeSchema = {
            success: true,
            data: [],
            error: "",
        }

        // perform to get list data
        const listUser: RouteContBridgeSchema = await this.listUser(params);
        let datatable: DatatableSchema = {
            parameters: params,
            count: {
                total_page: listUser.data.total_page,
                total_data: listUser.data.total_data,
            },
            data: listUser.data
        }

        // set response
        response.data = datatable;
        return response;
    }

}

export default UserController;