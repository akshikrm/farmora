import { isAuthenticated, isManagerOrAdmin } from '#middlewares/auth.middleware'
import { Router } from 'express'
import overviewController from '#controllers/overview.controller'
import validateQuery from '#utils/validate-query'
import { batchOverviewSchema } from '#validators/overview.validator'

const router = Router()

router.get(
  '/batch',
  validateQuery(batchOverviewSchema),
  isAuthenticated,
  isManagerOrAdmin,
  overviewController.getBatchOverview
)

export default router
