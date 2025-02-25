import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

import Users from "../../../applications/models/users.model";
import UserProfiles from "../../../applications/models/user_profiles.model";
import UserBranches from "../../../applications/models/user_branches.model";
import UserRoles from "../../../applications/models/user_roles_model";

/**
 * Defining data for seeds
 */
const userId = uuidv4();
const users = [
    {
        id: userId,
        username: "admin",
        password: "kiripos123",
        created_at: new Date(),
    }
];

const userProfiles = [
    {
        user_id: userId,
        fullname: "Administrator",
        email: "admin@kiripos.com",
        phone: "081234567890",
        address: "Jl. Jendral Sudirman No. 1",
        created_at: new Date(),
    }
];

const userBranches = [
    {
        user_id: userId,
        branch_id: null,
        branch_head: true,
        created_at: new Date(),
    }
];

const userRoles = [
    {
        user_id: userId,
        role_id: null,
        created_at: new Date(),
    }
];

/**
 * Perform to insert data
 */
export const create = async (branches: any = [], roles: any = []) => {
    try {
        // hashing passwords for all user data
        for (let i = 0; i < users.length; i++) {
            users[i].password = await bcrypt.hash(users[i].password, 10);
        }

        await Users.bulkCreate(users, { ignoreDuplicates: true });
        await UserProfiles.bulkCreate(userProfiles, { ignoreDuplicates: true });

        if (branches.length > 0) {
            userBranches[0].branch_id = branches[0].id;
            await UserBranches.bulkCreate(userBranches, { ignoreDuplicates: true });
        }

        if (roles.length > 0) {
            userRoles[0].role_id = roles[0].id;
            await UserRoles.bulkCreate(userRoles, { ignoreDuplicates: true });
        }

        // show response
        console.log(`${new Date()} - All user is successfully created!`);
    } catch (error) {
        console.error(`Error when inserting data`, error);
    }
};