import { Router } from 'express'
import { isAuthenticated, isManagerOrAdmin } from '@middlewares/auth.middleware'
import roleController from '@controllers/role.controller'

const router = Router()

router.post('/', isAuthenticated, isManagerOrAdmin, roleController.createRole)
router.get('/', isAuthenticated, isManagerOrAdmin, roleController.getAllRoles)
router.get(
  '/:role_id',
  isAuthenticated,
  isManagerOrAdmin,
  roleController.getRoleById
)
router.put(
  '/:role_id',
  isAuthenticated,
  isManagerOrAdmin,
  roleController.updateRoleById
)
router.delete(
  '/:role_id',
  isAuthenticated,
  isManagerOrAdmin,
  roleController.deleteRoleById
)

export default router
