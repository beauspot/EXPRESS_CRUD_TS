import express, { Request, Response, NextFunction } from 'express';
import http from 'http';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import morgan from 'morgan';

// module imports
import { config } from './config/config';
import Logging from './library/logger';

dotenv.config();

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('tiny'));

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
        Logging.info(`Server started on port ${SERVER_PORT}`);
    } catch (error: any) {
        Logging.error(error.message);
    }
};

startServer();
