import express from 'express';
import { getAllTasks, createTask, getASingleTask, updateASingleTask, deleteATask } from '../controllers/taskCtrls';
import { authMiddleware } from '../middleware/authMiddleware';

const taskRoute = express.Router();
taskRoute.use(authMiddleware);

taskRoute.get('/alltasks', getAllTasks);
taskRoute.post('/createtask', createTask);
taskRoute.get('/task/:id', getASingleTask);
taskRoute.patch('/task/:id', updateASingleTask);
taskRoute.delete('/task/:id', deleteATask);

export default taskRoute;