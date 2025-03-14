import type { Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import UserRepository from '../../applications/repos/masters/user.repo';

import ENV from '../../infras/environ';
import type { LoggedRequest } from '../schemas/user-property.schema';

const verifyBearerToken = async (req: LoggedRequest, res: Response, next: NextFunction): Promise<void> => {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ message: "Missing authorization header" });
        return;
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        res.status(401).json({ message: "Missing bearer token" });
        return;
    }

    // JWT authentication
    try {
        const decoded: any = verify(token, ENV.SECRET_KEY);
        (req as any).user = decoded;

        const user_repo = new UserRepository();

        // get user tenant
        let user_tenant: any = null;
        const tenant = await user_repo.getUserTenant(decoded?.id);
        if (tenant) user_tenant = tenant;

        // get user role
        let user_role: any = null;
        const role = await user_repo.getUserRole(decoded?.id);
        if (role) user_role = role;

        // get user branch
        let user_branch: any = null;
        const branch = await user_repo.getUserBranch(decoded?.id);
        if (branch) user_branch = branch;

        // send data into request for global access
        req.user_properties = {
            role: user_role?.role?.name ?? null,
            role_id: user_role?.role_id ?? null,
            tenant: user_tenant?.tenant?.name ?? null,
            tenant_id: user_tenant?.tenant_id ?? null,
            branch: user_branch?.branche?.name ?? null,
            branch_id: user_branch?.branch_id ?? null
        }

        // allow this user to access the route
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid access token" });
        return;
    }
};

export default verifyBearerToken;