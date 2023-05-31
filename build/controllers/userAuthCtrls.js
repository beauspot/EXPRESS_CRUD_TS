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
exports.LoginUser = exports.SignUpUser = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const http_status_codes_1 = require("http-status-codes");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const userAuth_1 = require("../models/userAuth");
dotenv_1.default.config();
// user signup controller
exports.SignUpUser = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = yield userAuth_1.UserAuthModel.create(Object.assign({}, req.body));
    const userToken = newUser.generateAuthToken();
    res.status(http_status_codes_1.StatusCodes.CREATED).json({ UserData: { username: newUser.username, token: userToken } });
}));
// user Login Controller
exports.LoginUser = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ errMessage: `All Fields Are Mandatory` });
        return;
    }
    const UserExists = yield userAuth_1.UserAuthModel.findOne({ email });
    if (UserExists) {
        res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
            errMessage: `The user with the email: ${email} is not registered`
        });
        return;
    }
    // comparing user password
    const isMatch = yield userAuth_1.UserAuthModel.validPassword(password, UserExists.password);
    if (!isMatch) {
        res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
            errMessage: `The user with the email: ${email} is not registered`
        });
        return;
    }
    const userToken = UserExists.generateAuthToken();
    res.status(http_status_codes_1.StatusCodes.OK).json({ UserData: { username: UserExists.username, token: userToken } });
}));
