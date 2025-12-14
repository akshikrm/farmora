import itemReturnController from '#controllers/item-return.controller'
import { isAuthenticated } from '#middlewares/auth.middleware'
import validate from '#utils/validate-request'
import {
  newItemReturnSchema,
  updateItemReturnSchema,
} from '#validators/item-return.validator'
import { Router } from 'express'

const router = Router()
router.use(isAuthenticated)

router.post(
  '/',
  isAuthenticated,
  validate(newItemReturnSchema),
  itemReturnController.create
)

router.get('/', isAuthenticated, itemReturnController.getAll)

router.get('/:item_return_id', isAuthenticated, itemReturnController.getById)

router.put(
  '/:item_return_id',
  isAuthenticated,
  validate(updateItemReturnSchema),
  itemReturnController.updateById
)

router.delete('/:item_return_id', isAuthenticated, itemReturnController.deleteById)

export default router
