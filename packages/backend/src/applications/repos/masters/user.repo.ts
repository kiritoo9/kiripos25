import Users from "../../models/users.model";
import UserProfiles from "../../models/user_profiles.model";
import UserBranches from "../../models/user_branches.model";
import UserRoles from "../../models/user_roles_model";

class UserRepository {

    async getUserByUsername(username: string) {
        return await Users.findOne({
            where: {
                deleted: false,
                username: username
            }
        });
    }

}

export default UserRepository;