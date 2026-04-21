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

router.post(
  "/",
  validate(CreateTempleSchema),
  authMiddleware,
  auditMiddleware("POST", "TEMPLE"),
  allowRoles(ROLES.SUPERADMIN),
  createTempleController,
);

export default router;
