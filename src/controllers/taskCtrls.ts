import { StatusCodes } from 'http-status-codes';
import { UserPostModel } from '../models/userPosts';
import asyncHandler from 'express-async-handler';
import { Request, Response, NextFunction } from 'express';

// creating a post task controller
export const createTask = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const createTask = await UserPostModel.create(req.body);
    res.status(StatusCodes.OK).json({ createTask });
});


