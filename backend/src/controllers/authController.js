import { Op } from 'sequelize';
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
		res.status(201).json({
			status: true,
			message: 'User created',
			token
		});
	} catch (error) {
		let statusCode = 500
		const errObj = {
			message: error.message || "something went wrong",
			name: error.name || "ServerError",
			code: error.code || "INTERNAL_SERVER_ERROR"
		}

		if (error instanceof PackageNotFoundError) { statusCode = 400 }

		res.status(statusCode).json(errObj);


	}
}

userController.login = async (req, res) => {
	const { username, password } = req.body;
	try {
		const user = await userService.login(username, password)

		const token = generateToken(user);

		res.json({
			token,
			master_id: user.id,
			name: user.name,
			username: user.username,
			user_type: user.usertype,
			parent_id: user.parent_id
		});
	} catch (error) {
		let statusCode = 500
		const errObj = {
			message: error.message || "something went wrong",
			name: error.name || "ServerError",
			code: error.code || "INTERNAL_SERVER_ERROR"
		}

		if (error instanceof InvalidUsernameError) { statusCode = 400 }
		if (error instanceof UserNotFoundError) { statusCode = 404 }
		if (error instanceof InvalidCredentialError) { statusCode = 401 }
		if (error instanceof SubsriptionInActiveError) { statusCode = 403 }

		res.status(statusCode).json(errObj);

	}
}

userController.getAllUsers = async (req, res) => {
	try {
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

		return res.status(200).json(result);
	} catch (error) {
		console.log(error)
		const errObj = {
			message: "something went wrong",
			name: "ServerError",
			code: "INTERNAL_SERVER_ERROR"
		}
		res.status(500).json(errObj);

	}
}

export default userController
