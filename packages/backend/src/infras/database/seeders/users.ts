import Users from "../../../applications/models/users.model";

/**
 * Defining data for seeds
 */
const users = [
    {
        name: "admin",
        description: "admin",
        created_at: new Date(),
    }
];

/**
 * Perform to insert data
 */
export const create = async () => {
    try {
        await Users.bulkCreate(users, { ignoreDuplicates: true });
        console.log(`${new Date()} - All user is successfully created!`);
    } catch (error) {
        console.error(`Error when inserting data`, error);
    }
};