import { Router } from 'express'
import { isAuthenticated } from '#middlewares/auth.middleware'
import { validateItem, validateBatch } from '#validators/config.validator'
import batchController from '#controllers/configuration.controller'
import itemController from '#controllers/item.controller'

const router = Router()

router.post('/items', isAuthenticated, validateItem, itemController.create)
router.get('/items', isAuthenticated, itemController.getAll)
router.get('/items/:item_id', isAuthenticated, itemController.getById)
router.put(
  '/items/:item_id',
  isAuthenticated,
  validateItem,
  itemController.updateById
)
router.delete('/items/:item_id', isAuthenticated, itemController.deleteById)

// TODO: Need to fix the CRUD operations for batches, there are few errors
router.post('/batches', isAuthenticated, validateBatch, batchController.create)
router.get('/batches', isAuthenticated, batchController.getAll)
router.get('/batches/:batch_id', isAuthenticated, batchController.getById)
router.put(
  '/batches/:batch_id',
  isAuthenticated,
  validateBatch,
  batchController.updateById
)
router.delete('/batches/:batch_id', isAuthenticated, batchController.deleteById)

export default router
