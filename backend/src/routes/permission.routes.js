import permissionController from '#controllers/permission.controller'
import { isAuthenticated, isManagerOrAdmin } from '#middlewares/auth.middleware'
import { Router } from 'express'

const router = Router()

router.get(
  '/',
  isAuthenticated,
  isManagerOrAdmin,
  permissionController.getAllPermissions
)

export default router
