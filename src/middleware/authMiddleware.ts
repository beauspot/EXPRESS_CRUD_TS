import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import UnauthenticatedError from '../errors/unauthenticated';
import { StatusCodes } from 'http-status-codes';
import asyncHandler from 'express-async-handler';
import dotenv from 'dotenv';

dotenv.config();

declare global {
    namespace Express {
        interface Request {
            user?: {
                userId: string;
                name: string;
                role: string;
            };
        }
    }
}

/* interface AuthenticatedRequest extends Request {
    user: {
        userId: string;
        name: string;
        role: string;
    };
} */

export const authMiddleware = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // check header or url parameters or post parameters for token
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) throw new UnauthenticatedError('User authentication failed.', StatusCodes.UNAUTHORIZED);

    const token = authHeader.split(' ')[1];

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET!) as {
            userId: string;
            name: string;
            role: string;
        };
        console.log(payload);
        // attach the user request object
        req.user = {
            userId: payload.userId,
            name: payload.name,
            role: payload.role
        };
        next();
    } catch (error) {
        throw new UnauthenticatedError('InvalidToken', StatusCodes.UNAUTHORIZED);
    }
});
