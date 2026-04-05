import { Router } from "express";
import { createTempleController, CreateTempleSchema } from "@/modules/temple";
import {
  authMiddleware,
  auditMiddleware,
  allowRoles,
  validate,
} from "@/middleware/";
import { ROLES } from "@/constants";

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
