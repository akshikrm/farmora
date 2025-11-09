import { Router } from 'express';
import validateNewUser from "#validators/user.validator";
import authController from '#controllers/auth.controller';

const router = Router();

router.post('/signup', validateNewUser, authController.createManager);

router.post('/login', authController.login);

export default router;
