import workingCostController from '@controllers/working-cost.controller'
import { isAuthenticated } from '@middlewares/auth.middleware'
import validate from '@utils/validate-request'
import { newWorkingCostSchema } from '@validators/working-cost.validator'
import { Router } from 'express'

const router = Router()

router.get('/', isAuthenticated, workingCostController.getAll)

router.post(
  '/',
  isAuthenticated,
  validate(newWorkingCostSchema),
  workingCostController.create
)

export default router
