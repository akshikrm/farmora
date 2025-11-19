import { isAuthenticated, isManagerOrAdmin } from '#middlewares/auth.middleware'
import { Router } from 'express'
import vendorController from '#controllers/vendor.controller'

import {
  validateUpdateVendor,
  validateVendor,
} from '#validators/config.validator'

const router = Router()

router.post(
  '/',
  validateVendor,
  isAuthenticated,
  isManagerOrAdmin,
  vendorController.create
)
router.get('/', isAuthenticated, isManagerOrAdmin, vendorController.getAll)
router.get(
  '/:vendor_id',
  isAuthenticated,
  isManagerOrAdmin,
  vendorController.getById
)
router.put(
  '/:vendor_id',
  validateUpdateVendor,
  isAuthenticated,
  isManagerOrAdmin,
  vendorController.updateById
)
router.delete(
  '/:vendor_id',
  isAuthenticated,
  isManagerOrAdmin,
  vendorController.deleteById
)

export default router
