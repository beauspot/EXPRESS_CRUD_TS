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
exports.createTask = exports.getAllTasks = void 0;
const http_status_codes_1 = require("http-status-codes");
const userPosts_1 = require("../models/userPosts");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
// getting all tasks 
exports.getAllTasks = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const tasks = yield userPosts_1.UserPostModel.find();
    console.log(tasks);
    res.status(http_status_codes_1.StatusCodes.OK).json(tasks);
}));
// creating a post task controller
exports.createTask = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const createTask = yield userPosts_1.UserPostModel.create(req.body);
    const savedTask = yield createTask.save();
    console.log(savedTask);
    res.status(http_status_codes_1.StatusCodes.CREATED).json({ msg: 'Task posted successfully', data: savedTask });
}));
