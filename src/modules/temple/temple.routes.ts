import { Router } from "express";
import { createTempleController } from "./temple.controller";
import { CreateTempleSchema } from "./temple.validator";
import {
  authMiddleware,
  auditMiddleware,
  allowRoles,
  validate,
} from "@/middleware/";
import { ROLES } from "@/constants";

const router = Router();

/**
 * @swagger
 * /temple:
 *   post:
 *     summary: Add a temple
 *     description: Create a new temple
 *     tags:
 *       - Temple
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       description: Data required to create a temple
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - city
 *               - branch
 *               - district
 *               - state
 *             properties:
 *               name:
 *                 type: string
 *                 example: Shri Hari Mandir
 *               city:
 *                 type: string
 *                 example: Nagpur
 *               branch:
 *                 type: string
 *                 example: 1
 *               district:
 *                 type: string
 *                 example: Nagpur
 *               state:
 *                 type: string
 *                 example: MH
 *     responses:
 *       201:
 *         description: Created temple successfully
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized - authentication required
 *       403:
 *         description: Forbidden
 *       409:
 *         description: Conflict
 *       500:
 *         description: Internal server error
 */
router.post(
  "/",
  validate(CreateTempleSchema),
  authMiddleware,
  auditMiddleware("POST", "TEMPLE"),
  allowRoles(ROLES.SUPERADMIN),
  createTempleController,
);

export default router;
