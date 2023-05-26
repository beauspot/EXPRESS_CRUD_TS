import { Schema, Document, Types, model } from 'mongoose';

interface UserPosts extends Document {
    taskname: string;
    completed: boolean;
    role: 'user' | 'admin';
    createdBy: Types.ObjectId;
}

const UserPostsSchema = new Schema<UserPosts>({
    // creating an association between the authentication model and the user posts

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
        required: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const UserPostModel = model<UserPosts>("UserPosts", UserPostsSchema);