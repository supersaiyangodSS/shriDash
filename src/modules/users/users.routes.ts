import { Router } from "express";
import * as controller from "@/modules/users/users.controller";
import {
  CreateUserSchema,
  UpdateUserPassSchema,
  UpdateUserSchema,
  UserIdSchema,
  UserEmailSchema,
  TokenSchema,
} from "@/modules/users";
import {
  validate,
  authMiddleware,
  allowRoles,
  auditMiddleware,
} from "@/middleware";
import { ROLES } from "@/constants";

const router = Router();

/**
 * @swagger
 * /user:
 *    post:
 *        summary: Create new user
 *        description:
 *        tags:
 *          - Users
 *
 *        requestBody:
 *          required: true
 *          description: Data required to create user
 *          content:
 *            application/json:
 *              schema:
 *                  type: object
 *                  required:
 *                      - firstName
 *                      - lastName
 *                      - username
 *                      - email
 *                      - password
 *                  properties:
 *                     firstName:
 *                      type: string
 *                      example: Vedant
 *                     lastName:
 *                      type: string
 *                      example: Kale
 *                     username:
 *                      type: string
 *                      example: vedant1
 *                     email:
 *                      type: string
 *                      example: vedant@gmail.com
 *                     password:
 *                      type: string
 *                      example: password
 *        responses:
 *             201:
 *                 description: User created successfully
 *             400:
 *                 description: Invalid input data
 *             409:
 *                 description: conflict
 */
router.post(
  "/",
  validate(CreateUserSchema),
  auditMiddleware("POST", "USER"),
  controller.createUserController,
);
/**
 * @swagger
 * /user:
 *    get:
 *       summary: Get all users
 *       tags:
 *          - Users
 *       security:
 *               - bearerAuth: []
 *       responses:
 *            200:
 *                description: success
 *            401:
 *                description: unauthorized
 *            409:
 *                description: conflict
 */
router.get(
  "/",
  authMiddleware,
  allowRoles(ROLES.SUPERADMIN, ROLES.ADMIN),
  auditMiddleware("GET", "USER"),
  controller.getUsersController,
);
/**
 * @swagger
 * /user/{id}:
 *   delete:
 *     summary: Delete user
 *     description: Delete a user by ID
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to delete
 *         schema:
 *           type: string
 *           example: 69b949dfff298568ede44b43
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized - authentication required
 *       409:
 *         description: User is already deleted
 */
router.delete(
  "/:id",
  validate(UserIdSchema, "params"),
  authMiddleware,
  auditMiddleware("DELETE", "USER"),
  allowRoles(ROLES.SUPERADMIN, ROLES.ADMIN),
  controller.softDeleteUserController,
);
/**
 * @swagger
 * /user/{id}/force:
 *   delete:
 *     summary: Force delete user
 *     description: Delete a user by ID
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to force delete
 *         schema:
 *           type: string
 *           example: 69b949dfff298568ede44b43
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized - authentication required
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       409:
 *         description: User is already deleted
 */
router.delete(
  "/:id/force",
  validate(UserIdSchema, "params"),
  authMiddleware,
  auditMiddleware("DELETE", "USER"),
  allowRoles(ROLES.SUPERADMIN),
  controller.forceDeleteUserController,
);
/**
 * @swagger
 * /user/{id}/restore:
 *   patch:
 *     summary: Restore deleted user
 *     description: Delete a user by ID
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to restore
 *         schema:
 *           type: string
 *           example: 69b949dfff298568ede44b43
 *     responses:
 *       200:
 *         description: User restored successfully
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized - authentication required
 */
router.patch(
  "/:id/restore",
  validate(UserIdSchema, "params"),
  authMiddleware,
  auditMiddleware("PATCH", "USER"),
  allowRoles(ROLES.SUPERADMIN, ROLES.ADMIN),
  controller.restoreDeletedUserController,
);
/**
 * @swagger
 * /user/{id}:
 *   patch:
 *     summary: Update user
 *     description: Update a user by ID
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to update
 *         schema:
 *           type: string
 *           example: 69b949dfff298568ede44b43
 *     responses:
 *       200:
 *         description: User restored successfully
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized - authentication required
 */
router.patch(
  "/:id",
  validate(UserIdSchema, "params"),
  validate(UpdateUserSchema, "body"),
  authMiddleware,
  auditMiddleware("PATCH", "USER"),
  allowRoles(ROLES.SUPERADMIN, ROLES.ADMIN, ROLES.USER),
  controller.updateUserController,
);
/**
 * @swagger
 * /user/{id}/reset-password:
 *   patch:
 *     summary: Reset user password
 *     description: Update user password by ID
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to update password
 *         schema:
 *           type: string
 *           example: 69b949dfff298568ede44b43
 *     requestBody:
 *       required: true
 *       description: Data required to update user password
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - oldPassword
 *               - newPassword
 *             properties:
 *               oldPassword:
 *                 type: string
 *                 example: password
 *               newPassword:
 *                 type: string
 *                 example: password1
 *     responses:
 *       200:
 *         description: User password updated successfully
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized - authentication required
 */
router.patch(
  "/:id/reset-password",
  validate(UserIdSchema, "params"),
  validate(UpdateUserPassSchema, "body"),
  authMiddleware,
  auditMiddleware("PATCH", "USER"),
  allowRoles(ROLES.SUPERADMIN, ROLES.ADMIN, ROLES.USER),
  controller.updateUserPasswordController,
);
/**
 * @swagger
 * /user/{id}/email:
 *   patch:
 *     summary: Update user email
 *     description: Update user email by ID
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to update email
 *         schema:
 *           type: string
 *           example: 69b949dfff298568ede44b43
 *     requestBody:
 *       required: true
 *       description: Data required to update user email
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - oldPassword
 *               - newPassword
 *             properties:
 *               email:
 *                 type: string
 *                 example: vedant@gmail.com
 *     responses:
 *       200:
 *         description: User email updated successfully
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized - authentication required
 *       409:
 *         description: Email already exists
 */
router.patch(
  "/:id/email",
  validate(UserIdSchema, "params"),
  validate(UserEmailSchema, "body"),
  authMiddleware,
  auditMiddleware("PATCH", "USER"),
  allowRoles(ROLES.SUPERADMIN, ROLES.ADMIN, ROLES.USER),
  controller.updateUserEmailController,
);
/**
 * @swagger
 * /verify-email/{token}:
 *   get:
 *     summary: Verify user email
 *     description: Verifies a user's email using the token sent via email
 *     tags:
 *       - Auth
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         description: Email verification token
 *         schema:
 *           type: string
 *           example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *     responses:
 *       200:
 *         description: Email verified successfully
 *       400:
 *         description: Invalid or expired token
 */
router.get(
  "/verify-email/:token",
  validate(TokenSchema, "params"),
  auditMiddleware("GET", "USER"),
  controller.verifyEmailController,
);

export default router;
