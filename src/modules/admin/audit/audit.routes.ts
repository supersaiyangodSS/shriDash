import { ROLES } from "@/constants/roles";
import { auditMiddleware } from "@/middleware/audit.middleware";
import { authMiddleware } from "@/middleware/auth.middleware";
import { allowRoles } from "@/middleware/role.middleware";
import { Router } from "express";
import * as controller from "@/modules/admin/audit/audit.controller";

const router = Router();

router.get(
  "/audit",
  authMiddleware,
  allowRoles(ROLES.SUPERADMIN),
  auditMiddleware("GET", "LOGS"),
  controller.getAuditLogsController,
);

export default router;
