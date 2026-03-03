import { Router } from "express";
import { loginController } from "@/modules/auth";
import { validate } from "@/middleware/validate.middleware";
import { LoginValidator } from "./auth.validator";

const router = Router();

router.post('/login', validate(LoginValidator), loginController);

export default router;