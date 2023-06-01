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
exports.UserAuthModel = void 0;
const mongoose_1 = require("mongoose");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
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
    },
    token: {
        type: String
    }
});
// <========== Mongoose Middleware =========>
// for the moment user registers
// the password is ran through a bcrypt function
AuthenticateSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        if (!user.isModified('password')) {
            return next();
        }
        const salt = yield bcryptjs_1.default.genSalt(10);
        user.password = yield bcryptjs_1.default.hash(user.password, salt);
        next();
    });
});
// Schema Instance Methods
// generate the token to login
AuthenticateSchema.methods.generateAuthToken = function () {
    return __awaiter(this, void 0, void 0, function* () {
        //@ts-ignore
        const user = this;
        const token = jsonwebtoken_1.default.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);
        user.token = token; // save the token to the token field
        yield user.save(); // save the user instace to the database
        return token;
    });
};
// comparing the password hash aginst the password
AuthenticateSchema.methods.comparePassword = function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        //@ts-ignore
        const user = this;
        const comparedPwd = yield bcryptjs_1.default.compare(password, user.password);
        console.log(comparedPwd);
        return comparedPwd;
    });
};
//@ts-ignore
exports.UserAuthModel = (0, mongoose_1.model)('AuthenticateUser', AuthenticateSchema);
