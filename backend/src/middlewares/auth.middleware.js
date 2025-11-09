import jwt from 'jsonwebtoken';
import userRoles from '#utils/user-roles';
import { MissingTokenError, PermissionDeniedError } from '#errors/auth.errors';
import userService from '#services/user.service';
import asyncHandler from '#utils/async-handler';

const { verify } = jwt

const SECRET_KEY = process.env.JWT_SECRET || 'E77BDE77EAFD388AF54979EE26B4D';

export const authenticateToken = asyncHandler(async function(req, res, next) {
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

	if (!token) throw new MissingTokenError

	const decoded = verify(token, SECRET_KEY);

	const authenticatedUser = await userService.getById(decoded.id);
	if (authenticatedUser) {
		req.user = authenticatedUser;
		return next();
	}
	throw new MissingTokenError
})

export const isSuperAdmin = asyncHandler(async function(req, res, next) {
	await authenticateToken(req, res, async () => {
		if (req.user.user_type === userRoles.admin.type) {
			return next();
		}
		throw new PermissionDeniedError();
	});
})

export const isManager = asyncHandler(async function(req, res, next) {
	await authenticateToken(req, res, async () => {
		const userType = req.user ? req.user.user_type : null;
		if (userType == userRoles.admin.type || userType == userRoles.manager.type) {
			return next();
		}
		throw new PermissionDeniedError();
	});
})

