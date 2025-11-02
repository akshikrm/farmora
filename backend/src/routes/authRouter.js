import { Router } from 'express';
import userController from '#controllers/authController';
import validateUser from "#validators/userValidator";

const router = Router();

router.post('/signup', validateUser, userController.signup);

router.get("/users", userController.getAllUsers);

router.post('/login', userController.login);

export default router;
