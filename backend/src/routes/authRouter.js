import { Router } from 'express';
import userController from '#controllers/authController';
import validateUser from "#validators/userValidator";
import asyncHandler from '#utils/async-handler';

const router = Router();


router.post('/signup',
	validateUser,
	asyncHandler(userController.signup)
);


router.get("/users", asyncHandler(userController.getAllUsers));


router.post('/login', asyncHandler(userController.login));

export default router;
