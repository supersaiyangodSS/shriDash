import { Router } from "express";
import * as controller from '@/modules/users/users.controller';
import { validate } from "@/middleware/validate.middleware";
import { CreateUserValidator, UpdateUserValidator, UserIdValidator } from "@/modules/users/users.validator";
import { authMiddleware } from "@/middleware/auth.middleware";
import { allowRoles } from "@/middleware/role.middleware";
import { ROLES } from "@/constants/roles";

const router = Router();

router.post('/', validate(CreateUserValidator), controller.createUser);
router.get('/', controller.getUsers);
router.delete('/:id', validate(UserIdValidator, "params"), controller.softDeleteUser)
router.delete('/:id/force', controller.forceDeleteUser);
router.patch('/:id/restore', controller.restoreDeletedUser);

export default router;