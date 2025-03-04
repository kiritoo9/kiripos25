import Roles from "../../../applications/models/roles.model";

/**
 * Defining data for seeds
 */
const roles = [
    {
        name: "superadmin",
        description: "Super Admin",
        created_at: new Date(),
    },
    {
        name: "admin",
        description: "Admin",
        created_at: new Date(),
    },
    {
        name: "staff",
        description: "Staff of tenant",
        created_at: new Date(),
    }
];

/**
 * Perform to insert data
 */
export const create = async () => {
    try {
        const response = await Roles.bulkCreate(roles, { ignoreDuplicates: true });
        const data = response.map(v => v.get({ plain: true }));
        console.log(`${new Date()} - All roles is successfully created!`);

        return data;
    } catch (error) {
        console.error(`Error when inserting data`, error);
    }
};