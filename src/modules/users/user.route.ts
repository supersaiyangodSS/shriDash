import { Router } from "express";
import * as controller from './user.controller';
import { validate } from "../../middleware/validate.middleware";
import { CreateUserSchema, UpdateUserSchema, UserIdSchema } from "./user.schema";
import { authMiddleware } from "../../middleware/auth.middleware";
import { allowRoles } from "../../middleware/role.middleware";
import { ROLES } from "../../constants/roles";

const router = Router();

router.post('/', validate(CreateUserSchema), controller.createUser);
router.get('/', controller.getUsers);
router.delete('/:id', validate(UserIdSchema, "params"), controller.softDeleteUser)
router.delete('/:id/force', controller.forceDeleteUser);

export default router;