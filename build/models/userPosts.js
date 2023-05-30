"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPostModel = void 0;
const mongoose_1 = require("mongoose");
const UserPostsSchema = new mongoose_1.Schema({
    // creating an association between the authentication model and the user posts
    author: {
        type: mongoose_1.Schema.Types.ObjectId,
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
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'AuthenticateUser',
    }
}, {
    timestamps: true
});
exports.UserPostModel = (0, mongoose_1.model)('UserPosts1', UserPostsSchema);
