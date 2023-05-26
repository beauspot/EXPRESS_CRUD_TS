import express, { Request, Response, NextFunction } from 'express';
import http from 'http';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import compression from 'compression';
import cookieprser from 'cookie-parser';
import helmet from 'helmet';
import xss from 'xss-clean';

// module imports
import { config } from './config/config';
import Logging from './library/logger';

dotenv.config();

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('tiny'));
app.use(compression());
app.use(cookieprser());
app.use(helmet());
app.use(xss());
app.use(
    cors({
        credentials: true
    })
);

// routes
app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({ message: 'Welcome to Esxpress REST API with Typescript.' });
});

const SERVER_PORT = process.env.PORT ? Number(process.env.PORT) : 3030;

// Connect to the database

const startServer = async () => {
    try {
        await config();
        // starting the server once the connection is established
        app.listen(SERVER_PORT, () => Logging.info(`Server started on port ${SERVER_PORT}`));
    } catch (error) {
        Logging.error(error);
    }
};

startServer();
