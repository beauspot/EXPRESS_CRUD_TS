"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CustomAPIError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
        this.statusCode = statusCode;
    }
}
exports.default = CustomAPIError;
