"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userAuthCtrls_1 = require("../controllers/userAuthCtrls");
const userAuthRoute = express_1.default.Router();
userAuthRoute.post('/signupuser', userAuthCtrls_1.SignUpUser);
userAuthRoute.post('/loginuser', userAuthCtrls_1.LoginUser);
exports.default = userAuthRoute;
