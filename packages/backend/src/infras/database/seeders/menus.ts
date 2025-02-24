import Menus from "../../../applications/models/menus.model";
import RoleMenus from "../../../applications/models/role_menus.model";
import { v4 as uuidv4 } from "uuid";

/**
 * Defining data for seeds
 */
const masterId = uuidv4();
const menuId = uuidv4();
const roleId = uuidv4();
const accessControlId = uuidv4();
const userId = uuidv4();

const menus = [
    {
        id: uuidv4(),
        parent_id: null,
        label: "Dashboard",
        name: "dashboard",
        url: "/dashboard",
        icon: "fa fa-dashboard", // assumed using font-awesome
        created_at: new Date(),
    },
    {
        id: masterId, // fill id 'cause the id will used in another data
        parent_id: null,
        label: "Master",
        name: "master",
        url: "#", // flag as header of menu
        icon: "fa fa-database", // assumed using font-awesome
        created_at: new Date(),
    },
    {
        id: menuId, // fill id 'cause the id will used in another data
        parent_id: masterId,
        label: "Menu",
        name: "master.menu",
        url: "/master/menu",
        icon: "fa fa-bars", // assumed using font-awesome
        created_at: new Date(),
    },
    {
        id: roleId, // fill id 'cause the id will used in another data
        parent_id: masterId,
        label: "Role",
        name: "master.role",
        url: "/master/role",
        icon: "fa fa-cubes", // assumed using font-awesome
        created_at: new Date(),
    },
    {
        id: accessControlId, // fill id 'cause the id will used in another data
        parent_id: masterId,
        label: "Access Control",
        name: "master.access_control",
        url: "/master/access_control",
        icon: "fa fa-key", // assumed using font-awesome
        created_at: new Date(),
    },
    {
        id: userId, // fill id 'cause the id will used in another data
        parent_id: masterId,
        label: "User",
        name: "master.user",
        url: "/master/user",
        icon: "fa fa-users", // assumed using font-awesome
        created_at: new Date(),
    }
];

/**
 * Perform to insert data
 */
export const create = async (dataRoles: any = []) => {
    try {
        // insert master menu
        await Menus.bulkCreate(menus, { ignoreDuplicates: true });

        // prepare and insert access control of each menu
        let accessControl = [];
        for (let i = 0; i < dataRoles.length; i++) {
            for (let j = 0; j < menus.length; j++) {
                accessControl.push({
                    role_id: dataRoles[i].id,
                    menu_id: menus[j].id,
                    act_view: true,
                    act_detail: true,
                    act_create: true,
                    act_update: true,
                    act_delete: true,
                    created_at: new Date(),
                });
            }
        }
        await RoleMenus.bulkCreate(accessControl, { ignoreDuplicates: true });
        console.log(`${new Date()} - All menus is successfully created!`);
    } catch (error) {
        console.error(`Error when inserting data`, error);
    }
};