import { Schema, Document, Types, model } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

interface UserAuthentication extends Document {
    email: string;
    username: string;
    password: string;
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
    }
});

// <========== Mongoose Middleware =========>

// for the moment user registers
// the password is ran through a bcrypt function




export const UserAuthSchema = model<UserAuthentication>('AuthenticateUser', AuthenticateSchema);
