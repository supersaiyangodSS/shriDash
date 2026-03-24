import { validate } from "@/middleware/validate.middleware";
import { Router } from "express";
import { SevekariSchema } from "./sevekari.validator";
import { auditMiddleware } from "@/middleware/audit.middleware";
import * as controller from "@/modules/sevekari/sevekari.controller";

const router = Router();

router.post(
  "/",
  validate(SevekariSchema),
  auditMiddleware("POST", "SEVEKARI"),
  controller.createSevekariController,
);

router.get(
  "/",
  auditMiddleware("GET", "SEVEKARI"),
  controller.getSevekariController,
);

export default router;
