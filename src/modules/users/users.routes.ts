import { Router } from "express";
import * as controller from '@/modules/users/users.controller';
import { validate } from "@/middleware/validate.middleware";
import { CreateUserValidator, UpdateUserValidator, UserIdValidator } from "@/modules/users";
import { authMiddleware } from "@/middleware/auth.middleware";
import { allowRoles } from "@/middleware/role.middleware";
import { ROLES } from "@/constants/roles";

const router = Router();

router.post('/', validate(CreateUserValidator), controller.createUserController);
router.get('/', authMiddleware, allowRoles(ROLES.ADMIN), controller.getUsersController);
router.delete('/:id', authMiddleware, allowRoles(ROLES.ADMIN), validate(UserIdValidator, "params"), controller.softDeleteUserController)
router.delete('/:id/force', authMiddleware, allowRoles(ROLES.ADMIN), controller.forceDeleteUserController);
router.patch('/:id/restore', authMiddleware, allowRoles(ROLES.ADMIN), controller.restoreDeletedUserController);


export default router;