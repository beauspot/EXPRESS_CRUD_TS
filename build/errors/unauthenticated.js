"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import { StatusCodes } from 'http-status-codes';
const custom_errors_1 = __importDefault(require("./custom-errors"));
class UnauthenticatedError extends custom_errors_1.default {
    constructor(message, statusCode) {
        super(message, statusCode);
        this.message = message;
        this.statusCode = statusCode;
    }
}
exports.default = UnauthenticatedError;
