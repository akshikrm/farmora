import { Router } from 'express'
import {
  isAuthenticated,
  isManagerOrAdmin,
  isSuperAdmin,
} from '#middlewares/auth.middleware'
import userController from '#controllers/user.controller'
import {
  validateNewMember,
  validateUpdateUser,
} from '#validators/user.validator'

const router = Router()

router.use(isAuthenticated)

router.post(
  '/',
  validateNewMember,
  isManagerOrAdmin,
  userController.createStaff
)

router.get('/', isManagerOrAdmin, userController.getAllUsers)

router.get('/:user_id', isManagerOrAdmin, userController.getUserById)

router.put(
  '/:user_id',
  validateUpdateUser,
  isSuperAdmin,
  userController.updateUserById
)

router.delete('/:user_id', isSuperAdmin, userController.deleteUserById)

export default router
