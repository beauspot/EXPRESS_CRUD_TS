"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserPostsSchema = new mongoose_1.Schema({
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
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});
const UserPostModel = (0, mongoose_1.model)("UserPosts", UserPostsSchema);
