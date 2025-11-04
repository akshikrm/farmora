import { generateToken } from '#utils/jwt';
import userService from "#services/authService";
import asyncHandler from '#utils/async-handler';

const signup = async (req, res) => {
	const user = await userService.create(req.body)
	res.success(user, { message: "user created", statusCode: 201 });
}

const login = async (req, res) => {
	const { username, password } = req.body;
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
}

const getAllUsers = async (req, res) => {
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


const getUserById = async (req, res) => {
	const { user_id } = req.params
	const userRecord = await userService.getById(user_id)
	res.success(userRecord, { message: "users record" })
}

const updateUserById = async (req, res) => {
	const { user_id } = req.params
	await userService.update(user_id, req.body)
	res.success(null, { message: "user updated" })
}

const deleteUserById = async (req, res) => {
	const { user_id } = req.params
	await userService.delete(user_id)
	res.success(null, { message: "user deleted" })
}

const userController = {
	signup: asyncHandler(signup),
	login: asyncHandler(login),
	getAllUsers: asyncHandler(getAllUsers),
	getUserById: asyncHandler(getUserById),
	updateUserById: asyncHandler(updateUserById),
	deleteUserById: asyncHandler(deleteUserById)

};

export default userController
