import { Router } from "express";
import userRouter from "@/modules/users/users.routes";
import authRouter from "@/modules/auth/auth.routes";
import sevekariRouter from "@/modules/sevekari/sevekari.routes";
import auditRouter from "@/modules/audit/audit.routes";

const router = Router();

router.use("/user", userRouter);
router.use("/auth", authRouter);
router.use("/sevekari", sevekariRouter);
router.use("/audit", auditRouter);

export default router;
