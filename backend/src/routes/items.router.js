import itemCategoryController from '#controllers/item-category.controller'
import { isAuthenticated } from '#middlewares/auth.middleware'
import validate from '#utils/validate-request'
import { createItemsCategory, updateItemsCategory } from '#validators/items'
import { Router } from 'express'

const router = Router()
router.use(isAuthenticated)

router.get('/categories', itemCategoryController.getAll)
router.post(
  '/categories',
  validate(createItemsCategory),
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
