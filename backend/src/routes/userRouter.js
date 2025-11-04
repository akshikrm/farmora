import { Router } from 'express';
import { verifyAdmin } from '#middlewares/authMiddleware';
import userController from '#controllers/authController';
import { validateUpdateUser } from '#validators/userValidator';

const router = Router();

router.get("/", verifyAdmin, userController.getAllUsers);
router.get("/:user_id", verifyAdmin, userController.getUserById);
router.put("/:user_id", validateUpdateUser, verifyAdmin, userController.updateUserById);
router.delete("/:user_id", verifyAdmin, userController.deleteUserById);

export default router;
