import itemCategoryController from '#controllers/item-category.controller'
import itemController from '#controllers/item.controller'
import { isAuthenticated } from '#middlewares/auth.middleware'
import validate from '#utils/validate-request'
import {
  newItemSchema,
  updateItemsCategory,
  newItemCategory,
  updateItemsSchema,
} from '#validators/items.validator'
import { Router } from 'express'

const router = Router()
router.use(isAuthenticated)

// Items
router.post(
  '/',
  isAuthenticated,
  validate(newItemSchema),
  itemController.create
)
router.get('/', isAuthenticated, itemController.getAll)
router.get('/:item_id', isAuthenticated, itemController.getById)
router.put(
  '/:item_id',
  isAuthenticated,
  validate(updateItemsSchema),
  itemController.updateById
)
router.delete('/:item_id', isAuthenticated, itemController.deleteById)

// ItemCategories
router.get('/categories', itemCategoryController.getAll)
router.post(
  '/categories',
  validate(newItemCategory),
  itemCategoryController.create
)
router.get('/categories/:item_category_id', itemCategoryController.getById)
router.put(
  '/categories/:item_category_id',
  validate(updateItemsCategory),
  itemCategoryController.updateById
)
router.delete(
  '/categories/:item_category_id',
  itemCategoryController.deleteById
)

export default router
