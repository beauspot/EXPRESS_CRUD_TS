import { StatusCodes } from 'http-status-codes';
import { UserPostModel } from '../models/userPosts';
import asyncHandler from 'express-async-handler';
import { Request, Response, NextFunction } from 'express';

// getting all tasks 
export const getAllTasks = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const tasks = await UserPostModel.find();
    console.log(tasks);
    res.status(StatusCodes.OK).json(tasks);
 })

// creating a post task controller
export const createTask = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const createTask = await UserPostModel.create(req.body);
    const savedTask = await createTask.save();
    console.log(savedTask);
    res.status(StatusCodes.CREATED).json({ msg: 'Task posted successfully', data: savedTask });
});

