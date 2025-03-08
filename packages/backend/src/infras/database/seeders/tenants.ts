import Tenants from "../../../applications/models/tenants.model";

/**
 * Defining data for seeds
 */
const tenants = [
    {
        code: "SLLU8177",
        name: "KiriPOS Offical Store",
        slug: "kiripos-official-store",
        tagline: "Help your business easier",
        description: "Official store of KiriPOS version1.0",
        remark: "Main example tenant",
        status: "S2",
        created_at: new Date(),
    }
];

/**
 * Perform to insert data
 */
export const create = async () => {
    try {
        const response = await Tenants.bulkCreate(tenants, { ignoreDuplicates: true });
        const data = response.map(v => v.get({ plain: true }));
        console.log(`${new Date()} - All tenants is successfully created!`);

        return data;
    } catch (error) {
        console.error(`Error when inserting data`, error);
    }
};