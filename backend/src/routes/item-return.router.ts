import purchaseReturnController from '@controllers/purchase-return.controller'
import { isAuthenticated } from '@middlewares/auth.middleware'
import validate from '@utils/validate-request'
import {
  newItemReturnSchema,
  updateItemReturnSchema,
} from '@validators/item-return.validator'
import { Router } from 'express'

const router = Router()
router.use(isAuthenticated)

router.post(
  '/',
  isAuthenticated,
  validate(newItemReturnSchema),
  purchaseReturnController.create
)

router.get('/', isAuthenticated, purchaseReturnController.getAll)

router.get(
  '/:item_return_id',
  isAuthenticated,
  purchaseReturnController.getById
)

router.put(
  '/:item_return_id',
  isAuthenticated,
  validate(updateItemReturnSchema),
  purchaseReturnController.updateById
)

router.delete(
  '/:item_return_id',
  isAuthenticated,
  purchaseReturnController.deleteById
)

export default router
