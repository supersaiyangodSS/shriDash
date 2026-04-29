import { Router } from "express";
import { loginPage, loginPost, homePage, logoutPost } from "./web.controller";
import { WebAuthMiddleware } from "@/middleware";
import { redirectIfAuth } from "@/middleware/redirectIfAuth.middleware";

const router = Router();

router.get("/", WebAuthMiddleware, homePage);
router.get("/login", redirectIfAuth, loginPage);
router.post("/login", loginPost);
router.post("/logout", logoutPost);

export default router;
