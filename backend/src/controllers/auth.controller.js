import { generateToken } from '#utils/jwt'
import asyncHandler from '#utils/async-handler'
import authService from '#services/auth.service'

const createManager = async (req, res) => {
  const user = await authService.createManager(req.body)
  res.success(user, { message: 'user created', statusCode: 201 })
}

const login = async (req, res) => {
  const { username, password } = req.body
  const user = await authService.login(username, password)
  const responseObject = {
    token: generateToken(user),
    master_id: user.id,
    name: user.name,
    username: user.username,
    user_type: user.usertype,
    parent_id: user.parent_id,
  }

  res.success(responseObject, { message: 'user authenticated' })
}
const authController = {
  createManager: asyncHandler(createManager),
  login: asyncHandler(login),
}

export default authController
