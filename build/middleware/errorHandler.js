"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const custom_errors_1 = __importDefault(require("../errors/custom-errors"));
const ErrorHandlerMiddleware = (err, req, res, next) => {
    if (err instanceof custom_errors_1.default) {
        return res.status(err.statusCode).json({ msg: err.message });
    }
    else {
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: err.message });
    }
};
exports.default = ErrorHandlerMiddleware;
