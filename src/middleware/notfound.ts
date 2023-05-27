import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

const __404_err_page = (req: Request, res: Response, next: NextFunction) => {
    res.status(StatusCodes.NOT_FOUND).json({ msg: `Error Page: The resource does not exist.` });
};

export default __404_err_page;
