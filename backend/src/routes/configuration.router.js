import { Router } from 'express'
import { isAuthenticated } from '#middlewares/auth.middleware'
import {
  validateSeason,
  validateItem,
  validateVendor,
  validateBatch,
} from '#validators/config.validator'
import batchController from '#controllers/configuration.controller'
import seasonController from '#controllers/season.controller'
import itemController from '#controllers/item.controller'
import vendorController from '#controllers/vendor.controller'

const router = Router()

router.post(
  '/seasons',
  isAuthenticated,
  validateSeason,
  seasonController.create
)
router.get('/seasons', isAuthenticated, seasonController.getAll)
router.get('/seasons/:season_id', isAuthenticated, seasonController.getById)
router.put(
  '/seasons/:season_id',
  isAuthenticated,
  validateSeason,
  seasonController.updateById
)
router.delete(
  '/seasons/:season_id',
  isAuthenticated,
  seasonController.deleteById
)

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

router.post(
  '/vendors',
  isAuthenticated,
  validateVendor,
  vendorController.create
)
router.get('/vendors', isAuthenticated, vendorController.getAll)
router.get('/vendors/:vendor_id', isAuthenticated, vendorController.getById)
router.put(
  '/vendors/:vendor_id',
  isAuthenticated,
  validateVendor,
  vendorController.updateById
)
router.delete(
  '/vendors/:vendor_id',
  isAuthenticated,
  vendorController.deleteById
)

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
