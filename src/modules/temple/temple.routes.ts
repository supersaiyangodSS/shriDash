import { Router } from "express";
import { createTempleController } from "@/modules/temple";
import { authMiddleware } from "@/middleware/auth.middleware";
import { auditMiddleware } from "@/middleware/audit.middleware";
import { allowRoles } from "@/middleware/role.middleware";
import { ROLES } from "@/constants";
import { CreateTempleSchema } from "./temple.validator";
import { validate } from "@/middleware/validate.middleware";

const router = Router();

router.post(
  "/",
  validate(CreateTempleSchema),
  authMiddleware,
  auditMiddleware("POST", "TEMPLE"),
  allowRoles(ROLES.SUPERADMIN),
  createTempleController,
);

export default router;
