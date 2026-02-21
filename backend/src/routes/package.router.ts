import { Router } from 'express'
import packageController from '@controllers/package.controller'
import { isAuthenticated, isSuperAdmin } from '@middlewares/auth.middleware'
import {
  newPackageSchema,
  updatePackageSchema,
} from '@validators/package.validator'
import validate from '@utils/validate-request'

const router = Router()

router.post(
  '/',
  validate(newPackageSchema),
  isAuthenticated,
  isSuperAdmin,
  packageController.create
)

router.get('/', packageController.getAll)

router.get('/:package_id', packageController.getById)

router.put(
  '/:package_id',
  validate(updatePackageSchema),
  isAuthenticated,
  isSuperAdmin,
  packageController.updateById
)

router.delete('/:package_id', packageController.deleteById)

export default router
