import { User } from "../users/users.model";

export const validateUserCredentialsRepo = async (email: string,  password: string) => {
    const user = await User.findOne({email}).select('+password');

    if (!user) return null;

    const isMatch = await user.comparePassword(password);

    if (!isMatch) return null;

    return { id: user._id, role: user.role };
}