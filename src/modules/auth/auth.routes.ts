import { Router } from "express";
import { loginController, logoutController } from "./auth.controller";
import { validate } from "@/middleware/validate.middleware";
import { loginSchema } from "./auth.validator";
import { authMiddleware } from "@/middleware/auth.middleware";

const router = Router();

/**
 * @swagger
 * /auth/login:
 *    post:
 *        summary: Login
 *        tags:
 *          - Auth
 *
 *        requestBody:
 *          required: true
 *          description: Data required to login
 *          content:
 *            application/json:
 *              schema:
 *                  type: object
 *                  required:
 *                      - email
 *                      - password
 *                  properties:
 *                     email:
 *                      type: string
 *                      example: vedant@gmail.com
 *                     password:
 *                      type: string
 *                      example: password
 *        responses:
 *             200:
 *                 description: Login success
 *             401:
 *                 description: Invalid credentials
 */
router.post("/login", validate(loginSchema), loginController);
/**
 * @swagger
 * /auth/logout:
 *    post:
 *        summary: Logout
 *        tags:
 *          - Auth
 *        responses:
 *             200:
 *                 description: logout successful
 *             401:
 *                 description: token missing
 */
router.post("/logout", authMiddleware, logoutController);

export default router;
