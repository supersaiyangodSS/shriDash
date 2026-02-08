import { Router } from "express";
import { getUsers, createUser } from "../controllers/users.controller";
import { validate } from "../middleware/validate.middleware";
import { createUserSchema } from "../schema/user.schema";

const router = Router();

router.get('/', getUsers);
router.post('/', validate(createUserSchema), createUser);

export default router;