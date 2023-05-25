import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import { config } from './config/config';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const SERVER_PORT = process.env.PORT ? Number(process.env.PORT) : 3030;

// Connect to the database

const startServer = async () => {
    try {
        await config();
        // starting the server once the connection is established
        console.log(`Server Listening on localhost:${process.env.PORT}`);
    } catch (error: any) {
        console.log(error.message);
    }
};

startServer();
