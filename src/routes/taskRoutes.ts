import express, { Request, Response, NextFunction } from 'express';
import { createTask } from "../controllers/taskCtrls";

const taskRoute = express.Router();

taskRoute.post('/', createTask);

export default taskRoute;
