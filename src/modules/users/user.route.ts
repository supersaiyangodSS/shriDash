import { Router } from "express";
import * as controller from './user.controller';
import { validate } from "../../middleware/validate.middleware";
import { createUserSchema, updateUserSchema } from "./user.schema";

const router = Router();

router.post('/', validate(createUserSchema), controller.createUser);
router.get('/', controller.getUsers);
router.delete('/:id', controller.softDeleteUser)

export default router;