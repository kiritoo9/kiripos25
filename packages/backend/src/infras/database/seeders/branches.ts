import Branches from "../../../applications/models/branches.model";

/**
 * Defining data for seeds
 */
const branches = [
    {
        tenant_id: null,
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
export const create = async (tenants: any = []) => {
    try {
        if (tenants.length > 0) {
            for (let i = 0; i < branches.length; i++) {
                branches[i].tenant_id = tenants[0]?.id;
            }
        }

        const response = await Branches.bulkCreate(branches, { ignoreDuplicates: true });
        const data = response.map(v => v.get({ plain: true }));
        console.log(`${new Date()} - All branches is successfully created!`);

        return data;
    } catch (error) {
        console.error(`Error when inserting data`, error);
    }
};