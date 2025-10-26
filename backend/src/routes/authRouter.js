import { Router } from 'express';
import userController from '#controllers/authController';
import validateUser from "#validators/userValidator";

const router = Router();

const asyncHandler = (fn) => (req, res, next) =>
	Promise.resolve(fn(req, res, next)).catch(next);

router.post('/signup',
	validateUser,
	asyncHandler(userController.signup)
);


router.get("/users", asyncHandler(userController.getAllUsers));


router.post('/login', asyncHandler(userController.login));

export default router;
