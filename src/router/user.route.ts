import { Router } from "express";
import { getUsers, createUser, editUser } from "../controllers/users.controller";
import { validate } from "../middleware/validate.middleware";
import { createUserSchema, updateUserSchema } from "../schema/user.schema";

const router = Router();

router.get('/', getUsers);
router.post('/', validate(createUserSchema), createUser);
router.put('/:id', validate(updateUserSchema), editUser);

export default router;