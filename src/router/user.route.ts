import { Router } from "express";
import { getUsers, createUser, editUser, deleteUser } from "../controllers/users.controller";
import { validate } from "../middleware/validate.middleware";
import { createUserSchema, updateUserSchema } from "../schema/user.schema";

const router = Router();

router.get('/', getUsers);
router.post('/', validate(createUserSchema), createUser);
router.put('/:id', validate(updateUserSchema), editUser);
router.delete('/:id', deleteUser); //need to run validate her also since we only taking id as param in this?

export default router;