import { Router } from 'express'
import { isAuthenticated, isManagerOrAdmin } from '#middlewares/auth.middleware'
import userController from '#controllers/user.controller'
import {
  newStaffMemberSchema,
  updateNewStaffSchema,
} from '#validators/user.validator'
import validate from '#utils/validate-request'

const router = Router()

router.use(isAuthenticated)

router.post(
  '/',
  validate(newStaffMemberSchema),
  isManagerOrAdmin,
  userController.createStaff
)

router.get('/', isManagerOrAdmin, userController.getAllUsers)

router.get('/:user_id', isManagerOrAdmin, userController.getUserById)

router.put(
  '/:user_id',
  validate(updateNewStaffSchema),
  isManagerOrAdmin,
  userController.updateUserById
)

router.delete('/:user_id', isManagerOrAdmin, userController.deleteUserById)

export default router
