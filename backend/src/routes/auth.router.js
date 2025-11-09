import { Router } from 'express';
import userController from '#controllers/auth.controller';
import validateNewUser from "#validators/user.validator";

const router = Router();

router.post('/signup', validateNewUser, userController.signup);

router.post('/login', userController.login);

export default router;
