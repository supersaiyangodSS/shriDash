import { Request, Response } from "express";
import { User } from "@/modules/users/users.model";
import { generateToken } from "@/modules/auth/auth.service";
import { HTTP_CODES } from "@/constants/httpCodes";

export const login = async (req: Request, res: Response) => {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(HTTP_CODES.UNAUTHORIZED).json({ success: false, message: "Invalid credentials" });
    }

    const token = generateToken({ id: user._id, role: user.role });

    res.json({ token });
}