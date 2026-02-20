import { Router } from "express";
import userRouter from '@/modules/users/users.routes';
import authRouter from '@/modules/auth/auth.routes';

const router = Router();

router.use('/user', userRouter)
router.use('/auth', authRouter)

export default router;