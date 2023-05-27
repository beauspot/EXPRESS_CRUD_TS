import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import customApiError from '../errors/custom-errors';

const ErrorHandlerMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof customApiError) {
        return res.status(err.statusCode).json({ msg: err.message });
    } else {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: err.message });
    }
};

export default ErrorHandlerMiddleware;
