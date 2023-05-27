"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteATask = exports.updateASingleTask = exports.getASingleTask = exports.createTask = exports.getAllTasks = void 0;
const http_status_codes_1 = require("http-status-codes");
const userPosts_1 = require("../models/userPosts");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const logger_1 = __importDefault(require("../library/logger"));
// getting all tasks
exports.getAllTasks = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const tasks = yield userPosts_1.UserPostModel.find();
    logger_1.default.log(tasks);
    res.status(http_status_codes_1.StatusCodes.OK).json(tasks);
}));
// creating a post task controller
exports.createTask = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const createTask = yield userPosts_1.UserPostModel.create(req.body);
    const savedTask = yield createTask.save();
    logger_1.default.log(savedTask);
    res.status(http_status_codes_1.StatusCodes.CREATED).json({ msg: 'Task posted successfully', data: savedTask });
}));
// getting a single task from the DB
exports.getASingleTask = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: taskID } = req.params;
    const singleTask = yield userPosts_1.UserPostModel.findOne({ _id: taskID });
    logger_1.default.log(singleTask);
    if (!singleTask)
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ msg: `Task with ${taskID} does not exist` });
    else
        res.status(http_status_codes_1.StatusCodes.OK).json({ status: http_status_codes_1.StatusCodes.OK, taskData: singleTask });
}));
// updating a single task from the DB
exports.updateASingleTask = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: taskID } = req.params;
    const updateTask = yield userPosts_1.UserPostModel.findOneAndUpdate({ _id: taskID }, req.body, { new: true, runValidators: true });
    logger_1.default.log(updateTask);
    if (!updateTask)
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ msg: `Task with ${taskID} does not exist` });
    else
        res.status(http_status_codes_1.StatusCodes.OK).json({ status: http_status_codes_1.StatusCodes.OK, taskData: updateTask });
}));
// deleting a single task from the database
exports.deleteATask = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: taskID } = req.params;
    const deleteTask = yield userPosts_1.UserPostModel.findOneAndDelete({ _id: taskID });
    logger_1.default.warn(deleteTask);
    if (!deleteTask)
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ msg: `Task with ${taskID} does not exist` });
    else
        res.status(http_status_codes_1.StatusCodes.OK).json({ status: http_status_codes_1.StatusCodes.OK, taskData: deleteTask });
}));
