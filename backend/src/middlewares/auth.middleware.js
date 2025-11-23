import jwt from 'jsonwebtoken'
import userRoles from '#utils/user-roles'
import {
  MissingTokenError,
  PermissionDeniedError,
  UnauthorizedError,
} from '#errors/auth.errors'
import userService from '#services/user.service'
import asyncHandler from '#utils/async-handler'

const { verify } = jwt

const SECRET_KEY = process.env.JWT_SECRET || 'E77BDE77EAFD388AF54979EE26B4D'

export const isAuthenticated = asyncHandler(async function (req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1] // Bearer <token>

  if (!token) throw new MissingTokenError()

  const decoded = verify(token, SECRET_KEY)

  const authenticatedUser = await userService.getById(decoded.id)

  if (authenticatedUser) {
    req.user = authenticatedUser
    return next()
  }
  throw new MissingTokenError()
})

export const authorize =
  (...allowedRoles) =>
  async (req, res, next) => {
    const role = req.user.user_type
    if (!role) {
      throw new UnauthorizedError()
    }

    if (allowedRoles.includes(role)) {
      return next()
    } else {
      throw new PermissionDeniedError()
    }
  }

export const isManagerOrAdmin = asyncHandler(
  authorize(userRoles.admin.type, userRoles.manager.type)
)

export const isSuperAdmin = asyncHandler(authorize(userRoles.admin.type))
