import dotenv from 'dotenv';
import mongoose from 'mongoose';

import Logging from '../library/logger';

dotenv.config();

const MONGO_URL = process.env.MONGO_URL || ``;


// creating a function to establish the database connection  to the server
export const configDB = async (url: string) => {
    try {
        await mongoose.connect(url);
        Logging.info('Connected to the database!');
    } catch (error) {
        Logging.error(error);
        process.exit(1);
    }
};
