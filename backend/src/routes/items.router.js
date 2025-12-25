import itemCategoryController from '#controllers/item-category.controller'
import itemController from '#controllers/item.controller'
import { isAuthenticated, isManagerOrAdmin } from '#middlewares/auth.middleware'
import validate from '#utils/validate-request'
import {
  newItemSchema,
  updateItemsCategory,
  newItemCategory,
  updateItemsSchema,
  assignItemToBatchSchema,
  reassignItemToBatchSchema,
} from '#validators/items.validator'
import { Router } from 'express'

const router = Router()
router.use(isAuthenticated)

// ItemCategories
router.get('/categories', itemCategoryController.getAll)
router.post(
  '/categories',
  validate(newItemCategory),
  itemCategoryController.create
)

router.get(
  '/categories/names',
  isAuthenticated,
  isManagerOrAdmin,
  itemCategoryController.getNames
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

// Items
router.post(
  '/',
  isAuthenticated,
  validate(newItemSchema),
  itemController.create
)
router.get('/', isAuthenticated, itemController.getAll)
router.get('/purchase-book', isAuthenticated, itemController.getPurchaseBook)
router.get(
  '/integration-book',
  isAuthenticated,
  itemController.getIntegrationBook
)
router.get('/:item_id', isAuthenticated, itemController.getById)

router.put(
  '/item-batch-assign',
  validate(assignItemToBatchSchema),
  isAuthenticated,
  itemController.assingItemToBatch
)
router.put(
  '/item-batch-reassign',
  validate(reassignItemToBatchSchema),
  isAuthenticated,
  itemController.reassignItemToBatch
)

router.put(
  '/:item_id',
  isAuthenticated,
  validate(updateItemsSchema),
  itemController.updateById
)

router.delete('/:item_id', isAuthenticated, itemController.deleteById)

export default router
