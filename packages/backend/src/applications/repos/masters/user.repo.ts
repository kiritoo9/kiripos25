import { Op } from "sequelize";
import type { QueryParamsSchema } from "../../../interfaces/schemas/query-params.schema";

import Users from "../../models/users.model";
import UserProfiles from "../../models/user_profiles.model";
import UserTenants from "../../models/user_tenants.model";
import UserBranches from "../../models/user_branches.model";
import UserRoles from "../../models/user_roles_model";
import Roles from "../../models/roles.model";
import Branches from "../../models/branches.model";
import sequelize from "../../../infras/database/sequelize";
import Tenants from "../../models/tenants.model";
import type { UserPropertySchema } from "../../../interfaces/schemas/user-property.schema";

class UserRepository {

    async getUserByUsername(username: string, id: string | null = null) {
        let where: { [key: string]: any } = {
            deleted: false,
            username: username
        }
        if (id) where["id"] = id;
        return await Users.findOne({ where });
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

    async getUserTenant(user_id: string) {
        return await UserTenants.findOne({
            attributes: ["id", "tenant_id", "created_at"],
            where: {
                deleted: false,
                user_id: user_id
            },
            include: [
                {
                    model: Tenants,
                    attributes: ["code", "name", "tagline", "description", "remark", "photo", "banner"]
                }
            ]
        })
    }

    async getUserRole(user_id: string) {
        return await UserRoles.findOne({
            attributes: ["id", "role_id", "created_at"],
            where: {
                deleted: false,
                user_id: user_id
            },
            include: [
                {
                    model: Roles,
                    attributes: ["name"]
                }
            ]
        });
    }

    async getUserBranch(user_id: string) {
        return await UserBranches.findOne({
            attributes: ["id", "branch_id", "branch_head", "created_at"],
            where: {
                deleted: false,
                user_id: user_id
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

    async getUserList(params: QueryParamsSchema, user_properties: UserPropertySchema | null = null) {
        // prepare data orderBy
        let order: [string, string] = ["created_at", "DESC"]; // default value
        if (params.order) {
            let _order = params.order.split(":");
            if (_order.length >= 2) {
                order = [_order[0], _order[1]?.toUpperCase()];
            }
        }

        // define conditions
        let basic_conditions: { [key: string]: any } = {
            deleted: false
        }
        if (user_properties) {
            if (user_properties?.role?.toLowerCase() !== "superadmin") {
                // this will force to get data based on user branch and tenant
                // except superadmin
            }
        }

        // perform to query
        return await Users.findAndCountAll({
            attributes: ["id", "username", "created_at"],
            where: {
                [Op.and]: [
                    basic_conditions,
                    {
                        [Op.or]: [
                            {
                                username: {
                                    [Op.iLike]: `%${params?.search}%`
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
                                    [Op.iLike]: `%${params?.search}%`
                                }
                            },
                            {
                                email: {
                                    [Op.iLike]: `%${params?.search}%`
                                }
                            },
                            {
                                phone: {
                                    [Op.iLike]: `%${params?.search}%`
                                }
                            },
                            {
                                address: {
                                    [Op.iLike]: `%${params?.search}%`
                                }
                            }
                        ]
                    }
                },
                {
                    model: UserRoles,
                    attributes: ["id", "role_id"],
                    include: [
                        {
                            model: Roles,
                            attributes: ["name"],
                        }
                    ]
                }
            ]
        });
    }

    async createUserWithAttributes(
        user: { [key: string]: any },
        user_profile: { [key: string]: any },
        user_tenant: { [key: string]: any },
        user_role: { [key: string]: any },
        user_branch: { [key: string]: any }
    ) {
        const transaction = await sequelize.transaction();
        try {
            // preparing to insert with transaction anchor
            const user_result = await Users.create(user, { transaction });
            const user_tenant_result = await UserTenants.create(user_tenant, { transaction });
            const user_profile_result = await UserProfiles.create(user_profile, { transaction });
            const user_role_result = await UserRoles.create(user_role, { transaction });
            const user_branch_result = await UserBranches.create(user_branch, { transaction });

            // start querying
            await transaction.commit();
            return {
                user: user_result,
                user_tenant: user_tenant_result,
                user_profile: user_profile_result,
                user_role: user_role_result,
                user_branch: user_branch_result
            }
        } catch (error) {
            transaction.rollback();
            throw error;
        }
    }

    async updateUserWithAttributes(
        id: string,
        user: { [key: string]: any },
        user_profile: { [key: string]: any },
        user_tenant: { [key: string]: any },
        user_role: { [key: string]: any },
        user_branch: { [key: string]: any }
    ) {
        const transaction = await sequelize.transaction();
        try {
            // preparing to insert with transaction anchor
            const user_result = await Users.update(user, { where: { id }, transaction });
            const user_tenant_result = await UserTenants.update(user_tenant, { where: { user_id: id }, transaction });
            const user_profile_result = await UserProfiles.update(user_profile, { where: { user_id: id }, transaction });
            const user_role_result = await UserRoles.update(user_role, { where: { user_id: id }, transaction });
            const user_branch_result = await UserBranches.update(user_branch, { where: { user_id: id }, transaction });

            // start querying
            await transaction.commit();
            return {
                user: user_result,
                user_tenant: user_tenant_result,
                user_profile: user_profile_result,
                user_role: user_role_result,
                user_branch: user_branch_result
            }
        } catch (error) {
            transaction.rollback();
            throw error;
        }
    }

}

export default UserRepository;