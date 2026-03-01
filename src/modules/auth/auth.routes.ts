import { Router } from "express";
import { loginController } from "@/modules/auth";
import { validate } from "@/middleware/validate.middleware";

const router = Router();

router.post('/login', loginController);

export default router;