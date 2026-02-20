import { NextFunction, Request, Response } from "express";
import { User } from "@/modules/users/users.model";
import { generateTokenService } from "@/modules/auth";
import { HTTP_CODES } from "@/constants/httpCodes";
import { AppError } from "@/errors/AppError";

export const loginController = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const { email } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            throw new AppError('Invalid credentials', HTTP_CODES.UNAUTHORIZED);
        }

        const token = generateTokenService({ id: user._id, role: user.role });

        res.json({ token });
    } catch (error) {
        next(error)
    }
}