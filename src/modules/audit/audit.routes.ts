import { ROLES } from "@/constants/roles";
import { auditMiddleware } from "@/middleware/audit.middleware";
import { authMiddleware } from "@/middleware/auth.middleware";
import { allowRoles } from "@/middleware/role.middleware";
import { Router } from "express";
import * as controller from "@/modules/audit/audit.controller";

const router = Router();
/**
 * @swagger
 * /audit:
 *   get:
 *     summary: Get all audit logs
 *     tags:
 *       - Logs
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Sevekari restored successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Internal server error
 */

router.get(
  "/",
  authMiddleware,
  allowRoles(ROLES.SUPERADMIN),
  auditMiddleware("GET", "LOGS"),
  controller.getAuditLogsController,
);

export default router;
