import integrationBookController from '@controllers/integration-book'
import { isAuthenticated } from '@middlewares/auth.middleware'
import validate from '@utils/validate-request'
import { newIntegationBookSchema } from '@validators/itengration-book.validator'
import { Router } from 'express'

const router = Router()

router.get('/', isAuthenticated, integrationBookController.getAll)

router.post(
  '/',
  isAuthenticated,
  validate(newIntegationBookSchema),
  integrationBookController.create
)

export default router
