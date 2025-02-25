import type { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import ENV from '../../infras/environ';

const verifyBearerToken = (req: Request, res: Response, next: NextFunction): void => {
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
        const decoded = verify(token, ENV.SECRET_KEY);
        (req as any).user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid access token" });
        return;
    }
};

export default verifyBearerToken;