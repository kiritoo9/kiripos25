import Branches from "../../../applications/models/branches.model";

/**
 * Defining data for seeds
 */
const branches = [
    {
        name: "Head Office",
        phone: "0812838121",
        address: "Jl. Thamrin Sudirman, Jakarta Selatan - 1572",
        remark: "Branch for head office",
        created_at: new Date(),
    }
];

/**
 * Perform to insert data
 */
export const create = async () => {
    try {
        const response = await Branches.bulkCreate(branches, { ignoreDuplicates: true });
        const data = response.map(v => v.get({ plain: true }));
        console.log(`${new Date()} - All branches is successfully created!`);

        return data;
    } catch (error) {
        console.error(`Error when inserting data`, error);
    }
};