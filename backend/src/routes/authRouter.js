import { Router } from 'express';
import { signup, getAllUsers, login } from '#controllers/authController';
import validateUser from "#validators/userValidator";

const router = Router();

router.post('/signup',
	validateUser,
	signup
);
router.get("/users",
	getAllUsers
);
router.post('/login', login);

export default router;
