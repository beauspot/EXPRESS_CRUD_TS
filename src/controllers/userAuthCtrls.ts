import dotenv from 'dotenv';
import { StatusCodes } from 'http-status-codes';
import asyncHandler from 'express-async-handler';
import { Request, Response, NextFunction } from 'express';
import { UserAuthModel, UserAuthentication } from '../models/userAuth';
dotenv.config();

// user signup controller
export const SignUpUser = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const newUser = await UserAuthModel.create({ ...req.body });
    const userToken = await newUser.generateAuthToken();
    console.log(userToken);
    res.status(StatusCodes.CREATED).json({ UserData: { username: newUser.username, token: userToken } });
    return;
});

// user Login Controller
export const LoginUser = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(StatusCodes.BAD_REQUEST).json({ errMessage: `All Fields Are Mandatory` });
        return;
    }

    const UserExists = (await UserAuthModel.findOne({ email })) as UserAuthentication;

    if (!UserExists) {
        res.status(StatusCodes.UNAUTHORIZED).json({
            errMessage: `The user with the email: ${email} is not registered`
        });
        return;
    }
    // comparing user password

    const isMatch: boolean = await UserExists.comparePassword(password);
    console.log(isMatch); // this should return a boolean value.

    if (!isMatch) {
        res.status(StatusCodes.UNAUTHORIZED).json({
            errMessage: `The user with the email: ${email} is not registered`
        });
        return;
    }

    const userToken = UserExists.generateAuthToken();

    res.status(StatusCodes.OK).json({ UserData: { username: UserExists.username, token: userToken } });
});
