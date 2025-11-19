import { Router } from 'express'
import batchController from '#controllers/configuration.controller'
import { isAuthenticated, isManagerOrAdmin } from '#middlewares/auth.middleware'
import { validateBatch } from '#validators/config.validator'

const router = Router()

// TODO: Need to fix the CRUD operations for batches, there are few errors
router.post(
  '/',
  isAuthenticated,
  validateBatch,
  isManagerOrAdmin,
  batchController.create
)
router.get('/', isAuthenticated, isManagerOrAdmin, batchController.getAll)
router.get(
  '/:batch_id',
  isAuthenticated,
  isManagerOrAdmin,
  batchController.getById
)
router.put(
  '/:batch_id',
  isAuthenticated,
  validateBatch,
  isManagerOrAdmin,
  batchController.updateById
)
router.delete(
  '/:batch_id',
  isAuthenticated,
  isManagerOrAdmin,
  batchController.deleteById
)

export default router
