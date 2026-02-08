import { InferSchemaType, Schema, model } from "mongoose";

const userSchema = new Schema({
    firstName: {
         type: String,
         required: true
    },
    lastName: {
         type: String,
         required: true
    },
    email: {
         type: String,
         required: true
    },
    username: {
         type: String,
         unique: true,
         required: true
    },
    password: {
         type: String,
         required: true
    },
    role: {
         type: String,
         enum: ['admin', 'moderator', 'user'],
         required: true
    },
    verified: {
         type: Boolean,
         required: true
    },
    token: {
         type: String,
         required: true
    },
    isTokenUsed: {
         type: Boolean,
         required: true
    },
    createdAt: {
         type: Date,
         default: Date.now
    },
    updatedAt: {
         type: Date,
         default: Date.now
    },
});

export type User = InferSchemaType<typeof userSchema>;

export const User = model('User', userSchema);
