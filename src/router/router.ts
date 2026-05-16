import { Router } from "express";
import userRouter from "@/modules/users/users.routes";
import sevekariRouter from "@/modules/sevekari/sevekari.routes";
import auditRouter from "@/modules/audit/audit.routes";
import templeRouter from "@/modules/temple/temple.routes";

const router = Router();

router.use("/user", userRouter);
router.use("/sevekari", sevekariRouter);
router.use("/audit", auditRouter);
router.use("/temple", templeRouter);

export default router;
