import { logger } from "../../utils/logger";
import { User } from "./user.model";

export const createUser = async (data: any) => {
    const existingUser = await User.findOne({
        $or: [
            { email: data.email },
            { username: data.username }
        ]
    }).lean();

    if (await User.exists({ email: data.email })) {
        const err: any = new Error('Email already exists');
        err.statusCode = 409;
        throw err;
    }

    if (await User.exists({ username: data.username })) {
        const err: any = new Error('Username already exists');
        err.statusCode = 409;
        throw err;
    }

    const user = await User.create(data);
    console.log(data);
    return user.toObject();
}

export const getUsers = async (page: number, limit: number) => {
    const skip = (page - 1) * limit;

    const users = await User.find({}).skip(skip).limit(limit).lean();

    const total = await User.countDocuments();
    const pages = Math.ceil(total/limit);

    return { users, total , page , pages }
}

export const softDeleteUser = async (id: string) => {
    return User.findByIdAndUpdate(id , {
        deleted: true,
        deletedAt: new Date()
    }, { new: true })
}