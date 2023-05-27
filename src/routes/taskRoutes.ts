import express, { Request, Response, NextFunction } from 'express';
import { getAllTasks, createTask } from "../controllers/taskCtrls";

const taskRoute = express.Router();

taskRoute.get('/alltasks', getAllTasks); 
taskRoute.post('/createtask', createTask);

export default taskRoute;
