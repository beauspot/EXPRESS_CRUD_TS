"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAuthSchema = void 0;
const mongoose_1 = require("mongoose");
const AuthenticateSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: [true, 'Please provide an email address.'],
        unique: true,
        lowercase: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        maxlength: 17,
        minlength: 8
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        maxLength: 500
    }
});
// <========== Mongoose Middleware =========>
// for the moment user registers
// the password is ran through a bcrypt function
exports.UserAuthSchema = (0, mongoose_1.model)('AuthenticateUser', AuthenticateSchema);
