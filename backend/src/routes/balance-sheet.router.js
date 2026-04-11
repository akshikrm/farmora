import { isAuthenticated, isManagerOrAdmin } from '@middlewares/auth.middleware'
import { Router } from 'express'
import balanceSheetController from '@controllers/balance-sheet.controller'

const router = Router()

router.get(
  '/',
  isAuthenticated,
  isManagerOrAdmin,
  balanceSheetController.getBalanceSheet
)

export default router
