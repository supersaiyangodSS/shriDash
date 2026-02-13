import { Request, Response } from "express";
import { User } from "../users/user.model";
import { generateToken } from "./auth.service";
import { success } from "zod";
import { logger } from "../../utils/logger";

export const login = async (req: Request, res: Response) => {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const token = generateToken({ id: user._id, role: user.role });

    res.json({ token });
}