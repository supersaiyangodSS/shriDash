import jwt from 'jsonwebtoken';
import { env } from '@/config';
import { LoginDTO } from './dto/login.dto';
import { validateUserCredentialsRepo } from './auth.repository';
import { AppError } from '@/errors/AppError';
import { HTTP_CODES } from '@/constants/httpCodes';

export const generateTokenService = (payload: object) => {
    return jwt.sign(payload, env.JWT_SECRET, { expiresIn: "7d" });
}

export const loginService = async (payload: LoginDTO) => {
    const user = await validateUserCredentialsRepo(payload.email, payload.password);
    if (!user) throw new AppError('Invalid Credentials', HTTP_CODES.UNAUTHORIZED);

    const token = generateTokenService(user);

    return token;
}