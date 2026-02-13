import jwt from 'jsonwebtoken';
import { env } from '../../config/env.config';

export const generateToken = (payload: object) => {
    return jwt.sign(payload, env.JWT_SECRET, { expiresIn: "7d" });
}