import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

import UserRepository from "../../repos/masters/user.repo";
import TenantRepository from "../../repos/masters/tenant.repo";
import RoleRepository from "../../repos/masters/role.repo";

import type { DatatableSchema } from "../../../interfaces/schemas/datatable.schema";
import type { QueryParamsSchema } from "../../../interfaces/schemas/query-params.schema";
import type { RouteContBridgeSchema } from "../../../interfaces/schemas/routecont-bridge.schema";
import type { userSchema } from "../../../interfaces/schemas/masters/user.schema";
import type { UserPropertySchema } from "../../../interfaces/schemas/user-property.schema";
import BranchRepository from "../../repos/masters/branch.repo";

// load repositories
const userRepo = new UserRepository();
const tenantRepo = new TenantRepository();
const roleRepo = new RoleRepository();
const branchRepo = new BranchRepository

class UserController {

    async listUser(params: QueryParamsSchema, user_properties: UserPropertySchema | null = null): Promise<RouteContBridgeSchema> {
        const data = await userRepo.getUserList(params, user_properties);
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
            user_tenant: await userRepo.getUserTenant(id),
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

        // check existing tenant
        const tenant = await tenantRepo.getTenantById(body.tenant_id);
        if (tenant) {
            response.error = "TenantID is not found, please check the data";
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

        // validate password to not empty | undefiend | null
        if (body?.password === undefined || !body.password || body.password == "") {
            response.error = "Password cannot be empty";
            return response;
        }

        // perform to insert -> [users, user_profiles, user_roles, user_branches]
        // using transaction-commit way
        const user = {
            id: uuidv4(),
            username: body.username,
            password: await bcrypt.hash(body.password, 10)
        }

        const user_profile = {
            user_id: user.id,
            fullname: body.fullname,
            email: body.phone,
            phone: body.phone,
            address: body.address
        }

        const user_tenant = {
            user_id: user.id,
            tenant_id: body.tenant_id
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
                user_tenant,
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

    async updateUser(id: string, body: userSchema): Promise<RouteContBridgeSchema> {
        let response: RouteContBridgeSchema = {
            success: false,
            data: null,
            error: null
        }

        // check user exists by id
        const exists = await userRepo.getUserById(id);
        if (!exists) {
            response.code = 404; // define specific error code
            response.error = "Data is not found";
            return response;
        }

        // check duplicate username by id and username
        // if data not exists then check with only username [old-pattern]
        let username = await userRepo.getUserByUsername(body.username, id);
        if (!username) {
            username = await userRepo.getUserByUsername(body.username);
            if (username) {
                response.error = "Username is already exists";
                return response;
            }
        }

        // check existing tenant
        const tenant = await tenantRepo.getTenantById(body.tenant_id);
        if (tenant) {
            response.error = "TenantID is not found, please check the data";
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

        // preparing data to update -> [users, user_profiles, user_roles, user_branches]
        // using transaction-commit way
        let user: { [key: string]: any } = {
            username: body.username,
            updated_at: new Date()
        }
        if (body?.password !== undefined && body.password && body.password !== "") {
            user["password"] = await bcrypt.hash(body.password, 10);
        }

        const user_profile = {
            fullname: body.fullname,
            email: body.phone,
            phone: body.phone,
            address: body.address,
            updated_at: new Date()
        }

        const user_tenant = {
            tenant_id: body.tenant_id,
            updated_at: new Date()
        }

        const user_role = {
            role_id: body.role_id,
            updated_at: new Date()
        }

        const user_branch = {
            branch_id: body.branch_id,
            branch_head: body.branch_head,
            updated_at: new Date()
        }

        // perform to update
        try {
            const result = await userRepo.updateUserWithAttributes(
                id,
                user,
                user_tenant,
                user_profile,
                user_role,
                user_branch
            );

            // success condition
            response.data = result;
            response.success = true;
            return response;
        } catch (error: any) {
            response.error = error?.message;
            return response;
        }
    }

    async deleteUser(id: string): Promise<RouteContBridgeSchema> {
        let response: RouteContBridgeSchema = {
            success: false,
            data: null,
            error: null
        }

        // check user exists
        const exist = await userRepo.getUserById(id);
        if (!exist) {
            response.error = "Data is not found";
            response.code = 404; // define specific error code
            return response;
        }

        // preparing data to delete
        const today: Date = new Date();
        const user = {
            deleted: true,
            updated_at: today
        }

        const user_profile = {
            deleted: true,
            updated_at: today
        }

        const user_tenant = {
            deleted: true,
            updated_at: today
        }

        const user_role = {
            deleted: true,
            updated_at: today
        }

        const user_branch = {
            deleted: true,
            updated_at: today
        }

        // perform to delete data
        try {
            const result = await userRepo.updateUserWithAttributes(
                id,
                user,
                user_profile,
                user_tenant,
                user_role,
                user_branch
            );

            // succes condition
            response.success = true;
            response.data = result;
            return response;
        } catch (error: any) {
            response.error = error?.message;
            return response;
        }
    }

    async getTable(params: QueryParamsSchema, user_properties: UserPropertySchema | null = null): Promise<RouteContBridgeSchema> {
        // define data
        let response: RouteContBridgeSchema = {
            success: true,
            data: [],
            error: "",
        }

        // perform to get list data
        const listUser: RouteContBridgeSchema = await this.listUser(params, user_properties);
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