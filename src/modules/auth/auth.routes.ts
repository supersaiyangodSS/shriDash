import { Router } from "express";
import { loginController } from "@/modules/auth";

const router = Router();

router.post('/login', loginController);

export default router;