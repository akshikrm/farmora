import { isAuthenticated, isManagerOrAdmin } from '#middlewares/auth.middleware'
import { Router } from 'express'
import vendorController from '#controllers/vendor.controller'
import validate from '#utils/validate-request'
import {
  newVendorSchema,
  updateVendorSchema,
} from '#validators/vendor.validator'

const router = Router()

router.post(
  '/',
  validate(newVendorSchema),
  isAuthenticated,
  isManagerOrAdmin,
  vendorController.create
)

router.get(
  '/names',
  isAuthenticated,
  isManagerOrAdmin,
  vendorController.getNames
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
  validate(updateVendorSchema),
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
