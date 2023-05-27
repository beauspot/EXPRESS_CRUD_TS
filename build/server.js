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
const express_1 = __importDefault(require("express"));
// import http from 'http';
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const compression_1 = __importDefault(require("compression"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const helmet_1 = __importDefault(require("helmet"));
const xss_clean_1 = __importDefault(require("xss-clean"));
// module imports
const config_1 = require("./config/config");
const logger_1 = __importDefault(require("./library/logger"));
// Importing custom middlewares.
const notfound_1 = __importDefault(require("./middleware/notfound"));
const errorHandler_1 = __importDefault(require("./middleware/errorHandler"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// middlewares
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, morgan_1.default)('tiny'));
app.use((0, compression_1.default)());
app.use((0, cookie_parser_1.default)());
app.use((0, helmet_1.default)());
app.use((0, xss_clean_1.default)());
app.use((0, cors_1.default)({
    credentials: true
}));
// routes
app.get('/', (req, res, next) => {
    res.status(200).json({ message: 'Welcome to Esxpress REST API with Typescript.' });
});
// middleware modules
app.use("*", notfound_1.default);
app.use(errorHandler_1.default);
const SERVER_PORT = process.env.PORT ? Number(process.env.PORT) : 3030;
// Connect to the database
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, config_1.config)();
        // starting the server once the connection is established
        app.listen(SERVER_PORT, () => logger_1.default.info(`Server started on port ${SERVER_PORT}`));
    }
    catch (error) {
        logger_1.default.error(error);
    }
});
startServer();
//Note 
/**
 * An import path can only end with a '.ts'
 * extension when 'allowImportingTsExtensions' is enabled.
 */ 
