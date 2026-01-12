import expenseSalesController from '#controllers/expense-sales.controller'
import { isAuthenticated } from '#middlewares/auth.middleware'
import validate from '#utils/validate-request'
import { newExpenseSalesSchema } from '#validators/expense-sales.validator'
import { Router } from 'express'

const router = Router()

router.get('/', isAuthenticated, expenseSalesController.getAll)

router.get('/:id', isAuthenticated, expenseSalesController.getById)

router.post(
  '/',
  isAuthenticated,
  validate(newExpenseSalesSchema),
  expenseSalesController.create
)

router.put(
  '/:id',
  isAuthenticated,
  validate(newExpenseSalesSchema),
  expenseSalesController.updateById
)

router.delete('/:id', isAuthenticated, expenseSalesController.deleteById)

export default router
