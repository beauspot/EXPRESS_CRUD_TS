import { Schema, Document, Types, model } from 'mongoose';

interface UserPost extends Document {
    taskname: string;
    completed: boolean;
    role: 'user' | 'admin';
    createdBy: Types.ObjectId;
    author: Types.ObjectId;
    timestamps: boolean;
}

const UserPostsSchema = new Schema<UserPost>(
    {
        // creating an association between the authentication model and the user posts
        author: {
            type: Schema.Types.ObjectId,
            required: false,
            ref: 'AuthenticateUser'
        },
        taskname: {
            type: String,
            required: [true, 'Please input a task']
        },
        completed: {
            type: Boolean,
            default: false
        },
        role: {
            type: String,
            enum: ['user', 'admin'],
            required: true,
            default: 'user'
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: 'AuthenticateUser',
        }
    },
    {
        timestamps: true
    }
);

export const UserPostModel = model<UserPost>('UserPosts1', UserPostsSchema);
