import { Router } from 'express';
import { isManager, isSuperAdmin } from '#middlewares/auth.middleware';
import userController from '#controllers/user.controller';
import { validateNewMember, validateUpdateUser } from '#validators/user.validator';

const router = Router();

router.post("/", validateNewMember, isManager, userController.createStaff);
router.get("/", isManager, userController.getAllUsers);
router.get("/:user_id", isSuperAdmin, userController.getUserById);
router.put("/:user_id", validateUpdateUser, isSuperAdmin, userController.updateUserById);
router.delete("/:user_id", isSuperAdmin, userController.deleteUserById);

export default router;
