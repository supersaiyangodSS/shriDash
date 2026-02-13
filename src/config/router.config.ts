import { Router } from "express";
import userRouter from '../modules/users/user.route'
import authRouter from '../modules/auth/auth.route';

const router = Router();

router.use('/users', userRouter)
router.use('/auth', authRouter)

export default router;