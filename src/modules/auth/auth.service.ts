import jwt from 'jsonwebtoken';
import { env } from '@/config';

export const generateTokenService = (payload: object) => {
    return jwt.sign(payload, env.JWT_SECRET, { expiresIn: "7d" });
}