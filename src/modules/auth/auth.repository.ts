import { User } from "../users/users.model";
import { AuthUser } from "./types/auth.types";

export const authenticateUserRepo = async (email: string,  password: string): Promise<AuthUser | null> => {
    const user = await User.findOne({email, deleted: false}).select('+password');

    if (!user || !(await user.comparePassword(password))) return null
    return { id: user._id.toString(), role: user.role };
}