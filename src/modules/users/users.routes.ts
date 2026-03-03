import { Router } from "express";
import * as controller from '@/modules/users/users.controller';
import { validate } from "@/middleware/validate.middleware";
import { CreateUserValidator, UpdateUserPassValidator, UpdateUserValidator, UserIdValidator } from "@/modules/users";
import { authMiddleware } from "@/middleware/auth.middleware";
import { allowRoles } from "@/middleware/role.middleware";
import { ROLES } from "@/constants/roles";

const router = Router();

router.post('/', validate(CreateUserValidator), controller.createUserController);
router.get('/', authMiddleware, allowRoles(ROLES.SUPERADMIN, ROLES.ADMIN), controller.getUsersController);
router.delete('/:id', validate(UserIdValidator), authMiddleware, allowRoles(ROLES.SUPERADMIN, ROLES.ADMIN), validate(UserIdValidator, "params"), controller.softDeleteUserController)
router.delete('/:id/force', validate(UserIdValidator), authMiddleware, allowRoles(ROLES.SUPERADMIN), controller.forceDeleteUserController);
router.patch('/:id/restore', validate(UserIdValidator), authMiddleware, allowRoles(ROLES.SUPERADMIN, ROLES.ADMIN), controller.restoreDeletedUserController);
router.patch('/:id', validate(UpdateUserValidator), authMiddleware, allowRoles(ROLES.SUPERADMIN, ROLES.ADMIN), controller.updateUserController);
router.patch('/:id/reset-password', validate(UpdateUserPassValidator), authMiddleware, allowRoles(ROLES.SUPERADMIN, ROLES.ADMIN, ROLES.USER), controller.updateUserPasswordController);

export default router;