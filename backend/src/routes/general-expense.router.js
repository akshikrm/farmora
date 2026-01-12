import generalExpenseController from '#controllers/general-expense.controller'
import { isAuthenticated } from '#middlewares/auth.middleware'
import validate from '#utils/validate-request'
import { newGeneralExpenseSchema } from '#validators/general-expense.validator'
import { Router } from 'express'

const router = Router()

router.get('/', isAuthenticated, generalExpenseController.getAll)

router.get('/:id', isAuthenticated, generalExpenseController.getById)

router.post(
  '/',
  isAuthenticated,
  validate(newGeneralExpenseSchema),
  generalExpenseController.create
)

router.put(
  '/:id',
  isAuthenticated,
  validate(newGeneralExpenseSchema),
  generalExpenseController.updateById
)

router.delete('/:id', isAuthenticated, generalExpenseController.deleteById)

export default router
