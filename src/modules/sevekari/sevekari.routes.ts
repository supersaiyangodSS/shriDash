import { validate } from "@/middleware/validate.middleware";
import { Router } from "express";
import { SevekariSchema } from "./sevekari.validator";
import { auditMiddleware } from "@/middleware/audit.middleware";
import * as controller from "@/modules/sevekari/sevekari.controller";
import { allowRoles } from "@/middleware/role.middleware";
import { ROLES } from "@/constants/roles";
import { authMiddleware } from "@/middleware/auth.middleware";

const router = Router();

/**
 * @swagger
 * /sevekari:
 *   post:
 *     summary: Create new sevekari
 *     description: Creating new sevekari
 *     tags:
 *       - Sevekari
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       description: Data required to create sevekari
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - middleName
 *               - lastName
 *               - mobile
 *               - mobileAlt
 *               - email
 *               - address
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: Vedant
 *               middleName:
 *                 type: string
 *                 example: Suresh
 *               lastName:
 *                 type: string
 *                 example: Kale
 *               mobile:
 *                 type: string
 *                 example: 0011223344
 *               mobileAlt:
 *                 type: string
 *                 example: 5566778899
 *               email:
 *                 type: string,
 *                 example: vedant@mail.com
 *               address:
 *                 type: string,
 *                 example: xyz123456789
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

router.post(
  "/",
  validate(SevekariSchema),
  authMiddleware,
  allowRoles(ROLES.SUPERADMIN, ROLES.ADMIN),
  auditMiddleware("POST", "SEVEKARI"),
  controller.createSevekariController,
);

/**
 * @swagger
 * /sevekari:
 *   get:
 *     summary: get all sevekari
 *     description: get all sevekari
 *     tags:
 *       - Sevekari
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Fetched sevekari
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get(
  "/",
  authMiddleware,
  auditMiddleware("GET", "SEVEKARI"),
  allowRoles(ROLES.SUPERADMIN, ROLES.ADMIN),
  controller.getSevekariController,
);
/**
 * @swagger
 * /sevekari/{id}:
 *   patch:
 *     summary: Soft delete sevekari
 *     description: Soft delete sevekari with id
 *     tags:
 *       - Sevekari
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the sevekari to soft delete
 *         schema:
 *           type: string
 *           example: 69c5124bb792af3f448a473f
 *     responses:
 *       200:
 *         description: Sevekari deleted successfully
 *       400:
 *         description: Invalid sevekari id
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Sevekari not found
 *       500:
 *         description: Internal server error
 */
router.patch(
  "/:id",
  authMiddleware,
  allowRoles(ROLES.SUPERADMIN, ROLES.ADMIN),
  auditMiddleware("PATCH", "SEVEKARI"),
  controller.softDeleteSevekariController,
);
/**
 * @swagger
 * /sevekari/{id}/force:
 *   patch:
 *     summary: Force delete sevekari
 *     description: Force delete sevekari with id
 *     tags:
 *       - Sevekari
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the sevekari to force delete
 *         schema:
 *           type: string
 *           example: 69c5124bb792af3f448a473f
 *     responses:
 *       200:
 *         description: Sevekari deleted successfully
 *       400:
 *         description: Invalid sevekari id
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Sevekari not found
 *       500:
 *         description: Internal server error
 */
router.patch(
  "/:id/force",
  authMiddleware,
  allowRoles(ROLES.SUPERADMIN),
  auditMiddleware("PATCH", "SEVEKARI"),
  controller.forceDeleteSevekariController,
);

export default router;
