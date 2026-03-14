import { Router } from "express";
import { loginController, logoutController } from "./auth.controller";
import { validate } from "@/middleware/validate.middleware";
import { LoginValidator } from "./auth.validator";

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
router.post('/login', validate(LoginValidator), loginController);
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
 */
router.post('/logout', logoutController);

export default router;