import Role from "../../../applications/models/roles.model";

/**
 * Defining data for seeds
 */
const roles = [
  {
    name: "admin",
    description: "admin",
    created_at: new Date(),
  }
];

/**
 * Perform to insert data
 */
export const insertRole = async () => {
  try {
    await Role.bulkCreate(roles, { ignoreDuplicates: true });
    console.log(`${new Date()} - All roles is successfully inserted`);
  } catch (error) {
    console.error(`Error when inserting data`, error);
  }
};