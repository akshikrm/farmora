import { isAuthenticated, isManagerOrAdmin } from '@middlewares/auth.middleware'
import { Router } from 'express'
import salesController from '@controllers/sales.controller'
import validate from '@utils/validate-request'
import {
  newSaleSchema,
  updateSaleSchema,
  addSalesBookEntrySchema,
} from '@validators/sales.validator'

const router = Router()

router.post(
  '/',
  validate(newSaleSchema),
  isAuthenticated,
  isManagerOrAdmin,
  salesController.create
)

router.post(
  '/ledger',
  validate(addSalesBookEntrySchema),
  isAuthenticated,
  isManagerOrAdmin,
  salesController.addSalesBookEntry
)
router.get(
  '/ledger',
  isAuthenticated,
  isManagerOrAdmin,
  salesController.getSalesLedger
)
router.get('/', isAuthenticated, isManagerOrAdmin, salesController.getAll)
router.get(
  '/:sale_id',
  isAuthenticated,
  isManagerOrAdmin,
  salesController.getById
)
router.put(
  '/:sale_id',
  validate(updateSaleSchema),
  isAuthenticated,
  isManagerOrAdmin,
  salesController.updateById
)
router.delete(
  '/:sale_id',
  isAuthenticated,
  isManagerOrAdmin,
  salesController.deleteById
)

export default router
