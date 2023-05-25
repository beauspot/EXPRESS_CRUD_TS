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
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
// import mongoose from "mongoose";
const mongodb_1 = require("mongodb");
const logger_1 = __importDefault(require("../library/logger"));
dotenv_1.default.config();
const MONGO_URL = process.env.MONGO_URL || ``;
// creating a function to establish the database connection  to the server
const config = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const client = new mongodb_1.MongoClient(MONGO_URL);
        yield client.connect();
        logger_1.default.info(`Connected to the database...`);
        // return MongoDB client instance or use it for further db operations
        return client;
    }
    catch (error) {
        logger_1.default.error(`Failed to conect to the database: ${error.message}`);
        process.exit(1);
    }
});
exports.config = config;
