import { Router } from "express";
import * as controller from '@/modules/users/users.controller';
import { validate } from "@/middleware/validate.middleware";
import { CreateUserValidator, UpdateUserValidator, UserIdValidator } from "@/modules/users";
import { authMiddleware } from "@/middleware/auth.middleware";
import { allowRoles } from "@/middleware/role.middleware";
import { ROLES } from "@/constants/roles";

const router = Router();

router.post('/', validate(CreateUserValidator), controller.createUserController);
router.get('/', controller.getUsersController);
router.delete('/:id', validate(UserIdValidator, "params"), controller.softDeleteUserController)
router.delete('/:id/force', controller.forceDeleteUserController);
router.patch('/:id/restore', controller.restoreDeletedUserController);

export default router;