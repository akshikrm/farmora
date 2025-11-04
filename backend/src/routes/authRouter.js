import { Router } from 'express';
import userController from '#controllers/authController';
import validateUser from "#validators/userValidator";
import { verifyAdmin } from '#middlewares/authMiddleware';

const router = Router();

router.post('/signup', validateUser, userController.signup);

router.get("/users", verifyAdmin, userController.getAllUsers);

router.post('/login', userController.login);

export default router;
