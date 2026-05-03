import { Router } from "express";
import {
  loginPage,
  loginPost,
  homePage,
  logoutPost,
  signUpPage,
  signUpPost,
} from "./web.controller";
import { allowRoles, WebAuthMiddleware } from "@/middleware";
import { redirectIfAuth } from "@/middleware/redirectIfAuth.middleware";
import { ROLES } from "@/constants";

const router = Router();

router.get("/", WebAuthMiddleware, homePage);

router.get("/login", redirectIfAuth, loginPage);
router.post("/login", loginPost);
router.post("/logout", logoutPost);

router.get(
  "/signup",
  WebAuthMiddleware,
  allowRoles(ROLES.ADMIN, ROLES.SUPERADMIN),
  signUpPage,
);
router.post(
  "/signup",
  WebAuthMiddleware,
  allowRoles(ROLES.ADMIN, ROLES.SUPERADMIN),
  signUpPost,
);

export default router;
