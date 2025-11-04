import { Router } from 'express';
import userController from '#controllers/authController';
import validateNewUser from "#validators/userValidator";

const router = Router();

router.post('/signup', validateNewUser, userController.signup);

router.post('/login', userController.login);

export default router;
