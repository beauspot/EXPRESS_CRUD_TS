import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import xss from 'xss-clean';
import helmet from 'helmet';
import session from 'express-session';
import compression from 'compression';
import cookieprser from 'cookie-parser';
import mongoSanitize from 'express-mongo-sanitize';
import MongodbSession from 'connect-mongodb-session';
import express, { Request, Response, NextFunction } from 'express';

// module imports
import { config } from './config/config';
import Logging from './library/logger';

// Importing custom middlewares.
import _404ErrorPage from './middleware/notfound';
import ErrorHandlerMiddleware from './middleware/errorHandler';

// importing the application route for registeration
import taskRoute from './routes/taskRoutes';

dotenv.config();

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('tiny'));
app.use(compression());
app.use(cookieprser());
app.use(mongoSanitize());
app.use(helmet());
app.use(xss());
app.use(
    cors({
        credentials: true
    })
);
const MongoDBStore = MongodbSession(session);
const store = new MongoDBStore({
    uri: process.env.MONGO_URL!,
    collection: 'Sessions-TS-Collection'
});
app.use(
    session({
        resave: false,
        secret: process.env.SESSION_SECRET_KEY!,
        saveUninitialized: true,
        store: store,
        cookie: {
            sameSite: 'strict',
            secure: false, // use true if using https
            maxAge: 1000 * 60 * 60 // cookie would expire in 1 hour
        }
    })
);
// routes
app.use('/', taskRoute);
app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({ message: 'Welcome to Esxpress REST API with Typescript.' });
});

// middleware modules
app.use('*', _404ErrorPage);
app.use(ErrorHandlerMiddleware);

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

//Note
/**
 * An import path can only end with a '.ts'
 * extension when 'allowImportingTsExtensions' is enabled.
 */
