import { v4 as uuidv4 } from "uuid";
import UserRepository from "../../repos/masters/user.repo";
import RoleRepository from "../../repos/masters/role.repo";

import type { DatatableSchema } from "../../../interfaces/schemas/datatable.schema";
import type { QueryParamsSchema } from "../../../interfaces/schemas/query-params.schema";
import type { RouteContBridgeSchema } from "../../../interfaces/schemas/routecont-bridge.schema";
import type { userSchema } from "../../../interfaces/schemas/masters/user.schema";
import BranchRepository from "../../repos/masters/branch.repo";

// load repositories
const userRepo = new UserRepository();
const roleRepo = new RoleRepository();
const branchRepo = new BranchRepository

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

        // check if data not found
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

    async createUser(body: userSchema): Promise<RouteContBridgeSchema> {
        let response: RouteContBridgeSchema = {
            success: false,
            data: null,
            error: null
        }

        // check existing username
        const username = await userRepo.getUserByUsername(body.username);
        if (username) {
            response.error = "Username is already exists";
            return response;
        }

        // check existing role
        const role = await roleRepo.getRoleById(body.role_id);
        if (!role) {
            response.error = "RoleID is not found, please check the data";
            return response;
        }

        // check existing branch
        const branch = await branchRepo.getBranchById(body.branch_id);
        if (!branch) {
            response.error = "BranchID is not found, please check the data";
            return response;
        }

        // perform to insert -> [users, user_profiles, user_roles, user_branches]
        // using transaction-commit way
        const user = {
            id: uuidv4(),
            username: body.username,
            password: body.password
        }

        const user_profile = {
            user_id: user.id,
            fullname: body.fullname,
            email: body.phone,
            phone: body.phone,
            address: body.address
        }

        const user_role = {
            user_id: user.id,
            role_id: body.role_id
        }

        const user_branch = {
            user_id: user.id,
            branch_id: body.branch_id,
            branch_head: body.branch_head
        }

        try {
            const result = await userRepo.createUserWithAttributes(
                user,
                user_profile,
                user_role,
                user_branch
            )
            // return response
            response.success = true;
            response.data = result;
            return response;
        } catch (error: any) {
            response.error = error?.message;
            return response;
        }
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