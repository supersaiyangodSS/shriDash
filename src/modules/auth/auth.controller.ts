import { Request, Response } from "express";
import { User } from "@/modules/users";
import { generateTokenService } from "@/modules/auth";
import { HTTP_CODES } from "@/constants/httpCodes";

export const loginController = async (req: Request, res: Response) => {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(HTTP_CODES.UNAUTHORIZED).json({ success: false, message: "Invalid credentials" });
    }

    const token = generateTokenService({ id: user._id, role: user.role });

    res.json({ token });
}