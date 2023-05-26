import dotenv from 'dotenv';
import mongoose from "mongoose";
import { MongoClient } from 'mongodb';
import Logging from '../library/logger';

dotenv.config();

const MONGO_URL = process.env.MONGO_URL || ``;

// creating a function to establish the database connection  to the server

export const config = async () => {
    try {
        const client = new MongoClient(MONGO_URL);
        await client.connect();
        Logging.info(`Connected to the database...`);

        // return MongoDB client instance or use it for further db operations
        return client;
    } catch (error) {
        Logging.error(`Failed to conect to the database: ${error}`);
        process.exit(1);
    }
};


export const configDB = async (url: string) => {
    try {
        await mongoose.connect(url);
        console.info("Connected to the database!")
    } catch (error) {
        console.log(error);
    }
}