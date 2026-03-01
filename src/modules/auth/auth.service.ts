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
    if (!payload.email || !payload.password)
        throw new AppError('Email and Password are required!', HTTP_CODES.BAD_REQUEST);

    const user = await validateUserCredentialsRepo(payload.email, payload.password);
    if (!user) throw new AppError('Invalid Credentials', HTTP_CODES.UNAUTHORIZED);

    const token = generateTokenService(user);

    return token;
}