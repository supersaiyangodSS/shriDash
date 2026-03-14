import jwt from 'jsonwebtoken';
import { env } from '@/config';
import { LoginDto } from './auth.validator';
import { authenticateUserRepo } from './auth.repository';
import { AppError } from '@/errors/AppError';
import { HTTP_CODES } from '@/constants/httpCodes';
import { AuthUser } from './types/auth.types';

export const generateTokenService = (payload: AuthUser) => {
    return jwt.sign(payload, env.JWT_SECRET, { expiresIn: "7d" });
}

export const loginService = async (payload: LoginDto) => {
    const user = await authenticateUserRepo(payload.email, payload.password);
    if (!user) throw new AppError('Invalid credentials', HTTP_CODES.UNAUTHORIZED);

    const token = generateTokenService(user);

    return token;
}