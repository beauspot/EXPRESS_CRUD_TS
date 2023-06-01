import express from 'express';
import { SignUpUser, LoginUser } from '../controllers/userAuthCtrls';

const userAuthRoute = express.Router();

userAuthRoute.post('/signupuser', SignUpUser);
userAuthRoute.post('/loginuser', LoginUser);

export default userAuthRoute;
