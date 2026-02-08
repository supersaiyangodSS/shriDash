import mongoose, { InferSchemaType, Schema, model } from "mongoose";
import bcrypt from 'bcrypt';

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
         required: true,
         select: false
    },
    role: {
         type: String,
         enum: ['admin', 'moderator', 'user'],
    },
    verified: {
         type: Boolean,
    },
    token: {
         type: String,
         select: false
    },
    isTokenUsed: {
         type: Boolean,
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

userSchema.pre("save", async function () {
     if (!this.isModified('password')) return;

     const salt = await bcrypt.genSalt(10);
     this.password = await bcrypt.hash(this.password, salt);
})

export type User = InferSchemaType<typeof userSchema>;

export const User = model('User', userSchema);
