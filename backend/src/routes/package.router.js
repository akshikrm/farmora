import { Router } from 'express'
import packageController from '#controllers/package.controller'
import { isAuthenticated, isSuperAdmin } from '#middlewares/auth.middleware'
import validatePackage from '#validators/package.validator'

const router = Router()

router.post(
  '/',
  isAuthenticated,
  isSuperAdmin,
  validatePackage,
  packageController.create
)

router.get('/', packageController.getAll)

router.get('/:package_id', packageController.getById)

router.put(
  '/:package_id',
  isAuthenticated,
  isSuperAdmin,
  validatePackage,
  packageController.updateById
)

router.delete('/:package_id', packageController.deleteById)

export default router
