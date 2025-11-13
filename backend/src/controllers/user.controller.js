import userService from "#services/user.service";
import asyncHandler from '#utils/async-handler';
import userRoles from "#utils/user-roles";

const createStaff = async (req, res) => {
	const payload = { ...req.body, parentId: req.user.id }
	const user = await userService.createStaff(payload)
	res.success(user, { message: "user created", statusCode: 201 });
}

const getAllUsers = async (req, res) => {
	const filter = {
		page: parseInt(req.query.page) || 1,
		limit: parseInt(req.query.limit) || 10,
	}
	if (req.query.status) { filter.status = parseInt(req.query.status) }

	if (req.query.name) { filter.name = req.query.name }

	if ((req.user.user_type === userRoles.manager.type)) {
		filter.parent_id = req.user.id
	} else if (req.query.parent_id) {
		filter.parent_id = req.query.parent_id
	}

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
	createStaff: asyncHandler(createStaff),
	getAllUsers: asyncHandler(getAllUsers),
	getUserById: asyncHandler(getUserById),
	updateUserById: asyncHandler(updateUserById),
	deleteUserById: asyncHandler(deleteUserById)

};

export default userController
