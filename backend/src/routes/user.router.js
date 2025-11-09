import { Router } from 'express';
import { verifyAdmin } from '#middlewares/auth.middleware';
import userController from '#controllers/user.controller';
import { validateUpdateUser } from '#validators/user.validator';

const router = Router();

router.get("/", verifyAdmin, userController.getAllUsers);
router.get("/:user_id", verifyAdmin, userController.getUserById);
router.put("/:user_id", validateUpdateUser, verifyAdmin, userController.updateUserById);
router.delete("/:user_id", verifyAdmin, userController.deleteUserById);

export default router;
