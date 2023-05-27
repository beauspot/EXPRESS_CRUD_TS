"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const taskCtrls_1 = require("../controllers/taskCtrls");
const taskRoute = express_1.default.Router();
taskRoute.get('/alltasks', taskCtrls_1.getAllTasks);
taskRoute.post('/createtask', taskCtrls_1.createTask);
exports.default = taskRoute;
