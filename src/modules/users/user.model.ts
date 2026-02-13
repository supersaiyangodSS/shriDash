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
         unique: true,
         lowercase: true,
         trim: true,
         required: true
    },
    username: {
         type: String,
         unique: true,
         trim: true,
         required: true
    },
    password: {
         type: String,
         required: true,
         select: false
    },
    role: {
         type: String,
         enum: ['admin', 'superadmin', 'user'],
         default: 'user'
    },
    verified: {
         type: Boolean,
         default: false
    },
    token: {
         type: String,
         select: false
    },
    isTokenUsed: {
         type: Boolean,
         default: false
    },
    deleted: {
          type: Boolean,
          default: false
    },
    deletedAt: {
          type: Date,
          default: null
    }
}, {
     timestamps: true
});

userSchema.pre("save", async function () {
     if (!this.isModified('password')) return;

     const salt = await bcrypt.genSalt(10);
     this.password = await bcrypt.hash(this.password, salt);
})

export type User = InferSchemaType<typeof userSchema>;

export const User = model('User', userSchema);
