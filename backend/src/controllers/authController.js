import { generateToken } from '#utils/jwt';
import userService from "#services/authService";
import { PackageNotFoundError } from "#errors/package.errors";
import { InvalidCredentialError, InvalidUsernameError, UserNotFoundError } from "#errors/user.errors";
import { SubsriptionInActiveError } from "#errors/subscription.errors";



/**
 * @module routes/userController
 * @description Routes for user-related operations.
 */
const userController = {}



/**
 * Registers a user
 * @async
 * @function signup
 * @memberof module:routes/userController
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 * @returns {Promise<void>} Sends a JSON response with the signup result.
 */
userController.signup = async (req, res) => {
	try {
		const user = await userService.create(req.body)
		const token = generateToken(user);
		res.success(token, { message: "user created", statusCode: 201 });
	} catch (error) {
		if (error instanceof PackageNotFoundError) { error.statusCode = 400 }
		throw error
	}
}

userController.login = async (req, res) => {
	const { username, password } = req.body;
	try {
		const user = await userService.login(username, password)
		const responseObject = {
			token: generateToken(user),
			master_id: user.id,
			name: user.name,
			username: user.username,
			user_type: user.usertype,
			parent_id: user.parent_id
		}

		res.success(responseObject, { message: "user authenticated" });
	} catch (error) {
		if (error instanceof InvalidUsernameError) { error.statusCode = 400 }
		if (error instanceof UserNotFoundError) { error.statusCode = 404 }
		if (error instanceof InvalidCredentialError) { error.statusCode = 401 }
		if (error instanceof SubsriptionInActiveError) { error.statusCode = 403 }
		throw error
	}
}

userController.getAllUsers = async (req, res) => {
	const filter = {
		page: parseInt(req.query.page) || 1,
		limit: parseInt(req.query.limit) || 10,
	}
	if (req.query.status) { filter.status = parseInt(req.query.status) }
	if (req.query.parent_id) { filter.parent_id = parseInt(req.query.parent_id) }
	if (req.query.name) { filter.name = req.query.name }

	const result = await userService.getAll(
		filter
	);

	res.success(result, { message: "users list" })
}

export default userController
