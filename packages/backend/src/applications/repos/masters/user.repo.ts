import type { QueryParamsSchema } from "../../../interfaces/schemas/query-params.schema";

import Users from "../../models/users.model";
import UserProfiles from "../../models/user_profiles.model";
import UserBranches from "../../models/user_branches.model";
import UserRoles from "../../models/user_roles_model";
import Roles from "../../models/roles.model";
import Branches from "../../models/branches.model";

class UserRepository {

    async getUserByUsername(username: string) {
        return await Users.findOne({
            where: {
                deleted: false,
                username: username
            }
        });
    }

    async getUserById(id: string) {
        return await Users.findOne({
            attributes: ["id", "username", "created_at"],
            where: {
                deleted: false,
                id: id
            }
        });
    }

    async getUserProfile(id: string) {
        return await UserProfiles.findOne({
            attributes: ["id", "fullname", "email", "phone", "address", "created_at"],
            where: {
                deleted: false,
                user_id: id
            }
        });
    }

    async getUserRole(id: string) {
        return await UserRoles.findOne({
            attributes: ["id", "role_id", "created_at"],
            where: {
                deleted: false,
                user_id: id
            },
            include: [
                {
                    model: Roles,
                    attributes: ["name"]
                }
            ]
        });
    }

    async getUserBranch(id: string) {
        return await UserBranches.findOne({
            attributes: ["id", "branch_id", "branch_head", "created_at"],
            where: {
                deleted: false,
                user_id: id
            },
            include: [
                {
                    model: Branches,
                    attributes: ["name"],
                    where: {
                        deleted: false
                    }
                }
            ]
        });
    }

    async getUserList(params: QueryParamsSchema) {
        return await Users.findAndCountAll({
            where: {
                deleted: false
            },
            limit: params.limit,
            offset: (params.page - 1) * params.limit
        });
    }

}

export default UserRepository;