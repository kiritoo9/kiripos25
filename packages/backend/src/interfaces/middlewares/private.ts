import type { Request, Response, NextFunction } from 'express';
import type { LoggedRequest, UserPropertySchema } from '../schemas/user-property.schema';

const privateRoute = (req: Request, res: Response, next: NextFunction): void => {
    const user_properties: UserPropertySchema = (req as LoggedRequest).user_properties;
    if (user_properties.role?.toLowerCase() !== "superadmin") {
        res.status(401).json({ message: "This route is private, you cannot access this one" });
        return;
    }
    return next();
};

export default privateRoute;