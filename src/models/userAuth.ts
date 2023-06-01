import { Schema, Document, Types, model } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export interface UserAuthentication extends Document {
    email: string;
    username: string;
    password: string;
    token: string;
    generateAuthToken(): Promise<string>;
    comparePassword: (password: string) => Promise<boolean>;
}

const AuthenticateSchema = new Schema<UserAuthentication>({
    email: {
        type: String,
        required: [true, 'Please provide an email address.'],
        unique: true,
        lowercase: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        maxlength: 17,
        minlength: 8
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        maxLength: 500
    },
    token: {
        type: String
    }
});

// <========== Mongoose Middleware =========>

// for the moment user registers
// the password is ran through a bcrypt function
AuthenticateSchema.pre('save', async function (next): Promise<void> {
    const user = this;
    if (!user.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    next();
});

// Schema Instance Methods
// generate the token to login
AuthenticateSchema.methods.generateAuthToken = async function (): Promise<string> {
    //@ts-ignore
    const user = this as UserAuthentication;
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET!);
    user.token = token; // save the token to the token field
    await user.save(); // save the user instace to the database
    return token;
};

// comparing the password hash aginst the password

AuthenticateSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
    //@ts-ignore
    const user = this as UserAuthentication;
    const comparedPwd = await bcrypt.compare(password, user.password);
    console.log(comparedPwd);
    return comparedPwd;
};

//@ts-ignore
export const UserAuthModel = model<UserAuthentication, userMethods>('AuthenticateUser', AuthenticateSchema);
