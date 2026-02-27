import { isAuthenticated, isManagerOrAdmin } from '@middlewares/auth.middleware'
import { Router } from 'express'
import invoiceConfigController from '@controllers/invoice_config.controller'

const router = Router()

router.get(
  '/',
  isAuthenticated,
  isManagerOrAdmin,
  invoiceConfigController.create
)

export default router
