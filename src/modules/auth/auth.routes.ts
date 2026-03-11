import { Router } from "express";
import { loginController, logoutController } from "./auth.controller";
import { validate } from "@/middleware/validate.middleware";
import { LoginValidator } from "./auth.validator";

const router = Router();

router.post('/login', validate(LoginValidator), loginController);
router.post('/logout', logoutController);

export default router;