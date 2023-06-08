import { StatusCodes } from 'http-status-codes';
import { UserPostModel } from '../models/userPosts';
import asyncHandler from 'express-async-handler';
import { Request, Response, NextFunction } from 'express';
import Logger from '../library/logger';

// getting all tasks
export const getAllTasks = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const tasks = await UserPostModel.find();
    Logger.log(tasks);
    res.status(StatusCodes.OK).json(tasks);
});

export const getAllTasksByUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const tasks = await UserPostModel.find({ createdBy: req.userId });
    Logger.log(tasks);
    res.status(StatusCodes.OK).json(tasks);
});

// creating a post task controller
export const createTask = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const createTask = await UserPostModel.create(req.body);
    const savedTask = await createTask.save();
    Logger.log(savedTask);
    res.status(StatusCodes.CREATED).json({ msg: 'Task posted successfully', data: savedTask });
});

// getting a single task from the DB
export const getASingleTask = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { id: taskID } = req.params;
    const singleTask = await UserPostModel.findOne({ _id: taskID });
    Logger.log(singleTask);
    if (!singleTask) res.status(StatusCodes.BAD_REQUEST).json({ msg: `Task with ${taskID} does not exist` });
    else res.status(StatusCodes.OK).json({ status: StatusCodes.OK, taskData: singleTask });
});

// updating a single task from the DB
export const updateASingleTask = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { id: taskID } = req.params;
    const updateTask = await UserPostModel.findOneAndUpdate({ _id: taskID }, req.body, { new: true, runValidators: true });
    Logger.log(updateTask);
    if (!updateTask) res.status(StatusCodes.BAD_REQUEST).json({ msg: `Task with ${taskID} does not exist` });
    else res.status(StatusCodes.OK).json({ status: StatusCodes.OK, taskData: updateTask });
});

// deleting a single task from the database
export const deleteATask = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { id: taskID } = req.params;
    const deleteTask = await UserPostModel.findOneAndDelete({ _id: taskID });
    Logger.warn(deleteTask);
    if (!deleteTask) res.status(StatusCodes.BAD_REQUEST).json({ msg: `Task with ${taskID} does not exist` });
    else res.status(StatusCodes.OK).json({ status: StatusCodes.OK, taskData: deleteTask });
});
