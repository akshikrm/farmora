import userService from '#services/user.service'
import asyncHandler from '#utils/async-handler'

const createStaff = async (req, res) => {
  const user = await userService.createStaff(req.body, req.user)
  res.success(user, { message: 'user created', statusCode: 201 })
}

const getAllUsers = async (req, res) => {
  const filter = {
    page: req.query.page ? parseInt(req.query.page) : 1,
    limit: req.query.limit ? parseInt(req.query.limit) : 10,
    status: req.query.status ? parseInt(req.query.status) : undefined,
    name: req.query.name,
    parent_id: req.query.parent_id,
  }

  const result = await userService.getAll(filter, req.user)

  res.success(result, { message: 'users list' })
}

const getUserById = async (req, res) => {
  const { user_id } = req.params

  const userRecord = await userService.getById(user_id, req.user)
  res.success(userRecord, { message: 'users record' })
}

const updateUserById = async (req, res) => {
  const { user_id } = req.params
  await userService.update(user_id, req.body, req.user)
  res.success(null, { message: 'user updated' })
}

const deleteUserById = async (req, res) => {
  const { user_id } = req.params
  await userService.delete(user_id, req.user)
  res.success(null, { message: 'user deleted' })
}

const userController = {
  createStaff: asyncHandler(createStaff),
  getAllUsers: asyncHandler(getAllUsers),
  getUserById: asyncHandler(getUserById),
  updateUserById: asyncHandler(updateUserById),
  deleteUserById: asyncHandler(deleteUserById),
}

export default userController
