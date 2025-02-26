import { Op } from "sequelize";
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
        // prepare data order
        let order: [string, string] = ["created_at", "DESC"]; // default value
        if (params.order) {
            let _order = params.order.split(":");
            if (_order.length >= 2) {
                order = [_order[0], _order[1]?.toUpperCase()];
            }
        }

        // perform to query
        return await Users.findAndCountAll({
            attributes: ["id", "username", "created_at"],
            where: {
                [Op.and]: [
                    { deleted: false },
                    {
                        [Op.or]: [
                            {
                                username: {
                                    [Op.iLike]: `${params?.search}`
                                }
                            }
                        ]
                    }
                ]
            },
            limit: params.limit,
            offset: (params.page - 1) * params.limit,
            order: [order],
            include: [
                {
                    model: UserProfiles,
                    attributes: ["fullname", "email", "phone", "address"],
                    where: {
                        [Op.or]: [
                            {
                                fullname: {
                                    [Op.iLike]: `${params?.search}`
                                }
                            },
                            {
                                email: {
                                    [Op.iLike]: `${params?.search}`
                                }
                            },
                            {
                                phone: {
                                    [Op.iLike]: `${params?.search}`
                                }
                            },
                            {
                                address: {
                                    [Op.iLike]: `${params?.search}`
                                }
                            }
                        ]
                    }
                },
                {
                    model: UserRoles,
                    attributes: ["name"],
                    where: {
                        [Op.or]: [
                            {
                                name: {
                                    [Op.iLike]: `${params?.search}`
                                }
                            }
                        ]
                    }
                }
            ]
        });
    }

}

export default UserRepository;